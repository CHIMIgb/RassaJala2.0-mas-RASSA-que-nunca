// src/screens/LoginScreen.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  Alert 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { loginStyles } from '../styles/screens/LoginScreen.styles';
import { useAuthHook } from '../hooks/auth/useAuthHook';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Asegúrate de tener instalado este paquete

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login, loading, error, isAuthenticated } = useAuthHook();
  
  const [credentials, setCredentials] = useState({
    user: '',
    password: ''
  });
  
  // --- NUEVO: Estado para mostrar/ocultar contraseña ---
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      // La redirección ahora se manejará basada en el id_rol
      // pero necesitamos acceder a los datos del usuario desde el contexto
      // Esto lo haremos de otra manera
    }
  }, [isAuthenticated, navigation]);

  const handleInputChange = (field: keyof typeof credentials, value: string) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // --- NUEVO: Función para alternar visibilidad de contraseña ---
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (!credentials.user || !credentials.password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    const result = await login(credentials);
    
    if (result.success && result.user) {
      // Login exitoso - Redirigir según el id_rol
      if (result.user.id_rol === 1) {
        // Administrador - ir al panel de administración
        navigation.navigate('AdminPanel');
      } else if (result.user.id_rol === 2) {
        // Usuario normal - mostrar mensaje y permanecer en login
        navigation.navigate('Home');
      } else {
        // Otros roles - ir al home
        navigation.navigate('Home');
      }
    } else {
      const errorMessage = error || 'Credenciales incorrectas';
      //Alert.alert('Error', errorMessage);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleCreateAccount = () => {
    navigation.navigate('Register');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={loginStyles.container}
    >
      <ScrollView contentContainerStyle={loginStyles.scrollContainer}>
        <View style={loginStyles.innerContainer}>
          <Text style={loginStyles.title}>Iniciar Sesión</Text>
          
          <View style={loginStyles.form}>
            <TextInput
              style={loginStyles.input}
              placeholder="Nombre de usuario"
              placeholderTextColor="#999"
              autoCapitalize="none"
              value={credentials.user}
              onChangeText={(value) => handleInputChange('user', value)}
              editable={!loading}
            />
            
            {/* --- MODIFICADO: Campo de contraseña con icono de ojo --- */}
            <View style={loginStyles.passwordContainer}>
              <TextInput
                style={loginStyles.passwordInput}
                placeholder="Contraseña"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                value={credentials.password}
                onChangeText={(value) => handleInputChange('password', value)}
                editable={!loading}
              />
              <TouchableOpacity 
                style={loginStyles.eyeIcon}
                onPress={toggleShowPassword}
                disabled={loading}
              >
                <Icon 
                  name={showPassword ? "visibility-off" : "visibility"} 
                  size={24} 
                  color="#999" 
                />
              </TouchableOpacity>
            </View>
            
            {error && (
              <Text style={loginStyles.errorText}>
                {error}
              </Text>
            )}
            
            <TouchableOpacity 
              style={[
                loginStyles.loginButton,
                loading && loginStyles.loginButtonDisabled
              ]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={loginStyles.loginButtonText}>
                {loading ? 'Cargando...' : 'Ingresar'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={loginStyles.forgotPasswordButton}
              onPress={handleForgotPassword}
              disabled={loading}
            >
              <Text style={loginStyles.forgotPasswordText}>
                ¿Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>
            
            <View style={loginStyles.separator}>
              <View style={loginStyles.separatorLine} />
              <Text style={loginStyles.separatorText}>o</Text>
              <View style={loginStyles.separatorLine} />
            </View>
            
            <TouchableOpacity 
              style={loginStyles.createAccountButton}
              onPress={handleCreateAccount}
              disabled={loading}
            >
              <Text style={loginStyles.createAccountText}>
                ¿No tienes una cuenta? <Text style={loginStyles.createAccountLink}>Crea una</Text>
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={loginStyles.backButton}
              onPress={() => navigation.goBack()}
              disabled={loading}
            >
              <Text style={loginStyles.backButtonText}>Volver al inicio</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;