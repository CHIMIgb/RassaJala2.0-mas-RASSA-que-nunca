import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { footerStyles } from '../../styles/components/Footer.styles';

const Footer = () => {
  const navigation = useNavigation();

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error('Error al abrir enlace:', err));
  };

  return (
    <View style={footerStyles.footer}>
      {/* Primera fila: Redes sociales, Ubicación, Contacto, Privacidad */}
      <View style={footerStyles.topRow}>
        
      {/* Columna 1: Redes Sociales */}
      <View style={footerStyles.column}>
        <Text style={footerStyles.columnTitle}>Redes sociales</Text>
        <View style={footerStyles.socialIcons}>
          <TouchableOpacity onPress={() => openLink('https://facebook.com')}>
            <Icon name="facebook" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink('https://instagram.com')}>
            <Icon name="instagram" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink('https://twitter.com')}>
            <Icon name="twitter" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink('https://whatsapp.com')}>
            <Icon name="whatsapp" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

        {/* Columna 2: Ubicación */}
        <View style={footerStyles.column}>
          <Text style={footerStyles.columnTitle}>Ubicación</Text>
          <TouchableOpacity onPress={() => openLink('https://maps.google.com')}>
            <View style={footerStyles.locationContainer}>
              <Icon name="location-on" size={18} color={footerStyles.locationIcon.color} />
              <Text style={footerStyles.locationText}>Lacasadeshadi 1234</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Columna 3: Contáctanos */}
        <View style={footerStyles.column}>
          <Text style={footerStyles.columnTitle}>Contáctanos</Text>
          <TouchableOpacity>
            <Text style={footerStyles.linkText}>Escribenos</Text>
          </TouchableOpacity>
        </View>

        {/* Columna 4: Aviso de privacidad */}
        <View style={footerStyles.column}>
          <Text style={footerStyles.columnTitle}>Aviso de privacidad</Text>
          <TouchableOpacity>
            <Text style={footerStyles.linkText}>Ver aviso de privacidad</Text>
          </TouchableOpacity>
        </View>

      </View>

      {/* Línea divisoria */}
      <View style={footerStyles.divider} />

      {/* Segunda fila: Preguntas frecuentes y Aviso de cookies */}
      <View style={footerStyles.bottomRow}>
        
        <TouchableOpacity style={footerStyles.bottomLink}>
          <Icon name="help-outline" size={16} color={footerStyles.bottomIcon.color} />
          <Text style={footerStyles.bottomLinkText}>Preguntas frecuentes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={footerStyles.bottomLink}>
          <Icon name="cookie" size={16} color={footerStyles.bottomIcon.color} />
          <Text style={footerStyles.bottomLinkText}>Aviso de cookies</Text>
        </TouchableOpacity>

      </View>

      {/* Copyright */}
      <View style={footerStyles.copyrightContainer}>
        <Text style={footerStyles.copyrightText}>© 2024 Rassa-Jala. Todos los derechos reservados.</Text>
      </View>
    </View>
  );
};

export default Footer;