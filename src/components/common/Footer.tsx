import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { footerStyles } from '../../styles/components/Footer.styles';

const Footer = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();

  const isActive = (routeName: string) => {
    return route.name === routeName;
  };

  const navigateTo = (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <View style={[footerStyles.footer, { paddingBottom: insets.bottom + 12 }]}>
      {/* Botón Home */}
      <TouchableOpacity 
        style={[footerStyles.footerButton, isActive('Home') && footerStyles.activeButton]}
        onPress={() => navigateTo('Home')}
      >
        <Text style={[footerStyles.footerIcon, isActive('Home') && footerStyles.activeIcon]}>🏠</Text>
        <Text style={[footerStyles.footerText, isActive('Home') && footerStyles.activeText]}>Inicio</Text>
      </TouchableOpacity>

      {/* Botón Perfil */}
      <TouchableOpacity 
        style={[footerStyles.footerButton, isActive('Profile') && footerStyles.activeButton]}
        onPress={() => navigateTo('Profile')}
      >
        <Text style={[footerStyles.footerIcon, isActive('Profile') && footerStyles.activeIcon]}>👤</Text>
        <Text style={[footerStyles.footerText, isActive('Profile') && footerStyles.activeText]}>Perfil</Text>
      </TouchableOpacity>

      {/* Botón Configuración */}
      <TouchableOpacity 
        style={[footerStyles.footerButton, isActive('Settings') && footerStyles.activeButton]}
        onPress={() => navigateTo('Settings')}
      >
        <Text style={[footerStyles.footerIcon, isActive('Settings') && footerStyles.activeIcon]}>⚙️</Text>
        <Text style={[footerStyles.footerText, isActive('Settings') && footerStyles.activeText]}>Ajustes</Text>
      </TouchableOpacity>

      {/* Botón Extra */}
      <TouchableOpacity 
        style={[footerStyles.footerButton, isActive('Extra') && footerStyles.activeButton]}
        onPress={() => navigateTo('Home')}
      >
        <Text style={[footerStyles.footerIcon, isActive('Extra') && footerStyles.activeIcon]}>⭐</Text>
        <Text style={[footerStyles.footerText, isActive('Extra') && footerStyles.activeText]}>Extra</Text>
      </TouchableOpacity>
    </View>
  );
};


export default Footer;