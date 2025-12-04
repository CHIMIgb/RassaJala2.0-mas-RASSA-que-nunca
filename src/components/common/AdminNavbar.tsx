// src/components/common/Navbar.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { navbarStyles } from '../../styles/components/Navbar.styles';
import { useAuth } from '../../contexts/AuthContext';

// Define el tipo para la navegación
type NavbarNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Lista de pantallas donde NO debe aparecer el botón de retroceso
const SCREENS_WITHOUT_BACK_BUTTON = [
  'AdminPanel'
];

const Navbar = () => {
  const navigation = useNavigation<NavbarNavigationProp>();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const canGoBack = navigation.canGoBack();
  const { user, token } = useAuth();

  // Determinar si debemos mostrar el botón de retroceso
  const shouldShowBackButton = canGoBack && !SCREENS_WITHOUT_BACK_BUTTON.includes(route.name);

  const handleAuthPress = () => {
    if (user && token) {
      navigation.navigate('ProfileAdmin');
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={[navbarStyles.header, { paddingTop: insets.top + 16 }]}>
      {/* Sección izquierda - Siempre visible para mantener el espacio */}
      <View style={navbarStyles.leftSection}>
        <View style={navbarStyles.leftContent}>
          {/* Botón de retroceso - Ocupa espacio pero es invisible cuando no se necesita */}
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={[
              navbarStyles.backButton,
              !shouldShowBackButton && { opacity: 0 } // Hacer invisible pero mantener espacio
            ]}
            disabled={!shouldShowBackButton} // Deshabilitar cuando no es visible
          >
            <Text style={navbarStyles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={navbarStyles.logo}>MiruGo</Text>
        </View>
      </View>

      {/* Botones de acción */}
      <View style={navbarStyles.rightSection}>
        {/* Botón de usuario - mostrar nombre o "Iniciar Sesión" */}
        {route.name !== 'Login' && route.name !== 'ForgotPassword' && route.name !== 'Register' && (
          <TouchableOpacity 
            style={[
              navbarStyles.loginButton,
              user && token && navbarStyles.userButton
            ]}
            onPress={handleAuthPress}
          >
            <Text style={navbarStyles.loginButtonText}>
              {user && token ? `👤 ${user.nombre_usuario}` : 'Iniciar Sesión'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Navbar;