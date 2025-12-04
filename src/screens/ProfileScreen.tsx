// src/screens/ProfileScreen.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';
import { profileStyles } from '../styles/screens/ProfileScreen.styles';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

const ProfileScreen = () => {
  const { user, token, logout } = useAuth();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [tokenVisible, setTokenVisible] = useState(false);

  const handleLogout = () => {
    logout();
    navigation.navigate('Home');
  };

  const copyToClipboard = async () => {
    if (token) {
      await Clipboard.setStringAsync(token);
      Alert.alert('Éxito', 'Token copiado al portapapeles');
    }
  };

  const toggleTokenVisibility = () => {
    setTokenVisible(!tokenVisible);
  };

  return (
    <SafeAreaView style={profileStyles.container}>
      <ScrollView contentContainerStyle={profileStyles.scrollContent}>
        <View style={profileStyles.header}>
          <Text style={profileStyles.title}>Mi Perfil</Text>
        </View>

        <View style={profileStyles.profileCard}>
          <Text style={profileStyles.sectionTitle}>Información del Usuario</Text>
          
          <View style={profileStyles.infoRow}>
            <Text style={profileStyles.label}>Nombre de usuario:</Text>
            <Text style={profileStyles.value}>{user?.nombre_usuario || 'No disponible'}</Text>
          </View>

          <View style={profileStyles.infoRow}>
            <Text style={profileStyles.label}>ID de usuario:</Text>
            <Text style={profileStyles.value}>{user?.id_usuario || 'No disponible'}</Text>
          </View>

          <View style={profileStyles.infoRow}>
            <Text style={profileStyles.label}>Rol:</Text>
            <Text style={profileStyles.value}>{user?.nombre_rol || 'No disponible'}</Text>
          </View>

          <View style={profileStyles.infoRow}>
            <Text style={profileStyles.label}>ID de rol:</Text>
            <Text style={profileStyles.value}>{user?.id_rol || 'No disponible'}</Text>
          </View>

          <View style={profileStyles.tokenSection}>
            <View style={profileStyles.tokenHeader}>
              <Text style={profileStyles.label}>Token:</Text>
              <View style={profileStyles.tokenButtons}>
                <TouchableOpacity onPress={toggleTokenVisibility} style={profileStyles.smallButton}>
                  <Text style={profileStyles.smallButtonText}>
                    {tokenVisible ? 'Ocultar' : 'Mostrar'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={copyToClipboard} style={profileStyles.smallButton}>
                  <Text style={profileStyles.smallButtonText}>Copiar</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {tokenVisible ? (
              <View style={profileStyles.tokenContainer}>
                <ScrollView horizontal>
                  <Text style={profileStyles.tokenValue} selectable>
                    {token || 'No disponible'}
                  </Text>
                </ScrollView>
              </View>
            ) : (
              <Text style={profileStyles.tokenPlaceholder}>
                ••••••••••••••••••••••••••••••••
              </Text>
            )}
          </View>
        </View>

        <TouchableOpacity style={profileStyles.logoutButton} onPress={handleLogout}>
          <Text style={profileStyles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;