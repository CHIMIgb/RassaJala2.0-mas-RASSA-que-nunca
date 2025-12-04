// src/screens/ProfileAdminScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { profileAdminStyles } from '../../styles/screens/admin/ProfileAdminScreen.styles';

type ProfileAdminScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

const ProfileAdminScreen = () => {
  const { user, token, logout } = useAuth();
  const navigation = useNavigation<ProfileAdminScreenNavigationProp>();

  const handleLogout = () => {
    logout();
    navigation.navigate('Home');
  };

  // Función para navegar al panel de administración
  const goToAdminPanel = () => {
    navigation.navigate('AdminPanel');
  };

  return (
    <SafeAreaView style={profileAdminStyles.container}>
      <ScrollView contentContainerStyle={profileAdminStyles.scrollContent}>
        <View style={profileAdminStyles.header}>
          <Text style={profileAdminStyles.title}>Panel de Administrador</Text>
          <Text style={profileAdminStyles.subtitle}>Perfil del Administrador</Text>
        </View>

        <View style={profileAdminStyles.profileCard}>
          <Text style={profileAdminStyles.sectionTitle}>Información del Administrador</Text>
          
          <View style={profileAdminStyles.infoRow}>
            <Text style={profileAdminStyles.label}>Nombre de usuario:</Text>
            <Text style={profileAdminStyles.value}>{user?.nombre_usuario || 'No disponible'}</Text>
          </View>

          <View style={profileAdminStyles.infoRow}>
            <Text style={profileAdminStyles.label}>ID de usuario:</Text>
            <Text style={profileAdminStyles.value}>{user?.id_usuario || 'No disponible'}</Text>
          </View>

          <View style={profileAdminStyles.infoRow}>
            <Text style={profileAdminStyles.label}>Rol:</Text>
            <Text style={[profileAdminStyles.value, profileAdminStyles.adminText]}>{user?.nombre_rol || 'Administrador'}</Text>
          </View>

          <View style={profileAdminStyles.infoRow}>
            <Text style={profileAdminStyles.label}>ID de rol:</Text>
            <Text style={profileAdminStyles.value}>{user?.id_rol || 'No disponible'}</Text>
          </View>

          <View style={profileAdminStyles.infoRow}>
            <Text style={profileAdminStyles.label}>Token:</Text>
            <Text style={[profileAdminStyles.value, profileAdminStyles.tokenText]} numberOfLines={1} ellipsizeMode="middle">
              {token ? `${token.substring(0, 15)}...` : 'No disponible'}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={profileAdminStyles.logoutButton} onPress={handleLogout}>
          <Text style={profileAdminStyles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileAdminScreen;