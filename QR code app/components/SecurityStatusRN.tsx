import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SecurityLogger } from '../utils/security';

export function SecurityStatusRN() {
  const [expanded, setExpanded] = useState(false);
  const [logs, setLogs] = useState<Array<{ timestamp: number; event: string; details: any }>>([]);
  const [anomalies, setAnomalies] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(SecurityLogger.getLogs().slice(-5));
      setAnomalies(SecurityLogger.detectAnomalies());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getEventIcon = (event: string): string => {
    if (event.includes('success')) return '✅';
    if (event.includes('failed') || event.includes('error')) return '❌';
    if (event.includes('blocked') || event.includes('unsafe')) return '🚫';
    if (event.includes('write') || event.includes('read')) return '📡';
    if (event.includes('created')) return '✓';
    return '📋';
  };

  const formatEvent = (event: string): string => {
    return event
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.badge}
        onPress={() => setExpanded(!expanded)}
      >
        <View style={styles.badgeContent}>
          <Text style={styles.badgeIcon}>
            {anomalies.length > 0 ? '⚠️' : '🛡️'}
          </Text>
          <Text style={styles.badgeText}>
            {anomalies.length > 0 ? 'Alerte sécurité' : 'Sécurisé'}
          </Text>
        </View>
        <Text style={styles.expandIcon}>{expanded ? '▼' : '▶'}</Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.panel}>
          {anomalies.length > 0 && (
            <View style={styles.anomaliesSection}>
              <Text style={styles.sectionTitle}>⚠️ Alertes</Text>
              {anomalies.map((anomaly, index) => (
                <View key={index} style={styles.anomalyItem}>
                  <Text style={styles.anomalyText}>{anomaly}</Text>
                </View>
              ))}
            </View>
          )}

          <View style={styles.logsSection}>
            <Text style={styles.sectionTitle}>
              📋 Activité récente ({logs.length})
            </Text>
            {logs.length === 0 ? (
              <Text style={styles.emptyText}>Aucune activité récente</Text>
            ) : (
              logs
                .slice()
                .reverse()
                .map((log, index) => (
                  <View key={index} style={styles.logItem}>
                    <View style={styles.logHeader}>
                      <Text style={styles.logIcon}>{getEventIcon(log.event)}</Text>
                      <Text style={styles.logEvent}>{formatEvent(log.event)}</Text>
                    </View>
                    <Text style={styles.logTime}>{formatTime(log.timestamp)}</Text>
                  </View>
                ))
            )}
          </View>

          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              SecurityLogger.clear();
              setLogs([]);
              setAnomalies([]);
            }}
          >
            <Text style={styles.clearButtonText}>🗑️ Effacer les logs</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  badge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  badgeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  badgeIcon: {
    fontSize: 24,
  },
  badgeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  expandIcon: {
    fontSize: 12,
    color: '#6B7280',
  },
  panel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  anomaliesSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  anomalyItem: {
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  anomalyText: {
    fontSize: 14,
    color: '#DC2626',
  },
  logsSection: {
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    paddingVertical: 16,
  },
  logItem: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  logHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  logIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  logEvent: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
    flex: 1,
  },
  logTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  clearButton: {
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 14,
    color: '#DC2626',
    fontWeight: '600',
  },
});
