// src/screens/RegisterScreen.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  Alert,
  ActivityIndicator,
  Image,
  ImageBackground
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { registerStyles } from '../styles/screens/RegsiterScreen.styles';
import { useRegisterHook } from '../hooks/users/useRegisterHook';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { register, loading, error, success } = useRegisterHook();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    correo: '',
    sexo: '',
    nombre_usuario: '',
    password: '',
    confirmPassword: '',
    id_rol: 2
  });

  const [validationErrors, setValidationErrors] = useState({
    passwordMatch: '',
    passwordLength: '',
    sexo: ''
  });

  const [touchedFields, setTouchedFields] = useState({
    password: false,
    confirmPassword: false,
    sexo: false
  });

  // Efecto para limpiar el formulario después de registro exitoso
  useEffect(() => {
    if (success) {
      resetForm();
      navigation.navigate('ActiveCodeScreen' as never);
    }
  }, [success]);

  // Efecto para validaciones en tiempo real
  useEffect(() => {
    validateForm();
  }, [formData.password, formData.confirmPassword, formData.sexo]);

  const validateForm = () => {
    const newErrors = {
      passwordMatch: '',
      passwordLength: '',
      sexo: ''
    };

    // Validar coincidencia de contraseñas
    if (touchedFields.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.passwordMatch = 'Las contraseñas no coinciden';
    }

    // Validar longitud de contraseña
    if (touchedFields.password && formData.password.length > 0 && formData.password.length < 6) {
      newErrors.passwordLength = 'La contraseña debe tener al menos 6 caracteres';
    }

    // Validar sexo
    if (touchedFields.sexo && formData.sexo && !['M', 'F'].includes(formData.sexo)) {
      newErrors.sexo = 'Por favor selecciona un sexo válido';
    }

    setValidationErrors(newErrors);
  };

  const handleInputChange = (field: string, value: string) => {
    console.log(`📝 [RegisterScreen] Campo ${field} cambiado a:`, value);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFieldBlur = (field: string) => {
    setTouchedFields(prev => ({
      ...prev,
      [field]: true
    }));
    validateForm();
  };

  const resetForm = () => {
    console.log('🔄 [RegisterScreen] Limpiando formulario');
    setFormData({
      nombre: '',
      apellido_paterno: '',
      apellido_materno: '',
      correo: '',
      sexo: '',
      nombre_usuario: '',
      password: '',
      confirmPassword: '',
      id_rol: 2
    });
    setTouchedFields({
      password: false,
      confirmPassword: false,
      sexo: false
    });
    setValidationErrors({
      passwordMatch: '',
      passwordLength: '',
      sexo: ''
    });
  };

  const handleRegister = async () => {
    console.log('🖱️ [RegisterScreen] Botón registrar clickeado');

    // Marcar todos los campos como tocados para mostrar errores
    setTouchedFields({
      password: true,
      confirmPassword: true,
      sexo: true
    });

    // Validaciones finales
    validateForm();

    // Verificar si hay errores de validación
    if (validationErrors.passwordMatch || validationErrors.passwordLength || validationErrors.sexo) {
      Alert.alert('Error', 'Por favor corrige los errores en el formulario');
      return;
    }

    // Validaciones básicas de campos vacíos
    if (!formData.nombre || !formData.apellido_paterno || !formData.apellido_materno || 
        !formData.correo || !formData.sexo || !formData.nombre_usuario || 
        !formData.password || !formData.confirmPassword) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (!['M', 'F'].includes(formData.sexo)) {
      Alert.alert('Error', 'Por favor selecciona un sexo válido');
      return;
    }

    // Preparar datos para el endpoint
    const registerData = {
      nombre: formData.nombre,
      apellido_paterno: formData.apellido_paterno,
      apellido_materno: formData.apellido_materno,
      correo: formData.correo,
      sexo: formData.sexo,
      nombre_usuario: formData.nombre_usuario,
      password: formData.password,
      id_rol: formData.id_rol
    };

    console.log('📤 [RegisterScreen] Enviando datos al servidor:', JSON.stringify(registerData, null, 2));

    const result = await register(registerData);
    
    console.log('📨 [RegisterScreen] Resultado del registro:', result);
  };

  const isFormValid = !validationErrors.passwordMatch && 
                     !validationErrors.passwordLength && 
                     !validationErrors.sexo &&
                     formData.nombre &&
                     formData.apellido_paterno &&
                     formData.apellido_materno &&
                     formData.correo &&
                     formData.sexo &&
                     formData.nombre_usuario &&
                     formData.password &&
                     formData.confirmPassword;

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={registerStyles.container}
    >
      {/* Imagen de fondo con transparencia */}
      <ImageBackground
        source={require('../../assets/imagenes/Rassa-Jala.png')} 
        style={registerStyles.backgroundImage}
        resizeMode="cover"
      />
      
      {/* Capa verde semi-transparente */}
      <View style={registerStyles.overlay} />

      <ScrollView contentContainerStyle={registerStyles.scrollContainer}>
        <View style={registerStyles.innerContainer}>
          {/* Logo dentro del card */}
          <View style={registerStyles.logoContainer}>
            <Image 
              source={require('../../assets/imagenes/Rassa-Jala.png')} 
              style={registerStyles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={registerStyles.title}>Registrar Usuario</Text>
          
          <View style={registerStyles.form}>
            {/* Fila 1: Nombre, Apellido Paterno, Apellido Materno */}
            <View style={registerStyles.inputRow}>
              <View style={registerStyles.inputHalf}>
                <Text style={registerStyles.inputLabel}>
                  Nombre <Text style={registerStyles.inputLabelRequired}>*</Text>
                </Text>
                <TextInput
                  style={registerStyles.input}
                  placeholder="Juan"
                  placeholderTextColor="#A5D6A7"
                  value={formData.nombre}
                  onChangeText={(text) => handleInputChange('nombre', text)}
                  editable={!loading}
                />
              </View>
            </View>

            <View style={registerStyles.inputRow}>
              <View style={registerStyles.inputHalf}>
                <Text style={registerStyles.inputLabel}>Apellido Paterno</Text>
                <TextInput
                  style={registerStyles.input}
                  placeholder="Pérez"
                  placeholderTextColor="#A5D6A7"
                  value={formData.apellido_paterno}
                  onChangeText={(text) => handleInputChange('apellido_paterno', text)}
                  editable={!loading}
                />
              </View>

              <View style={registerStyles.inputHalf}>
                <Text style={registerStyles.inputLabel}>Apellido Materno</Text>
                <TextInput
                  style={registerStyles.input}
                  placeholder="López"
                  placeholderTextColor="#A5D6A7"
                  value={formData.apellido_materno}
                  onChangeText={(text) => handleInputChange('apellido_materno', text)}
                  editable={!loading}
                />
              </View>
            </View>

            {/* Correo */}
            <Text style={registerStyles.inputLabel}>Correo</Text>
            <TextInput
              style={registerStyles.input}
              placeholder="juan1@gmail.com"
              placeholderTextColor="#A5D6A7"
              autoCapitalize="none"
              keyboardType="email-address"
              value={formData.correo}
              onChangeText={(text) => handleInputChange('correo', text)}
              editable={!loading}
            />

            {/* Usuario y Contraseña en la misma fila */}
            <View style={registerStyles.inputRow}>
              <View style={registerStyles.inputHalf}>
                <Text style={registerStyles.inputLabel}>Usuario</Text>
                <TextInput
                  style={registerStyles.input}
                  placeholder="Juan23"
                  placeholderTextColor="#A5D6A7"
                  autoCapitalize="none"
                  value={formData.nombre_usuario}
                  onChangeText={(text) => handleInputChange('nombre_usuario', text)}
                  editable={!loading}
                />
              </View>

              <View style={registerStyles.inputHalf}>
                <Text style={registerStyles.inputLabel}>Contraseña</Text>
                <TextInput
                  style={[
                    registerStyles.input,
                    touchedFields.password && validationErrors.passwordLength && registerStyles.inputError
                  ]}
                  placeholder="345Juan23"
                  placeholderTextColor="#A5D6A7"
                  secureTextEntry
                  value={formData.password}
                  onChangeText={(text) => handleInputChange('password', text)}
                  onBlur={() => handleFieldBlur('password')}
                  editable={!loading}
                />
                {touchedFields.password && validationErrors.passwordLength ? (
                  <Text style={registerStyles.errorTextSmall}>{validationErrors.passwordLength}</Text>
                ) : null}
              </View>
            </View>

            {/* Confirmar Contraseña */}
            <Text style={registerStyles.inputLabel}>Confirmar Contraseña</Text>
            <TextInput
              style={[
                registerStyles.input,
                touchedFields.confirmPassword && validationErrors.passwordMatch && registerStyles.inputError
              ]}
              placeholder="345Juan23"
              placeholderTextColor="#A5D6A7"
              secureTextEntry
              value={formData.confirmPassword}
              onChangeText={(text) => handleInputChange('confirmPassword', text)}
              onBlur={() => handleFieldBlur('confirmPassword')}
              editable={!loading}
            />
            {touchedFields.confirmPassword && validationErrors.passwordMatch ? (
              <Text style={registerStyles.errorTextSmall}>{validationErrors.passwordMatch}</Text>
            ) : null}

            {/* Selector de Sexo */}
            <View style={registerStyles.selectContainer}>
              <Text style={registerStyles.selectLabel}>Sexo *</Text>
              <View style={registerStyles.selectOptions}>
                <TouchableOpacity
                  style={[
                    registerStyles.selectOption,
                    formData.sexo === 'M' && registerStyles.selectOptionSelected
                  ]}
                  onPress={() => {
                    handleInputChange('sexo', 'M');
                    handleFieldBlur('sexo');
                  }}
                  disabled={loading}
                >
                  <Text style={[
                    registerStyles.selectOptionText,
                    formData.sexo === 'M' && registerStyles.selectOptionTextSelected
                  ]}>
                    Masculino
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    registerStyles.selectOption,
                    formData.sexo === 'F' && registerStyles.selectOptionSelected
                  ]}
                  onPress={() => {
                    handleInputChange('sexo', 'F');
                    handleFieldBlur('sexo');
                  }}
                  disabled={loading}
                >
                  <Text style={[
                    registerStyles.selectOptionText,
                    formData.sexo === 'F' && registerStyles.selectOptionTextSelected
                  ]}>
                    Femenino
                  </Text>
                </TouchableOpacity>
              </View>
              {validationErrors.sexo ? (
                <Text style={registerStyles.errorTextSmall}>{validationErrors.sexo}</Text>
              ) : null}
            </View>
            
            <TouchableOpacity 
              style={[
                registerStyles.registerButton, 
                (loading || !isFormValid) && registerStyles.registerButtonDisabled
              ]}
              onPress={handleRegister}
              disabled={loading || !isFormValid}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={registerStyles.registerButtonText}>
                  Guardar
                </Text>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[registerStyles.backButton, loading && registerStyles.backButtonDisabled]}
              onPress={() => navigation.goBack()}
              disabled={loading}
            >
              <Text style={registerStyles.backButtonText}>Volver al login</Text>
            </TouchableOpacity>

            {error && (
              <Text style={registerStyles.errorText}>Error: {error}</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;