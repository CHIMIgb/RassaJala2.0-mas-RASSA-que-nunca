// src/components/common/Navbar.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { navbarStyles } from '../../styles/components/Navbar.styles';
import { useAuth } from '../../contexts/AuthContext';

// Define el tipo para la navegación
type NavbarNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Navbar = () => {
  const navigation = useNavigation<NavbarNavigationProp>();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const canGoBack = navigation.canGoBack();
  const { user, token } = useAuth(); // ← Obtener usuario y token del contexto

  const getTitle = () => {
    switch (route.name) {
      case 'Home': return 'Inicio';
      case 'Login': return 'Iniciar Sesión';
      default: return route.name;
    }
  };

  const handleAuthPress = () => {
    if (user && token) {
      // Si está autenticado, navegar al perfil
      navigation.navigate('Profile');
    } else {
      // Si no está autenticado, navegar al login
      navigation.navigate('Login');
    }
  };

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  return (
    <View style={[navbarStyles.header, { paddingTop: insets.top + 16 }]}>
      {/* Botón de retroceso + RASSA JALA */}
      <View style={navbarStyles.leftSection}>
        {canGoBack ? (
          <View style={navbarStyles.leftContent}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()} 
              style={navbarStyles.backButton}
            >
              <Text style={navbarStyles.backText}>←</Text>
            </TouchableOpacity>
            <Text style={navbarStyles.logo}>RASSA JALA</Text>
          </View>
        ) : (
          <Text style={navbarStyles.logo}>RASSA JALA</Text>
        )}
      </View>

      {/* Botones de acción */}
      <View style={navbarStyles.rightSection}>
        {/* Botón de usuario - mostrar nombre o "Iniciar Sesión" */}
        {route.name !== 'Login' && route.name !== 'ForgotPassword' && route.name !== 'Register' && route.name !== 'ActiveCodeScreen' && (
          <TouchableOpacity 
            style={[
              navbarStyles.loginButton,
              user && token && navbarStyles.userButton // Estilo diferente si está logueado
            ]}
            onPress={handleAuthPress}
          >
            <Text style={navbarStyles.loginButtonText}>
              {user && token ? `👤 ${user.nombre_usuario}` : 'Iniciar Sesión'}
            </Text>
          </TouchableOpacity>
        )}

        {/* Botón de carrito - ocultar en pantalla de Login */}
        {route.name !== 'Login' && route.name !== 'ForgotPassword' && route.name !== 'Register' && route.name !== 'ActiveCodeScreen' &&(
          <TouchableOpacity onPress={handleCartPress} style={navbarStyles.cartButton}>
            <Text style={navbarStyles.cartIcon}>🛒</Text>
            {/* Indicador de notificaciones */}
            <View style={navbarStyles.cartBadge}>
              <Text style={navbarStyles.cartBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Navbar;