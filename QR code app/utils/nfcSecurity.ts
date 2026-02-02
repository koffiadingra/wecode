import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';
import { SecurityLogger, isVCardSafe, nfcRateLimiter } from './security';
import { Platform } from 'react-native';

// verification de sécurité NFC a
const NFC_MAX_PAYLOAD_SIZE = 2048;
const NFC_TIMEOUT = 10000;

interface NFCSecurityConfig {
  requireUserConfirmation: boolean;
  logAllAttempts: boolean;
  enableRateLimiting: boolean;
  maxPayloadSize: number;
}

const defaultConfig: NFCSecurityConfig = {
  requireUserConfirmation: true,
  logAllAttempts: true,
  enableRateLimiting: true,
  maxPayloadSize: NFC_MAX_PAYLOAD_SIZE
};

export class SecureNFCHandler {
  private config: NFCSecurityConfig;
  private isActive: boolean = false;
  private initialized: boolean = false;

  constructor(config: Partial<NFCSecurityConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
    this.initNFC();
  }


  async initNFC(): Promise<void> {
    try {
      const supported = await NfcManager.isSupported();
      if (supported) {
        await NfcManager.start();
        this.initialized = true;
        SecurityLogger.log('nfc_initialized', { platform: Platform.OS });
      }
    } catch (error) {
      console.error('Erreur initialisation NFC:', error);
      this.initialized = false;
    }
  }


  async canUseNFC(): Promise<{ allowed: boolean; reason?: string }> {
    if (!this.initialized) {
      await this.initNFC();
    }

    const isSupported = await NfcManager.isSupported();
    if (!isSupported) {
      return {
        allowed: false,
        reason: 'NFC non disponible sur cet appareil'
      };
    }

    const isEnabled = await NfcManager.isEnabled();
    if (!isEnabled) {
      return {
        allowed: false,
        reason: 'NFC désactivé. Veuillez l\'activer dans les paramètres.'
      };
    }

    if (this.config.enableRateLimiting && !nfcRateLimiter.check('nfc_write')) {
      SecurityLogger.log('nfc_rate_limited', {});
      return {
        allowed: false,
        reason: 'Trop de tentatives. Veuillez patienter.'
      };
    }

    if (this.isActive) {
      return {
        allowed: false,
        reason: 'Une opération NFC est déjà en cours'
      };
    }

    return { allowed: true };
  }


  async writeSecure(data: string): Promise<{ success: boolean; error?: string }> {
    const checkResult = await this.canUseNFC();
    if (!checkResult.allowed) {
      return { success: false, error: checkResult.reason };
    }

    if (!data || typeof data !== 'string') {
      SecurityLogger.log('nfc_write_invalid_data', { dataType: typeof data });
      return { success: false, error: 'Données invalides' };
    }

    if (data.length > this.config.maxPayloadSize) {
      SecurityLogger.log('nfc_write_payload_too_large', { size: data.length });
      return { success: false, error: 'Données trop volumineuses' };
    }

    if (!isVCardSafe(data)) {
      SecurityLogger.log('nfc_write_unsafe_vcard', {});
      return { success: false, error: 'Données non sécurisées' };
    }

    this.isActive = true;

    try {
      SecurityLogger.log('nfc_write_start', { dataSize: data.length });

      // Demander la technologie NFC
      await NfcManager.requestTechnology(NfcTech.Ndef, {
        alertMessage: 'Approchez votre téléphone d\'une puce NFC'
      });

      const bytes = Ndef.encodeMessage([Ndef.textRecord(data)]);

      if (!bytes) {
        throw new Error('Impossible d\'encoder le message');
      }

      await NfcManager.ndefHandler.writeNdefMessage(bytes);

      SecurityLogger.log('nfc_write_success', { dataSize: data.length });
      nfcRateLimiter.reset('nfc_write');

      return { success: true };

    } catch (error: any) {
      SecurityLogger.log('nfc_write_failed', {
        error: error.message,
        name: error.name
      });

      let errorMessage = 'Erreur lors de l\'écriture NFC';

      if (error.message?.includes('cancelled')) {
        errorMessage = 'Opération annulée';
      } else if (error.message?.includes('timeout')) {
        errorMessage = 'Timeout: Approchez la puce NFC plus près';
      } else if (error.message?.includes('not writable')) {
        errorMessage = 'Cette puce NFC n\'est pas inscriptible';
      }

      return { success: false, error: errorMessage };

    } finally {
      this.isActive = false;
      try {
        await NfcManager.cancelTechnologyRequest();
      } catch (e) {
        // Ignorer les erreurs de nettoyage
      }
    }
  }

  
  async readSecure(): Promise<{ success: boolean; data?: string; error?: string }> {
    const checkResult = await this.canUseNFC();
    if (!checkResult.allowed) {
      return { success: false, error: checkResult.reason };
    }

    this.isActive = true;

    try {
      SecurityLogger.log('nfc_read_start', {});

      await NfcManager.requestTechnology(NfcTech.Ndef, {
        alertMessage: 'Approchez votre téléphone d\'une puce NFC'
      });

      const tag = await NfcManager.ndefHandler.getNdefMessage();

      if (!tag || !tag.records || tag.records.length === 0) {
        throw new Error('Aucune donnée trouvée');
      }

      let text = '';
      for (const record of tag.records) {
        if (record.tnf === Ndef.TNF_WELL_KNOWN) {
          const payload = record.payload;
          const languageCodeLength = payload[0] & 0x3f;
          const textBytes = payload.slice(1 + languageCodeLength);
          text = String.fromCharCode(...textBytes);
          break;
        }
      }

      if (!text) {
        throw new Error('Aucune donnée texte trouvée');
      }

      if (text.length > this.config.maxPayloadSize) {
        throw new Error('Données trop volumineuses');
      }

      if (!isVCardSafe(text)) {
        SecurityLogger.log('nfc_read_unsafe_data', {});
        throw new Error('Données non sécurisées détectées');
      }

      SecurityLogger.log('nfc_read_success', { dataSize: text.length });
      nfcRateLimiter.reset('nfc_read');

      return { success: true, data: text };

    } catch (error: any) {
      SecurityLogger.log('nfc_read_failed', {
        error: error.message,
        name: error.name
      });

      let errorMessage = 'Erreur lors de la lecture NFC';

      if (error.message?.includes('cancelled')) {
        errorMessage = 'Opération annulée';
      } else if (error.message?.includes('timeout')) {
        errorMessage = 'Timeout: Approchez la puce NFC';
      } else if (error.message === 'Données non sécurisées détectées') {
        errorMessage = 'ALERTE: Données suspectes détectées. Lecture bloquée.';
      }

      return { success: false, error: errorMessage };

    } finally {
      this.isActive = false;
      try {
        await NfcManager.cancelTechnologyRequest();
      } catch (e) {
        // Ignorer les erreurs de nettoyage
      }
    }
  }


  async abort(): Promise<void> {
    try {
      await NfcManager.cancelTechnologyRequest();
      SecurityLogger.log('nfc_operation_aborted', {});
    } catch (e) {
      // Ignorer les erreurs
    }
    this.isActive = false;
  }


  isOperationActive(): boolean {
    return this.isActive;
  }


  async cleanup(): Promise<void> {
    try {
      await NfcManager.cancelTechnologyRequest();
      this.isActive = false;
    } catch (e) {
      // Ignorer les erreurs
    }
  }
}


export class NFCThreatDetector {
  private static suspiciousPatterns = [
    /javascript:/gi,
    /<script/gi,
    /on\w+=/gi,
    /eval\(/gi,
    /iframe/gi,
    /embed/gi,
    /object/gi
  ];

  static analyzeData(data: string): { safe: boolean; threats: string[] } {
    const threats: string[] = [];

    if (!data) {
      return { safe: false, threats: ['Données vides'] };
    }

    // Vérifier les patterns suspects
    for (const pattern of this.suspiciousPatterns) {
      if (pattern.test(data)) {
        threats.push(`Pattern suspect détecté: ${pattern.source}`);
      }
    }

    // Vérifier les caractères non imprimables
    const nonPrintable = data.match(/[\x00-\x1F\x7F-\x9F]/g);
    if (nonPrintable && nonPrintable.length > 5) {
      threats.push('Caractères de contrôle suspects');
    }

    // Vérifier la structure vCard si c'est une vCard
    if (data.includes('BEGIN:VCARD')) {
      if (!isVCardSafe(data)) {
        threats.push('Structure vCard invalide ou dangereuse');
      }
    }

    // Log si des menaces sont détectées
    if (threats.length > 0) {
      SecurityLogger.log('nfc_threats_detected', { threats, dataPreview: data.substring(0, 100) });
    }

    return {
      safe: threats.length === 0,
      threats
    };
  }
}

// Instance globale sécurisée
export const secureNFC = new SecureNFCHandler();
