// src/screens/ForgotPasswordScreen.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  Alert,
  ActivityIndicator,
  ScrollView,
  Image,
  ImageBackground
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { forgotPasswordStyles } from '../styles/screens/ForgotPasswordScreen.styles';
import { usePasswordRecoveryHook } from '../hooks/auth/usePasswordRecoveryHook';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  
  // Estados del componente
  const [email, setEmail] = useState('');
  
  // Hook para la lógica de recuperación
  const { requestRecovery, loading, error, successMessage } = usePasswordRecoveryHook();

  // Efecto para mostrar alerta de éxito y navegar atrás
  useEffect(() => {
    if (successMessage) {
      Alert.alert('Éxito', successMessage);
      navigation.goBack();
    }
  }, [successMessage, navigation]);

  // Efecto para mostrar alerta de error
  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  const handleRecoverPassword = () => {
    // Validación simple
    if (!email || !email.includes('@')) {
      Alert.alert('Correo Inválido', 'Por favor ingresa un correo electrónico válido.');
      return;
    }
    
    console.log('Solicitando recuperación para:', email);
    requestRecovery(email);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={forgotPasswordStyles.container}
    >
      {/* Imagen de fondo con transparencia */}
      <ImageBackground
        source={require('../../assets/imagenes/Rassa-Jala.png')} 
        style={forgotPasswordStyles.backgroundImage}
        resizeMode="cover"
      />
      
      {/* Capa verde semi-transparente */}
      <View style={forgotPasswordStyles.overlay} />

      <ScrollView contentContainerStyle={forgotPasswordStyles.scrollContainer}>
        <View style={forgotPasswordStyles.innerContainer}>
          {/* Logo dentro del card */}
          <View style={forgotPasswordStyles.logoContainer}>
            <Image 
              source={require('../../assets/imagenes/Rassa-Jala.png')} 
              style={forgotPasswordStyles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={forgotPasswordStyles.title}>Recuperar Contraseña</Text>
          
          <View style={forgotPasswordStyles.form}>
            <Text style={forgotPasswordStyles.instructions}>
              Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
            </Text>
            
            <TextInput
              style={[
                forgotPasswordStyles.input, 
                loading && forgotPasswordStyles.inputDisabled
              ]}
              placeholder="ejemplo@correo.com"
              placeholderTextColor="#A5D6A7"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              editable={!loading}
            />
            
            <TouchableOpacity 
              style={[
                forgotPasswordStyles.recoverButton,
                loading && forgotPasswordStyles.recoverButtonDisabled
              ]}
              onPress={handleRecoverPassword}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={forgotPasswordStyles.recoverButtonText}>Enviar instrucciones</Text>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                forgotPasswordStyles.backButton,
                loading && forgotPasswordStyles.backButtonDisabled
              ]}
              onPress={() => navigation.goBack()}
              disabled={loading}
            >
              <Text style={forgotPasswordStyles.backButtonText}>Volver al login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;