// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types/auth/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackHandler } from 'react-native';
import { createNavigationContainerRef } from '@react-navigation/native';
import { revokeTokenService } from '../services/auth/revokeTokenService';

export const navigationRef = createNavigationContainerRef();

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (userData: User, userToken: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  isAdmin: boolean; // ← propiedad para verificar si es admin
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // ← Estado para admin

  useEffect(() => {
    loadAuthData();
    
    const backAction = () => {
      const currentRoute = navigationRef.current?.getCurrentRoute();
      if (currentRoute && ['AdminPanel', 'ProfileAdmin'].includes(currentRoute.name)) {
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  const loadAuthData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      const storedToken = await AsyncStorage.getItem('token');

      if (storedUser && storedToken) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setToken(storedToken);
        
        // Verificar si es admin (id_rol === 1)
        setIsAdmin(userData.id_rol === 1);
      }
    } catch (error) {
      console.error('Error loading auth data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userData: User, userToken: string) => {
    try {
      setUser(userData);
      setToken(userToken);
      setIsAdmin(userData.id_rol === 1); // ← Actualizar estado de admin
      
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      await AsyncStorage.setItem('token', userToken);
    } catch (error) {
      console.error('Error saving auth data:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {

      // Intentar revocar el token en el servidor
      if (token) {
        await revokeTokenService.revokeToken(token);
      }

      // Limpiar el estado local y AsyncStorage
      setUser(null);
      setToken(null);
      setIsAdmin(false); // ← Resetear estado de admin
      
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.error('Error clearing auth data:', error);

      // Limpiar los datos locales incluso si hay error
      setUser(null);
      setToken(null);
      setIsAdmin(false);
      await AsyncStorage.multiRemove(['user', 'token']);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};