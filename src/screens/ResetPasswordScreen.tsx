// src/screens/ResetPasswordScreen.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  Modal, 
  ActivityIndicator,
  ScrollView,
  Image,
  ImageBackground
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

  // Estado para el Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: '',
    message: '',
    onConfirm: () => {},
  });

  // Función para mostrar el modal
  const showModal = (title: string, message: string, onConfirm = () => {}) => {
    setModalInfo({ title, message, onConfirm });
    setIsModalVisible(true);
  };

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

  // Validaciones para mostrar checks
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[.#@$%]/.test(password);

  // Manejador del botón
  const handleResetPassword = async () => {
    if (!token) {
      showModal('Error', 'No hay un token válido. Solicita un nuevo enlace.');
      return;
    }

    if (!isFormValid) {
      showModal('Formulario inválido', 'Por favor corrige los errores en el formulario.');
      return;
    }

    console.log('Solicitando restablecimiento con token:', token);
    
    const result = await resetPassword({
      password: password,
      confirmar_password: confirmPassword
    }, token);

    if (result.success) {
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

  // Función para cerrar el modal
  const handleModalClose = () => {
    setIsModalVisible(false);
    modalInfo.onConfirm();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={resetPasswordStyles.container}
    >
      {/* Imagen de fondo con transparencia */}
      <ImageBackground
        source={require('../../assets/imagenes/Rassa-Jala.png')} 
        style={resetPasswordStyles.backgroundImage}
        resizeMode="cover"
      />
      
      {/* Capa verde semi-transparente */}
      <View style={resetPasswordStyles.overlay} />

      {/* Modal personalizado */}
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
        <View style={resetPasswordStyles.card}>
          {/* Logo dentro del card */}
          <View style={resetPasswordStyles.logoContainer}>
            <Image 
              source={require('../../assets/imagenes/Rassa-Jala.png')} 
              style={resetPasswordStyles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={resetPasswordStyles.title}>Restablecer contraseña</Text>
          
          <View style={resetPasswordStyles.form}>
            <Text style={resetPasswordStyles.instructions}>
              Escribe tu nueva contraseña
            </Text>
            
            {/* Campo de nueva contraseña con icono de ojo */}
            <View style={resetPasswordStyles.passwordContainer}>
              <TextInput
                style={[
                  resetPasswordStyles.passwordInput, 
                  resetLoading && resetPasswordStyles.inputDisabled,
                  validationErrors.passwordLength ? resetPasswordStyles.inputError : null
                ]}
                placeholder="Ejemplo: TILINe123."
                placeholderTextColor="#A5D6A7"
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
                  color="#5D7A2E" 
                />
              </TouchableOpacity>
            </View>
            {validationErrors.passwordLength ? (
              <Text style={resetPasswordStyles.errorText}>{validationErrors.passwordLength}</Text>
            ) : null}
            
            {/* Campo de confirmar contraseña */}
            <Text style={resetPasswordStyles.instructions}>
              Confirma tu nueva contraseña
            </Text>
            <View style={resetPasswordStyles.passwordContainer}>
              <TextInput
                style={[
                  resetPasswordStyles.passwordInput, 
                  resetLoading && resetPasswordStyles.inputDisabled,
                  validationErrors.passwordMatch ? resetPasswordStyles.inputError : null
                ]}
                placeholder="Ejemplo: TILINe123."
                placeholderTextColor="#A5D6A7"
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
                  color="#5D7A2E" 
                />
              </TouchableOpacity>
            </View>
            {validationErrors.passwordMatch ? (
              <Text style={resetPasswordStyles.errorText}>{validationErrors.passwordMatch}</Text>
            ) : null}

            {/* Lista de validaciones */}
            <View style={resetPasswordStyles.validationList}>
              <View style={resetPasswordStyles.validationItem}>
                <Icon 
                  name={hasMinLength ? "check-circle" : "cancel"} 
                  size={20} 
                  color={hasMinLength ? "#27ae60" : "#bdc3c7"}
                  style={resetPasswordStyles.validationIcon}
                />
                <Text style={[
                  resetPasswordStyles.validationText,
                  hasMinLength && resetPasswordStyles.validationTextValid
                ]}>
                  Contiene al menos 8 caracteres: abc
                </Text>
              </View>

              <View style={resetPasswordStyles.validationItem}>
                <Icon 
                  name={hasUpperCase ? "check-circle" : "cancel"} 
                  size={20} 
                  color={hasUpperCase ? "#27ae60" : "#bdc3c7"}
                  style={resetPasswordStyles.validationIcon}
                />
                <Text style={[
                  resetPasswordStyles.validationText,
                  hasUpperCase && resetPasswordStyles.validationTextValid
                ]}>
                  Contiene al menos una letra mayúscula: ABC
                </Text>
              </View>

              <View style={resetPasswordStyles.validationItem}>
                <Icon 
                  name={hasNumber ? "check-circle" : "cancel"} 
                  size={20} 
                  color={hasNumber ? "#27ae60" : "#bdc3c7"}
                  style={resetPasswordStyles.validationIcon}
                />
                <Text style={[
                  resetPasswordStyles.validationText,
                  hasNumber && resetPasswordStyles.validationTextValid
                ]}>
                  Contiene al menos un caracter numérico: 123
                </Text>
              </View>

              <View style={resetPasswordStyles.validationItem}>
                <Icon 
                  name={hasSpecialChar ? "check-circle" : "cancel"} 
                  size={20} 
                  color={hasSpecialChar ? "#27ae60" : "#bdc3c7"}
                  style={resetPasswordStyles.validationIcon}
                />
                <Text style={[
                  resetPasswordStyles.validationText,
                  hasSpecialChar && resetPasswordStyles.validationTextValid
                ]}>
                  Contiene al menos un caracter especial: .#@$%
                </Text>
              </View>
            </View>
            
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
                <Text style={resetPasswordStyles.resetButtonText}>Aceptar</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={resetPasswordStyles.backButton}
              onPress={() => navigation.navigate('Login')}
              disabled={resetLoading}
            >
              <Text style={resetPasswordStyles.backButtonText}>Volver al login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ResetPasswordScreen;