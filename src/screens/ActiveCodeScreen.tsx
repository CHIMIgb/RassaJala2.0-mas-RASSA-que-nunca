import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useRegisterHook } from '../hooks/users/useRegisterHook';
import { activeCodeStyles } from '../styles/screens/ActiveCodeScreen.styles';

const ActiveCodeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const { 
    getStoredUserId, 
    sendActivationCode, 
    sendActivationLoading,
    activateAccount, 
    activateAccountLoading,
    getStoredCredentials,
    removeStoredCredentials,
    resendActivationCode,
    resendActivationLoading
  } = useRegisterHook();
  
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(120); // 2 minutos en segundos
  const [canResend, setCanResend] = useState(false);

  const [initialCodeSent, setInitialCodeSent] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>(Array(6).fill(null));
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Efecto para el temporizador
  useEffect(() => {
    if (timer > 0 && !canResend) {
      timerRef.current = setTimeout(() => setTimer(timer - 1), 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timer, canResend]);

  // Efecto para obtener el ID del usuario
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const routeParams = route.params as { userId?: string };
        if (routeParams?.userId) {
          setUserId(routeParams.userId);
          console.log('📋 [ActiveCodeScreen] ID obtenido de parámetros:', routeParams.userId);
        } else {
          const storedUserId = await getStoredUserId();
          if (storedUserId) {
            setUserId(storedUserId);
            console.log('📋 [ActiveCodeScreen] ID obtenido de SecureStore:', storedUserId);
          } else {
            console.warn('⚠️ [ActiveCodeScreen] No se encontró ID de usuario');
            Alert.alert('Error', 'No se encontró información del usuario. Por favor regresa al registro.');
          }
        }
      } catch (error) {
        console.error('❌ [ActiveCodeScreen] Error al obtener ID:', error);
        Alert.alert('Error', 'Ocurrió un error al cargar la información del usuario');
      }
    };

    fetchUserId();
  }, [route.params]);

  // Efecto para enviar el código de activación la primera vez
  useEffect(() => {
    const sendInitialCode = async () => {
      if (userId && !initialCodeSent) {
        console.log('🚀 [ActiveCodeScreen] Disparando envío de código inicial para el usuario ID:', userId);
        setInitialCodeSent(true);
        setCanResend(false);
        setTimer(120); // Reiniciar temporizador
        
        try {
          const result = await sendActivationCode(userId);
          if (result.success) {
            console.log('✅ [ActiveCodeScreen] Correo inicial enviado con éxito.');
          } else {
            Alert.alert('❌ Error de envío inicial', result.message || 'No se pudo enviar el código de activación.');
          }
        } catch (error) {
          console.error('❌ [ActiveCodeScreen] Error en el envío inicial:', error);
          Alert.alert('Error', 'Ocurrió un error al enviar el código de activación inicial.');
        }
      }
    };
  
    sendInitialCode();
  }, [userId, initialCodeSent]);

  const handleCodeChange = (text: string, index: number) => {
    const numericText = text.replace(/[^0-9]/g, '');
    
    if (numericText.length <= 1) {
      const newCode = [...code];
      newCode[index] = numericText;
      setCode(newCode);
      
      if (numericText && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
      
      // Si el último dígito se completa, validar automáticamente
      if (index === 5 && numericText) {
        handleValidateCode();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    if (numericText.length === 6) {
      const newCode = numericText.split('');
      setCode(newCode);
      
      // Enfocar el último input después de pegar
      inputRefs.current[5]?.focus();
      
      // Validar automáticamente después de pegar
      setTimeout(() => handleValidateCode(), 100);
    }
  };

  // En tu ActiveCodeScreen.tsx - actualiza la función handleValidateCode
// En ActiveCodeScreen.tsx - actualiza handleValidateCode
const handleValidateCode = async () => {
  const fullCode = code.join('');
  
  if (fullCode.length !== 6) {
    return;
  }
  
  if (!userId) {
    Alert.alert('Error', 'No se encontró información del usuario');
    return;
  }
  
  setLoading(true);
  
  try {
    // Obtener las credenciales almacenadas
    const credentials = await getStoredCredentials();
    console.log('🔐 [ActiveCodeScreen] Credenciales obtenidas:', credentials);

    // Convertir null a undefined para que coincida con el tipo esperado
    const credentialsForActivation = credentials || undefined;
    
    // Activar cuenta con login automático si hay credenciales
    const result = await activateAccount(userId, fullCode, credentialsForActivation);
    
    setLoading(false);
    
    if (result.success) {
      if (result.autoLogin) {
        console.log('✅ [ActiveCodeScreen] Cuenta activada y login automático exitoso, navegando a Home...');
        
        // Limpiar credenciales después del uso exitoso
        await removeStoredCredentials();
        
        // Navegar directamente a Home
        navigation.navigate('Home' as never);
      } else {
        console.log('ℹ️ [ActiveCodeScreen] Cuenta activada pero sin login automático');
        
        // Limpiar credenciales
        await removeStoredCredentials();
        
        if (Platform.OS === 'web') {
          // Para web: navegar a Login
          navigation.navigate('Login' as never);
        } else {
          // Para móvil: mostrar mensaje y navegar
          Alert.alert(
            '¡Cuenta activada!', 
            result.message,
            [{ 
              text: 'Iniciar Sesión', 
              onPress: () => navigation.navigate('Login' as never)
            }]
          );
        }
      }
    } else {
      Alert.alert('Error', result.message || 'Error al activar la cuenta');
    }
    
  } catch (error) {
    setLoading(false);
    Alert.alert('Error', 'Ocurrió un error al validar el código');
    console.error('Error validating code:', error);
  }
};

  // Función para reenviar el codigo de activacion
  const handleResendCode = async () => {
    if (!userId) {
      Alert.alert('Error', 'No se encontró información del usuario');
      return;
    }

    if (!canResend) {
      Alert.alert('Espera', `Podrás reenviar el código en ${formatTime(timer)}`);
      return;
    }

    try {
      console.log('🔄 [ActiveCodeScreen] Reenviando código para usuario ID:', userId);
      
      // Usar la nueva función de reenvío
      const result = await resendActivationCode(userId);
      
      if (result.success) {
        setCanResend(false);
        setTimer(120); // Reiniciar temporizador a 2 minutos
        
        Alert.alert(
          '✅ Código reenviado', 
          `${result.message}\n\nCorreo: ${result.correo || 'tu correo electrónico'}`,
          [{ text: 'OK' }]
        );
        
        console.log('✅ [ActiveCodeScreen] Código reenviado exitosamente');
      } else {
        Alert.alert('❌ Error', result.message || 'Error al reenviar el código');
      }
    } catch (error) {
      console.error('❌ [ActiveCodeScreen] Error al reenviar código:', error);
      Alert.alert('Error', 'Ocurrió un error al reenviar el código');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={activeCodeStyles.container}
    >
      <ScrollView contentContainerStyle={activeCodeStyles.scrollContainer}>
        <View style={activeCodeStyles.innerContainer}>
          
          {/* Icono de correo */}
          <View style={activeCodeStyles.iconContainer}>
            <Ionicons name="mail" size={80} color="#4A90E2" />
          </View>
          
          <Text style={activeCodeStyles.title}>Verifica tu correo electrónico</Text>
          <Text style={activeCodeStyles.subtitle}>
            Hemos enviado un código de verificación de 6 dígitos a tu correo electrónico.
            Por favor ingrésalo a continuación.
          </Text>
          
          {/* Campos de entrada de código */}
          <View style={activeCodeStyles.codeContainer}>
            <Text style={activeCodeStyles.codeLabel}>Código de verificación</Text>
            <View style={activeCodeStyles.codeInputsContainer}>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={el => (inputRefs.current[index] = el)}
                  style={[activeCodeStyles.codeInput, digit && activeCodeStyles.codeInputFilled]}
                  value={digit}
                  onChangeText={(text) => handleCodeChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  onPaste={(e) => {
                    if (index === 0) handlePaste(e.nativeEvent.text);
                  }}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                  editable={!loading && !sendActivationLoading}
                />
              ))}
            </View>
          </View>
          
          {/* Temporizador */}
          <View style={activeCodeStyles.timerContainer}>
            <Text style={activeCodeStyles.timerText}>
              {canResend ? 'Puedes solicitar un nuevo código' : `Podrás solicitar un nuevo código en ${formatTime(timer)}`}
            </Text>
          </View>
          
          {/* Botón de validar código */}
          <TouchableOpacity
            style={[
              activeCodeStyles.validateButton,
              code.join('').length === 6 ? activeCodeStyles.validateButtonActive : activeCodeStyles.validateButtonDisabled
            ]}
            onPress={handleValidateCode}
            disabled={code.join('').length !== 6 || loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={activeCodeStyles.validateButtonText}>Validar código</Text>
            )}
          </TouchableOpacity>
          
          {/* Botón de reenviar código */}
          <TouchableOpacity
            style={[
              activeCodeStyles.resendButton,
              canResend ? {} : activeCodeStyles.resendButtonDisabled
            ]}
            onPress={handleResendCode}
            disabled={!canResend || sendActivationLoading}
          >
            {sendActivationLoading ? (
              <ActivityIndicator color="#4A90E2" />
            ) : (
              <Text style={activeCodeStyles.resendButtonText}>Reenviar código</Text>
            )}
          </TouchableOpacity>
          
          {/* Botón para volver atrás */}
          <TouchableOpacity
            style={activeCodeStyles.backButton}
            onPress={() => navigation.goBack()}
            disabled={loading}
          >
            <Ionicons name="arrow-back" size={20} color="#4A90E2" />
            <Text style={activeCodeStyles.backButtonText}>Volver atrás</Text>
          </TouchableOpacity>
          
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ActiveCodeScreen;