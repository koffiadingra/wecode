import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  showBack?: boolean;
  rightAction?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
  };
  showProfile?: boolean;
}

export default function Header({ 
  title, 
  onBack, 
  showBack = false, 
  rightAction,
  showProfile = false 
}: HeaderProps) {
  const handleProfilePress = () => {
    router.push('/profile');
  };

  const handleBackPress = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          {showBack && (
            <TouchableOpacity onPress={handleBackPress} style={{ marginRight: 16 }}>
              <Ionicons name="arrow-back" size={24} color="#0052CC" />
            </TouchableOpacity>
          )}
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#172B4D' }}>{title}</Text>
        </View>
        
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {rightAction && (
            <TouchableOpacity onPress={rightAction.onPress} style={{ marginRight: 16 }}>
              <Ionicons name={rightAction.icon} size={24} color="#0052CC" />
            </TouchableOpacity>
          )}
          
          {showProfile && (
            <TouchableOpacity onPress={handleProfilePress}>
              <Ionicons name="person-circle" size={28} color="#0052CC" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}