import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  Alert,
  ActivityIndicator // Importar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { forgotPasswordStyles } from '../styles/screens/ForgotPasswordScreen.styles';
import { usePasswordRecoveryHook } from '../hooks/auth/usePasswordRecoveryHook'; // Importar hook

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
      <View style={forgotPasswordStyles.innerContainer}>
        <Text style={forgotPasswordStyles.title}>Recuperar Contraseña</Text>
        
        <View style={forgotPasswordStyles.form}>
          <Text style={forgotPasswordStyles.instructions}>
            Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
          </Text>
          
          <TextInput
            style={[
              forgotPasswordStyles.input, 
              loading && forgotPasswordStyles.inputDisabled // Estilo opcional
            ]}
            placeholder="Correo electrónico"
            placeholderTextColor="#999"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email} // Controlar el valor
            onChangeText={setEmail} // Actualizar el estado
            editable={!loading} // Deshabilitar mientras carga
          />
          
          <TouchableOpacity 
            style={[
              forgotPasswordStyles.recoverButton,
              loading && forgotPasswordStyles.recoverButtonDisabled // Estilo opcional
            ]}
            onPress={handleRecoverPassword}
            disabled={loading} // Deshabilitar mientras carga
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
              loading && forgotPasswordStyles.backButtonDisabled // Estilo opcional
            ]}
            onPress={() => navigation.goBack()}
            disabled={loading} // Deshabilitar mientras carga
          >
            <Text style={forgotPasswordStyles.backButtonText}>Volver al login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;