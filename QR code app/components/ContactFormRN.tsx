import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Contact } from '../types/contact';
import {
  validateName,
  validateEmail,
  validatePhone,
  validateUrl,
  validateAlphanumeric,
} from '../utils/security';

interface ContactFormProps {
  onSubmit: (contact: Contact) => void;
  onCancel: () => void;
}

export function ContactFormRN({ onSubmit, onCancel }: ContactFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [website, setWebsite] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!firstName || !validateName(firstName)) {
      newErrors.firstName = 'Prénom invalide (lettres uniquement, max 100 caractères)';
    }

    if (!lastName || !validateName(lastName)) {
      newErrors.lastName = 'Nom invalide (lettres uniquement, max 100 caractères)';
    }

    if (!email || !validateEmail(email)) {
      newErrors.email = 'Email invalide';
    }

    if (!phone || !validatePhone(phone)) {
      newErrors.phone = 'Téléphone invalide (6-20 caractères)';
    }

    if (company && !validateAlphanumeric(company)) {
      newErrors.company = 'Nom d\'entreprise invalide';
    }

    if (position && !validateAlphanumeric(position)) {
      newErrors.position = 'Poste invalide';
    }

    if (website && !validateUrl(website)) {
      newErrors.website = 'URL invalide (doit commencer par http:// ou https://)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({
        id: Date.now().toString(),
        firstName,
        lastName,
        email,
        phone,
        company: company || undefined,
        position: position || undefined,
        website: website || undefined,
      });

      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setPosition('');
      setWebsite('');
      setErrors({});
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Nouveau contact</Text>

        <View style={styles.field}>
          <Text style={styles.label}>
            Prénom <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={[styles.input, errors.firstName && styles.inputError]}
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
              if (errors.firstName) {
                setErrors({ ...errors, firstName: '' });
              }
            }}
            placeholder="koffi"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="words"
          />
          {errors.firstName && (
            <Text style={styles.errorText}>{errors.firstName}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>
            Nom <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={[styles.input, errors.lastName && styles.inputError]}
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
              if (errors.lastName) {
                setErrors({ ...errors, lastName: '' });
              }
            }}
            placeholder="Adingra"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="words"
          />
          {errors.lastName && (
            <Text style={styles.errorText}>{errors.lastName}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>
            Email <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) {
                setErrors({ ...errors, email: '' });
              }
            }}
            placeholder="jean.adingra@example.com"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>
            Téléphone <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={[styles.input, errors.phone && styles.inputError]}
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
              if (errors.phone) {
                setErrors({ ...errors, phone: '' });
              }
            }}
            placeholder="+225 00 00 00 00 00"
            placeholderTextColor="#9CA3AF"
            keyboardType="phone-pad"
            autoComplete="tel"
          />
          {errors.phone && (
            <Text style={styles.errorText}>{errors.phone}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Entreprise</Text>
          <TextInput
            style={[styles.input, errors.company && styles.inputError]}
            value={company}
            onChangeText={(text) => {
              setCompany(text);
              if (errors.company) {
                setErrors({ ...errors, company: '' });
              }
            }}
            placeholder="Ma Société"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="words"
          />
          {errors.company && (
            <Text style={styles.errorText}>{errors.company}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Poste</Text>
          <TextInput
            style={[styles.input, errors.position && styles.inputError]}
            value={position}
            onChangeText={(text) => {
              setPosition(text);
              if (errors.position) {
                setErrors({ ...errors, position: '' });
              }
            }}
            placeholder="Développeur"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="words"
          />
          {errors.position && (
            <Text style={styles.errorText}>{errors.position}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Site web</Text>
          <TextInput
            style={[styles.input, errors.website && styles.inputError]}
            value={website}
            onChangeText={(text) => {
              setWebsite(text);
              if (errors.website) {
                setErrors({ ...errors, website: '' });
              }
            }}
            placeholder="https://example.com"
            placeholderTextColor="#9CA3AF"
            keyboardType="url"
            autoCapitalize="none"
            autoComplete="url"
          />
          {errors.website && (
            <Text style={styles.errorText}>{errors.website}</Text>
          )}
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onCancel}
          >
            <Text style={styles.cancelButtonText}>✕ Annuler</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.submitButton]}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>✓ Ajouter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
  },
  required: {
    color: '#EF4444',
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#111827',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
  },
  cancelButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#10B981',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
