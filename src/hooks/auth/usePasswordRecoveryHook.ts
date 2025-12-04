import { useState } from 'react';
import { passwordRecoveryService } from '../../services/auth/passwordRecoveryService';
import { 
  ForgotPasswordRequest, 
  isForgotPasswordSuccessResponse
} from '../../types/auth/forgotPassword';
import { 
  ResetPasswordRequest, 
  isResetPasswordSuccessResponse 
} from '../../types/auth/resetPassword';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_STORAGE_KEY = 'reset_password_token';

export const usePasswordRecoveryHook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);
  const [resetSuccessMessage, setResetSuccessMessage] = useState<string | null>(null);

  /**
   * Función expuesta para ser llamada desde la pantalla
   */
  const requestRecovery = async (email: string) => {
    console.log('🔑 [usePasswordRecoveryHook] Iniciando solicitud para:', email);
    
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const emailData: ForgotPasswordRequest = { correo: email };
      const response = await passwordRecoveryService.requestRecovery(emailData);

      if (isForgotPasswordSuccessResponse(response)) {
        console.log('✅ [usePasswordRecoveryHook] Éxito:', response.body.data.message);
        setSuccessMessage(response.body.data.message);
        return { success: true, message: response.body.data.message };
      } else {
        // El servicio ya lanza un error si la respuesta no es OK
        // Esta parte es por si acaso, aunque no debería llegar aquí.
        const errorMessage = response.body?.data?.message || 'Error desconocido';
        throw new Error(errorMessage);
      }
    } catch (err) {
      console.error('❌ [usePasswordRecoveryHook] Error capturado:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error al solicitar recuperación';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      console.log('🏁 [usePasswordRecoveryHook] Finalizando solicitud.');
      setLoading(false);
    }
  };

  /**
   * Función para RESTABLECER la contraseña
   */
  const resetPassword = async (data: Omit<ResetPasswordRequest, 'token'>, token: string) => {
    console.log('🔑 [usePasswordRecoveryHook] Iniciando restablecimiento de contraseña...');
    
    setResetLoading(true);
    setResetError(null);
    setResetSuccessMessage(null);

    try {
      const fullData: ResetPasswordRequest = {
        ...data,
        token: token,
      };

      const response = await passwordRecoveryService.resetPassword(fullData);

      if (isResetPasswordSuccessResponse(response)) {
        console.log('✅ [usePasswordRecoveryHook] Éxito:', response.body.data.message);
        setResetSuccessMessage(response.body.data.message);
        await removeStoredResetToken(); // Limpiar token al éxito
        return { success: true, message: response.body.data.message };
      } else {
        const errorMessage = response.body?.data?.message || 'Error desconocido';
        throw new Error(errorMessage);
      }
    } catch (err) {
      console.error('❌ [usePasswordRecoveryHook] Error capturado:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error al restablecer';
      setResetError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      console.log('🏁 [usePasswordRecoveryHook] Finalizando restablecimiento.');
      setResetLoading(false);
    }
  };

  /**
   * Guarda el token en AsyncStorage
   */
  const storeResetToken = async (token: string) => {
    try {
      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
      console.log('🔑 [usePasswordRecoveryHook] Token guardado en AsyncStorage.');
    } catch (e) {
      console.error('❌ [usePasswordRecoveryHook] Error guardando token en AsyncStorage', e);
    }
  };

  /**
   * Obtiene el token de AsyncStorage
   */
  const getStoredResetToken = async (): Promise<string | null> => {
    try {
      const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
      console.log('🔑 [usePasswordRecoveryHook] Token obtenido de AsyncStorage:', token);
      return token;
    } catch (e) {
      console.error('❌ [usePasswordRecoveryHook] Error obteniendo token de AsyncStorage', e);
      return null;
    }
  };

  /**
   * Elimina el token de AsyncStorage
   */
  const removeStoredResetToken = async () => {
    try {
      await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
      console.log('🔑 [usePasswordRecoveryHook] Token eliminado de AsyncStorage.');
    } catch (e) {
      console.error('❌ [usePasswordRecoveryHook] Error eliminando token de AsyncStorage', e);
    }
  };

  return {
    requestRecovery,
    loading,
    error,
    successMessage,
    resetPassword,
    resetLoading,
    resetError,
    resetSuccessMessage,
    storeResetToken,
    getStoredResetToken,
    removeStoredResetToken,
  };
};