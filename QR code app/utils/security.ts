const MAX_DATA_SIZE = 2048;
const MAX_FIELD_LENGTH = 200;
const MAX_VCARD_SIZE = 1024;

// Pattern de validation
const SAFE_PATTERNS = {
  name: /^[a-zA-ZÀ-ÿ\s'-]{1,100}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^[\d\s+()-]{6,20}$/,
  url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  alphanumeric: /^[a-zA-Z0-9À-ÿ\s.,'&-]{1,200}$/
};

// Liste noire de caractères dangereux
const DANGEROUS_CHARS = ['<', '>', '{', '}', '\\', '|', '^', '`', '\0', '\n\r', '\r\n'];
const VCARD_DANGEROUS_PATTERNS = [
  /BEGIN:VCARD.*BEGIN:VCARD/i,
  /END:VCARD.*END:VCARD/i,
  /<script/i,
  /javascript:/i,
  /on\w+=/i,
  /data:text\/html/i
];


export function sanitizeString(input: string, maxLength: number = MAX_FIELD_LENGTH): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  let sanitized = input.substring(0, maxLength);

  // Supprimer les caractères dangereux
  DANGEROUS_CHARS.forEach(char => {
    sanitized = sanitized.replace(new RegExp(char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '');
  });

  // Encoder les caractères spéciaux
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();

  return sanitized;
}


export function validateEmail(email: string): boolean {
  if (!email || email.length > MAX_FIELD_LENGTH) {
    return false;
  }
  return SAFE_PATTERNS.email.test(email);
}


export function validatePhone(phone: string): boolean {
  if (!phone || phone.length > 20) {
    return false;
  }
  return SAFE_PATTERNS.phone.test(phone);
}


export function validateUrl(url: string): boolean {
  if (!url || url.length > MAX_FIELD_LENGTH) {
    return false;
  }
  
  if (!url.startsWith('https://') && !url.startsWith('http://')) {
    return false;
  }
  
  return SAFE_PATTERNS.url.test(url);
}


export function validateName(name: string): boolean {
  if (!name || name.length > 100) {
    return false;
  }
  return SAFE_PATTERNS.name.test(name);
}


export function validateAlphanumeric(text: string): boolean {
  if (!text || text.length > MAX_FIELD_LENGTH) {
    return false;
  }
  return SAFE_PATTERNS.alphanumeric.test(text);
}


export function isVCardSafe(vcard: string): boolean {
  if (!vcard || typeof vcard !== 'string') {
    return false;
  }

  if (vcard.length > MAX_VCARD_SIZE) {
    console.warn('VCard trop volumineuse');
    return false;
  }

  if (!vcard.includes('BEGIN:VCARD') || !vcard.includes('END:VCARD')) {
    console.warn('Format VCard invalide');
    return false;
  }

  for (const pattern of VCARD_DANGEROUS_PATTERNS) {
    if (pattern.test(vcard)) {
      console.warn('Pattern dangereux détecté dans la VCard');
      return false;
    }
  }

  const beginCount = (vcard.match(/BEGIN:VCARD/gi) || []).length;
  const endCount = (vcard.match(/END:VCARD/gi) || []).length;
  
  if (beginCount !== 1 || endCount !== 1 || beginCount !== endCount) {
    console.warn('Structure VCard invalide');
    return false;
  }

  return true;
}


export function generateChecksum(data: string): string {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}


export function verifyChecksum(data: string, checksum: string): boolean {
  return generateChecksum(data) === checksum;
}


export function obfuscate(data: string, key: string = 'sharecontact-secure-key'): string {
  let result = '';
  for (let i = 0; i < data.length; i++) {
    result += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  const buffer = new Uint8Array([...result].map(char => char.charCodeAt(0)));
  return btoa(String.fromCharCode.apply(null, Array.from(buffer)));
}


export function deobfuscate(data: string, key: string = 'sharecontact-secure-key'): string {
  try {
    const decoded = atob(data);
    let result = '';
    for (let i = 0; i < decoded.length; i++) {
      result += String.fromCharCode(decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
  } catch (error) {
    console.error('Erreur de déchiffrement', error);
    return '';
  }
}


class RateLimiter {
  private attempts: Map<string, { count: number; timestamp: number }> = new Map();
  private readonly maxAttempts: number = 5;
  private readonly windowMs: number = 60000;

  check(identifier: string): boolean {
    const now = Date.now();
    const record = this.attempts.get(identifier);

    if (!record) {
      this.attempts.set(identifier, { count: 1, timestamp: now });
      return true;
    }

    if (now - record.timestamp > this.windowMs) {
      this.attempts.set(identifier, { count: 1, timestamp: now });
      return true;
    }

    record.count++;
    
    if (record.count > this.maxAttempts) {
      console.warn(`Rate limit dépassé pour ${identifier}`);
      return false;
    }

    return true;
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

export const nfcRateLimiter = new RateLimiter();


export class SecurityLogger {
  private static logs: Array<{ timestamp: number; event: string; details: any }> = [];
  private static readonly maxLogs = 100;

  static log(event: string, details: any = {}): void {
    const entry = {
      timestamp: Date.now(),
      event,
      details
    };

    this.logs.push(entry);

    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Log en console en mode développement
    // if (__DEV__) {
    //   console.log('[Security]', event, details);
    // }
  }

  static getLogs(): Array<{ timestamp: number; event: string; details: any }> {
    return [...this.logs];
  }

  static clear(): void {
    this.logs = [];
  }

  static detectAnomalies(): string[] {
    const anomalies: string[] = [];
    const recentLogs = this.logs.filter(log => Date.now() - log.timestamp < 60000);

    const failedAttempts = recentLogs.filter(log => log.event === 'nfc_validation_failed');
    if (failedAttempts.length > 3) {
      anomalies.push('Tentatives NFC suspectes détectées');
    }

    return anomalies;
  }
}

export interface SecureContact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  position?: string;
  website?: string;
}

export function validateContact(contact: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!contact) {
    errors.push('Contact invalide');
    return { valid: false, errors };
  }

  if (!contact.firstName || !validateName(contact.firstName)) {
    errors.push('Prénom invalide ou manquant');
  }

  if (!contact.lastName || !validateName(contact.lastName)) {
    errors.push('Nom invalide ou manquant');
  }

  if (!contact.email || !validateEmail(contact.email)) {
    errors.push('Email invalide ou manquant');
  }

  if (!contact.phone || !validatePhone(contact.phone)) {
    errors.push('Téléphone invalide ou manquant');
  }

  if (contact.company && !validateAlphanumeric(contact.company)) {
    errors.push('Nom d\'entreprise invalide');
  }

  if (contact.position && !validateAlphanumeric(contact.position)) {
    errors.push('Poste invalide');
  }

  if (contact.website && !validateUrl(contact.website)) {
    errors.push('URL invalide');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}


export function createSecureVCard(contact: SecureContact): string | null {
  const validation = validateContact(contact);
  if (!validation.valid) {
    SecurityLogger.log('vcard_creation_failed', { errors: validation.errors });
    return null;
  }

  const safeContact = {
    firstName: sanitizeString(contact.firstName, 100),
    lastName: sanitizeString(contact.lastName, 100),
    email: sanitizeString(contact.email, 200),
    phone: sanitizeString(contact.phone, 20),
    company: contact.company ? sanitizeString(contact.company, 200) : '',
    position: contact.position ? sanitizeString(contact.position, 200) : '',
    website: contact.website ? sanitizeString(contact.website, 200) : ''
  };

  // Construire la vCard
  let vcard = `BEGIN:VCARD
VERSION:3.0
FN:${safeContact.firstName} ${safeContact.lastName}
N:${safeContact.lastName};${safeContact.firstName};;;
TEL:${safeContact.phone}
EMAIL:${safeContact.email}`;

  if (safeContact.company) {
    vcard += `\nORG:${safeContact.company}`;
  }

  if (safeContact.position) {
    vcard += `\nTITLE:${safeContact.position}`;
  }

  if (safeContact.website) {
    vcard += `\nURL:${safeContact.website}`;
  }

  vcard += '\nEND:VCARD';

  // Vérifier la sécurité de la vCard générée
  if (!isVCardSafe(vcard)) {
    SecurityLogger.log('vcard_unsafe', { contact: safeContact });
    return null;
  }

  // Ajouter un checksum
  const checksum = generateChecksum(vcard);
  SecurityLogger.log('vcard_created', { checksum });

  return vcard;
}
