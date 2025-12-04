import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  // --- MODIFICADO: Ya no importamos Alert, importamos Modal ---
  Modal, 
  ActivityIndicator,
  ScrollView,
  StyleSheet // Necesario para los estilos del modal
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { usePasswordRecoveryHook } from '../hooks/auth/usePasswordRecoveryHook';
import { resetPasswordStyles } from '../styles/screens/ResetPasswordScreen.styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Tipos de Navegación
type ResetPasswordRouteProp = RouteProp<RootStackParamList, 'ResetPassword'>;
type ResetPasswordNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ResetPasswordScreen = () => {
  const navigation = useNavigation<ResetPasswordNavigationProp>();
  const route = useRoute<ResetPasswordRouteProp>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { 
    resetPassword, 
    resetLoading, 
    resetError, 
    storeResetToken,
    getStoredResetToken
  } = usePasswordRecoveryHook();

  // Estados del formulario
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Estado para errores de validación
  const [validationErrors, setValidationErrors] = useState({
    passwordLength: '',
    passwordMatch: ''
  });

  // --- NUEVO: Estado para el Modal ---
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: '',
    message: '',
    onConfirm: () => {}, // Callback para ejecutar al presionar OK
  });

  // Función para mostrar el modal
  const showModal = (title: string, message: string, onConfirm = () => {}) => {
    setModalInfo({ title, message, onConfirm });
    setIsModalVisible(true);
  };
  // --- FIN DE NUEVO ESTADO ---

  // Efecto para capturar el token
  useEffect(() => {
    const loadToken = async () => {
      const paramToken = route.params?.token;
      
      if (paramToken) {
        setToken(paramToken);
        await storeResetToken(paramToken);
      } else {
        const storedToken = await getStoredResetToken();
        if (storedToken) {
          setToken(storedToken);
        } else {
          // --- MODIFICADO: Usar el modal personalizado ---
          showModal(
            'Token no encontrado', 
            'No se encontró un token válido. Por favor, solicita un nuevo enlace de recuperación.',
            () => navigation.navigate('ForgotPassword')
          );
        }
      }
    };
    
    loadToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params?.token]); 

  // Efecto para validación en tiempo real
  useEffect(() => {
    const newErrors = { passwordLength: '', passwordMatch: '' };
    if (password && password.length < 6) {
      newErrors.passwordLength = 'La contraseña debe tener al menos 6 caracteres.';
    }
    if (confirmPassword && password !== confirmPassword) {
      newErrors.passwordMatch = 'Las contraseñas no coinciden.';
    }
    setValidationErrors(newErrors);
  }, [password, confirmPassword]);

  // Efecto para manejar errores de la API
  useEffect(() => {
    if (resetError) {
      // --- MODIFICADO: Usar el modal personalizado ---
      showModal('Error', resetError);
    }
  }, [resetError]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const isFormValid = 
    password.length > 0 &&
    confirmPassword.length > 0 &&
    !validationErrors.passwordLength &&
    !validationErrors.passwordMatch;

  // Manejador del botón
  const handleResetPassword = async () => {
    if (!token) {
      // --- MODIFICADO: Usar el modal personalizado ---
      showModal('Error', 'No hay un token válido. Solicita un nuevo enlace.');
      return;
    }

    if (!isFormValid) {
      // --- MODIFICADO: Usar el modal personalizado ---
      showModal('Formulario inválido', 'Por favor corrige los errores en el formulario.');
      return;
    }

    console.log('Solicitando restablecimiento con token:', token);
    
    const result = await resetPassword({
      password: password,
      confirmar_password: confirmPassword
    }, token);

    if (result.success) {
      // --- MODIFICADO: Usar el modal personalizado ---
      showModal(
        'Éxito', 
        result.message,
        () => navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    }
  };

  // --- NUEVO: Función para cerrar el modal ---
  const handleModalClose = () => {
    setIsModalVisible(false);
    modalInfo.onConfirm(); // Ejecuta la acción (ej. redireccionar)
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={resetPasswordStyles.container}
    >
      {/* --- NUEVO: Añadir el componente Modal --- */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={resetPasswordStyles.modalBackdrop}>
          <View style={resetPasswordStyles.modalContainer}>
            <Text style={resetPasswordStyles.modalTitle}>{modalInfo.title}</Text>
            <Text style={resetPasswordStyles.modalMessage}>{modalInfo.message}</Text>
            <TouchableOpacity 
              style={resetPasswordStyles.modalButton} 
              onPress={handleModalClose}
            >
              <Text style={resetPasswordStyles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ScrollView contentContainerStyle={resetPasswordStyles.innerContainer}>
        {/* ... (El resto de tu JSX se mantiene igual) ... */}
        <Text style={resetPasswordStyles.title}>Restablecer Contraseña</Text>
        
        <View style={resetPasswordStyles.form}>
          <Text style={resetPasswordStyles.instructions}>
            Ingresa tu nueva contraseña. Asegúrate de que coincidan.
          </Text>
          
                    {/* --- MODIFICADO: Campo de nueva contraseña con icono de ojo --- */}
          <View style={resetPasswordStyles.passwordContainer}>
            <TextInput
              style={[
                resetPasswordStyles.passwordInput, 
                resetLoading && resetPasswordStyles.inputDisabled,
                validationErrors.passwordLength ? resetPasswordStyles.inputError : null
              ]}
              placeholder="Nueva contraseña (mín. 6 caracteres)"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              editable={!resetLoading}
            />
            <TouchableOpacity 
              style={resetPasswordStyles.eyeIcon}
              onPress={toggleShowPassword}
              disabled={resetLoading}
            >
              <Icon 
                name={showPassword ? "visibility-off" : "visibility"} 
                size={24} 
                color="#999" 
              />
            </TouchableOpacity>
          </View>
          {validationErrors.passwordLength ? (
            <Text style={resetPasswordStyles.errorText}>{validationErrors.passwordLength}</Text>
          ) : null}
          
          {/* --- MODIFICADO: Campo de confirmar contraseña con icono de ojo --- */}
          <View style={resetPasswordStyles.passwordContainer}>
            <TextInput
              style={[
                resetPasswordStyles.passwordInput, 
                resetLoading && resetPasswordStyles.inputDisabled,
                validationErrors.passwordMatch ? resetPasswordStyles.inputError : null
              ]}
              placeholder="Confirmar nueva contraseña"
              placeholderTextColor="#999"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              editable={!resetLoading}
            />
            <TouchableOpacity 
              style={resetPasswordStyles.eyeIcon}
              onPress={toggleShowConfirmPassword}
              disabled={resetLoading}
            >
              <Icon 
                name={showConfirmPassword ? "visibility-off" : "visibility"} 
                size={24} 
                color="#999" 
              />
            </TouchableOpacity>
          </View>
          {validationErrors.passwordMatch ? (
            <Text style={resetPasswordStyles.errorText}>{validationErrors.passwordMatch}</Text>
          ) : null}
          
          <TouchableOpacity 
            style={[
              resetPasswordStyles.resetButton,
              (resetLoading || !isFormValid) && resetPasswordStyles.resetButtonDisabled
            ]}
            onPress={handleResetPassword}
            disabled={resetLoading || !isFormValid}
          >
            {resetLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={resetPasswordStyles.resetButtonText}>Cambiar Contraseña</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ResetPasswordScreen;