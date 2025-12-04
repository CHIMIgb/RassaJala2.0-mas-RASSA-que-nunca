import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// Importa los componentes de carga
import { View, ActivityIndicator, Text } from 'react-native'; 
import { RootStackParamList } from './src/types/navigation';
// Importa AuthProvider Y useAuth
import { AuthProvider, useAuth } from './src/contexts/AuthContext'; 

// Importa TODAS tus pantallas
import HomeScreen from './src/screens/HomeScreen';
import Navbar from './src/components/common/Navbar';
import LoginScreen from './src/screens/LoginScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import CartScreen from './src/screens/CartScreen';
import AdminPanelScreen from './src/screens/admin/AdminPanelScreen';
import AdminNavbar from './src/components/common/AdminNavbar';
import ProfileScreen from './src/screens/ProfileScreen';
import ProfileAdminScreen from './src/screens/admin/ProfileAdminScreen';
import ActiveCodeScreen from './src/screens/ActiveCodeScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen'; // Asegúrate de importar esta

const Stack = createNativeStackNavigator<RootStackParamList>();

// --- Configuración del Deep Link (la tenías correcta) ---
const linking = {
  prefixes: [
    'mirugo://', 
    'http://app.rassajala.com', 
    'http://192.168.0.104:8081' // El prefijo de tu link de prueba
  ],
  config: {
    screens: {
      ResetPassword: {
        path: 'reset-password', // La ruta en el link
        parse: { token: (token: string) => `${token}` }, // Captura el token
      },
    },
  },
};

// --- NUEVO COMPONENTE INTERNO ---
// Este componente reemplaza la lógica de AuthRedirect
const RootNavigator = () => {
  // Llama a useAuth aquí
  const { user, token, isAdmin, isLoading } = useAuth();

  // 1. MIENTRAS 'isLoading' ES TRUE...
  // Mostramos un spinner global. Esto "retrasa la ejecución"
  // y le da tiempo al NavigationContainer de procesar el deep link.
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // 2. UNA VEZ QUE 'isLoading' ES FALSE...
  // Renderizamos el stack. Si un deep link fue procesado,
  // NavigationContainer automáticamente mostrará ResetPassword.
  // Si no, mostrará el 'initialRouteName' que definamos.
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        header: () => route.name === 'AdminPanel' || route.name === 'ProfileAdmin' ? <AdminNavbar /> : <Navbar />,
      })}
      // 3. La ruta inicial ahora se decide aquí
      initialRouteName={user && token ? (isAdmin ? 'AdminPanel' : 'Home') : 'Home'}
    >
      {/* AQUÍ DEBEN ESTAR *TODAS* TUS PANTALLAS
      */}
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
      />
      <Stack.Screen 
        name="ForgotPassword" 
        component={ForgotPasswordScreen} 
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen} 
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen} 
      />
      <Stack.Screen 
        name="Cart" 
        component={CartScreen} 
        options={{ title: 'Carrito de Compras' }}
      />
      <Stack.Screen 
        name="AdminPanel" 
        component={AdminPanelScreen}
        options={{ title: 'Panel de Administración' }}
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Mi Perfil' }}
      />
      <Stack.Screen 
        name="ProfileAdmin" 
        component={ProfileAdminScreen}
        options={{ title: 'Panel de Administrador' }}
      />
      <Stack.Screen 
        name="ActiveCodeScreen" 
        component={ActiveCodeScreen}
        options={{ title: 'Activar Cuenta' }}
      />
      <Stack.Screen 
        name="ResetPassword" 
        component={ResetPasswordScreen}
        options={{ title: 'Restablecer Contraseña', headerShown: false }}
      />
      
      {/* NO INCLUYAS 'AuthRedirect' aquí. Ya no es necesario.
      */}
    </Stack.Navigator>
  );
}


// --- TU COMPONENTE APP.TSX PRINCIPAL ---
const App = () => {
  return (
    // AuthProvider debe envolver todo
    <AuthProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000000ff' }} edges={['bottom']}>
          <NavigationContainer
            linking={linking} // Pasa la configuración del deep link
            fallback={<Text>Cargando...</Text>} // Muestra esto mientras el deep link se procesa
          >
            {/* Renderiza el RootNavigator, que ahora contiene 
              la lógica de carga y autenticación.
            */}
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </AuthProvider>
  );
};

export default App;