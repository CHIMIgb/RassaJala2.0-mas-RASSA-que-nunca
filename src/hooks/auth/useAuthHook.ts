// src/hooks/useAuthHook.ts
import { useState } from 'react';
import { LoginCredentials, isAuthSuccessResponse } from '../../types/auth/auth';
import { authService } from '../../services/auth/authService';
import { useAuth as useAuthContext } from '../../contexts/AuthContext';

export const useAuthHook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { login: contextLogin } = useAuthContext();

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);
    setIsAuthenticated(false);

    try {
      const response = await authService.login(credentials);
      
      // Usar el type guard para verificar el tipo de respuesta
      if (isAuthSuccessResponse(response)) {
        const { token, user } = response.body.data;
        
        // Guardar en el contexto (y AsyncStorage)
        await contextLogin(user, token);

        setIsAuthenticated(true);
        
        return { 
          success: true, 
          user, 
          token,
          message: 'Login exitoso'
        };
      } else {
        // Si no es una respuesta exitosa, es un error
        throw new Error(response.body?.data?.message || 'Error en la autenticación');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, isAuthenticated  };
};