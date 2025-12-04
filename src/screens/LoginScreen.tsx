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
  Alert,
  Image,
  ImageBackground
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { loginStyles } from '../styles/screens/LoginScreen.styles';
import { useAuthHook } from '../hooks/auth/useAuthHook';
import Icon from 'react-native-vector-icons/MaterialIcons';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login, loading, error, isAuthenticated } = useAuthHook();
  
  const [credentials, setCredentials] = useState({
    user: '',
    password: ''
  });
  
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
      {/* Imagen de fondo con transparencia */}
      <ImageBackground
        source={require('../../assets/imagenes/Rassa-Jala.png')} 
        style={loginStyles.backgroundImage}
        resizeMode="cover"
      />
      
      {/* Capa verde semi-transparente sobre la imagen */}
      <View style={loginStyles.overlay} />

      <ScrollView contentContainerStyle={loginStyles.scrollContainer}>
        {/* Logo y nombre de la app en la parte superior */}
        <View style={loginStyles.logoContainer}>
          <Image 
            source={require('../../assets/imagenes/Rassa-Jala.png')} 
            style={loginStyles.logo}
            resizeMode="contain"
          />
          <Text style={loginStyles.appName}>RassaJala</Text>
        </View>

        <View style={loginStyles.innerContainer}>
          <View style={loginStyles.form}>
            <Text style={loginStyles.inputLabel}>Ingresa tu usuario</Text>
            <TextInput
              style={loginStyles.input}
              placeholder="Ejemplo: Marco"
              placeholderTextColor="#A5D6A7"
              autoCapitalize="none"
              value={credentials.user}
              onChangeText={(value) => handleInputChange('user', value)}
              editable={!loading}
            />
            
            <Text style={loginStyles.inputLabel}>Ingresa tu contraseña</Text>
            <View style={loginStyles.passwordContainer}>
              <TextInput
                style={loginStyles.passwordInput}
                placeholder="Ejemplo: Marco123"
                placeholderTextColor="#A5D6A7"
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
                  color="#5D7A2E" 
                />
              </TouchableOpacity>
            </View>
            
            {error && (
              <Text style={loginStyles.errorText}>
                {error}
              </Text>
            )}
            
            <TouchableOpacity 
              style={loginStyles.forgotPasswordButton}
              onPress={handleForgotPassword}
              disabled={loading}
            >
              <Text style={loginStyles.forgotPasswordText}>
                ¿Olvido su contraseña?
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                loginStyles.loginButton,
                loading && loginStyles.loginButtonDisabled
              ]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={loginStyles.loginButtonText}>
                {loading ? 'Cargando...' : 'Entrar'}
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
                ¿No tienes una cuenta? <Text style={loginStyles.createAccountLink}>Regístrate aquí</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;