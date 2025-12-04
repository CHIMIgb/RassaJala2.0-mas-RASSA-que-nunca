// src/hooks/useRegisterHook.ts
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  RegisterData, 
  isRegisterSuccessResponse, 
  RegisterResponse,
  RegisterErrorResponse 
} from '../../types/users/register';
import { registerService } from '../../services/users/registerService';
import { 
  SendActivationCodeResponse,
  isSendActivationCodeSuccessResponse,
  isSendActivationCodeErrorResponse
} from '../../types/auth/sendActivationCode';
import { 
  ActivateAccountResponse,
  isActivateAccountSuccessResponse,
  isActivateAccountErrorResponse,
  ActivateAccountRequest,
  ActivateAccountErrorResponse
} from '../../types/auth/activation';
import { ResendActivationCodeResponse,
  isResendActivationCodeSuccessResponse,
  isResendActivationCodeErrorResponse
} from '../../types/auth/reSendActivationCode';
import { useAuthHook } from '../auth/useAuthHook';
import { LoginCredentials } from '../../types/auth/auth';

export const useRegisterHook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [sendActivationLoading, setSendActivationLoading] = useState(false); // ← Cambiado el nombre
  const [sendActivationError, setSendActivationError] = useState<string | null>(null); 
  const [activateAccountLoading, setActivateAccountLoading] = useState(false);
  const [activateAccountError, setActivateAccountError] = useState<string | null>(null);
  const [resendActivationLoading, setResendActivationLoading] = useState(false);
  const [resendActivationError, setResendActivationError] = useState<string | null>(null);

  // Agregar hook de autenticación
  const { login: authLogin } = useAuthHook();

  // Función para guardar el ID de usuario en AsyncStorage
  const storeUserId = async (userId: string) => {
    try {
      await AsyncStorage.setItem('user_id', userId);
      console.log('✅ [useRegisterHook] ID de usuario guardado en AsyncStorage:', userId);
    } catch (storageError) {
      console.error('❌ [useRegisterHook] Error al guardar en AsyncStorage:', storageError);
    }
  };

  const register = async (userData: RegisterData) => {
    console.log('👤 [useRegisterHook] Iniciando registro...');
    console.log('👤 [useRegisterHook] Datos recibidos:', JSON.stringify(userData, null, 2));
    
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      console.log('📞 [useRegisterHook] Llamando a registerService...');
      const response: RegisterResponse = await registerService.register(userData);
      console.log('📞 [useRegisterHook] Respuesta del servicio:', JSON.stringify(response, null, 2));
      
      if (isRegisterSuccessResponse(response)) {
        console.log('✅ [useRegisterHook] Registro exitoso');

        // Guardar el ID de usuario en AsyncStorage
        const userId = response.body.data.id_usuario.toString();
        if (userId) {
          await storeUserId(userId);

          // También guardar las credenciales para el login automático posterior
          await AsyncStorage.setItem('user_credentials', JSON.stringify({
            user: userData.nombre_usuario,
            password: userData.password
          }));

          console.log('🔐 [useRegisterHook] Credenciales guardadas para login automático');

        } else {
          console.warn('⚠️ [useRegisterHook] No se recibió id_usuario en la respuesta');
        }

        setSuccess(true);
        return { 
          success: true, 
          message: response.body.data.message,
          userId: userId // ← Devolver el userId
        };
      } else {
        console.log('❌ [useRegisterHook] Error en la respuesta');
        
        const errorResponse = response as RegisterErrorResponse;
        const errorMessage = errorResponse.body?.data?.message || 'Error en el registro';
        
        console.log('❌ [useRegisterHook] Mensaje de error:', errorMessage);
        throw new Error(errorMessage);
      }
    } catch (err) {
      console.error('❌ [useRegisterHook] Error capturado:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      console.log('❌ [useRegisterHook] Estableciendo error:', errorMessage);
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      console.log('🏁 [useRegisterHook] Finalizando registro, loading: false');
      setLoading(false);
    }
  };

  // Función para obtener credenciales almacenadas
  const getStoredCredentials = async (): Promise<LoginCredentials | null> => {
    try {
      const credentialsJson = await AsyncStorage.getItem('user_credentials');
      if (credentialsJson) {
        const credentials = JSON.parse(credentialsJson);
        console.log('🔐 [useRegisterHook] Credenciales obtenidas de AsyncStorage');
        return credentials;
      }
      return null;
    } catch (error) {
      console.error('❌ [useRegisterHook] Error al obtener credenciales:', error);
      return null;
    }
  };

  // Función para limpiar credenciales
  const removeStoredCredentials = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('user_credentials');
      console.log('✅ [useRegisterHook] Credenciales eliminadas de AsyncStorage');
    } catch (error) {
      console.error('❌ [useRegisterHook] Error al eliminar credenciales:', error);
    }
  };

    // Función para enviar código de activación
  const sendActivationCode = async (userId: string) => {
    console.log('📧 [useRegisterHook] Enviando código de activación para usuario:', userId);
    
    setSendActivationLoading(true); // ← Usando el nombre correcto
    setSendActivationError(null); // ← Usando el nombre correcto

    try {
      const response: SendActivationCodeResponse = await registerService.sendActivationCode(userId);
      console.log('📧 [useRegisterHook] Respuesta del servicio:', JSON.stringify(response, null, 2));
      
      if (isSendActivationCodeSuccessResponse(response)) { // ← Usando el nombre correcto
        console.log('✅ [useRegisterHook] Código de activación enviado exitosamente');
        return { 
          success: true, 
          message: response.body.data.message,
          correo: response.body.data.correo
        };
      } else {
        console.log('❌ [useRegisterHook] Error en la respuesta');
        const errorMessage = response.body?.data?.message || 'Error al enviar código de activación';
        throw new Error(errorMessage);
      }
    } catch (err) {
      console.error('❌ [useRegisterHook] Error al enviar código:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setSendActivationError(errorMessage); // ← Usando el nombre correcto
      return { success: false, message: errorMessage };
    } finally {
      setSendActivationLoading(false); // ← Usando el nombre correcto
    }
  };

  // Función para activar la cuenta
    const activateAccount = async (userId: string, activationCode: string, userCredentials?: LoginCredentials) => {
    console.log('🔐 [useRegisterHook] Activando cuenta para usuario:', userId);
    console.log('🔐 [useRegisterHook] Código de activación:', activationCode);
    
    setActivateAccountLoading(true);
    setActivateAccountError(null);

    try {
      const activationData: ActivateAccountRequest = {
        codigo_activacion: activationCode
      };

      const response: ActivateAccountResponse = await registerService.activateAccount(userId, activationData);
      console.log('🔐 [useRegisterHook] Respuesta del servicio:', JSON.stringify(response, null, 2));
      
      if (isActivateAccountSuccessResponse(response)) {
        console.log('✅ [useRegisterHook] Cuenta activada exitosamente');
        
        // Si tenemos las credenciales, hacer login automático
        if (userCredentials) {
          console.log('🔐 [useRegisterHook] Realizando login automático...');
          const loginResult = await authLogin(userCredentials);
          
          if (loginResult.success) {
            console.log('✅ [useRegisterHook] Login automático exitoso');
            // Limpiar el ID de usuario almacenado después de activación exitosa
            await removeStoredUserId();
            
            return { 
              success: true, 
              message: response.body.data.message,
              autoLogin: true,
              user: loginResult.user,
              token: loginResult.token
            };
          } else {
            console.log('⚠️ [useRegisterHook] Cuenta activada pero login automático falló');
            // La cuenta se activó pero el login falló, igual es éxito
            await removeStoredUserId();
            
            return { 
              success: true, 
              message: `${response.body.data.message}. Por favor inicia sesión manualmente.`,
              autoLogin: false
            };
          }
        } else {
          // No hay credenciales, solo activar cuenta
          console.log('ℹ️ [useRegisterHook] Cuenta activada, sin credenciales para login automático');
          await removeStoredUserId();
          
          return { 
            success: true, 
            message: response.body.data.message,
            autoLogin: false
          };
        }
      } else {
        console.log('❌ [useRegisterHook] Error en la respuesta de activación');
        const errorResponse = response as ActivateAccountErrorResponse;
        const errorMessage = errorResponse.body?.data?.message || 'Error al activar la cuenta';
        throw new Error(errorMessage);
      }
    } catch (err) {
      console.error('❌ [useRegisterHook] Error al activar cuenta:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setActivateAccountError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setActivateAccountLoading(false);
    }
  };

  // Función para reenviar código de activación
  const resendActivationCode = async (userId: string) => {
    console.log('🔄 [useRegisterHook] Reenviando código de activación para usuario:', userId);
    
    setResendActivationLoading(true);
    setResendActivationError(null);

    try {
      const response: ResendActivationCodeResponse = await registerService.resendActivationCode(userId);
      console.log('🔄 [useRegisterHook] Respuesta del servicio:', JSON.stringify(response, null, 2));
      
      if (isResendActivationCodeSuccessResponse(response)) {
        console.log('✅ [useRegisterHook] Código de activación reenviado exitosamente');
        return { 
          success: true, 
          message: response.body.data.message,
          correo: response.body.data.correo
        };
      } else {
        console.log('❌ [useRegisterHook] Error en la respuesta de reenvío');
        const errorMessage = response.body?.data?.message || 'Error al reenviar código de activación';
        throw new Error(errorMessage);
      }
    } catch (err) {
      console.error('❌ [useRegisterHook] Error al reenviar código:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setResendActivationError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setResendActivationLoading(false);
    }
  };

  // Función para obtener el ID de usuario almacenado
  const getStoredUserId = async (): Promise<string | null> => {
    try {
      const userId = await AsyncStorage.getItem('user_id');
      console.log('📋 [useRegisterHook] ID obtenido de AsyncStorage:', userId);
      return userId;
    } catch (error) {
      console.error('❌ [useRegisterHook] Error al obtener ID de usuario:', error);
      return null;
    }
  };

  // Función para eliminar el ID de usuario almacenado (útil para logout)
  const removeStoredUserId = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('user_id');
      console.log('✅ [useRegisterHook] ID de usuario eliminado de AsyncStorage');
    } catch (error) {
      console.error('❌ [useRegisterHook] Error al eliminar ID de usuario:', error);
    }
  };

  // Función para verificar si existe un ID de usuario almacenado
  const hasStoredUserId = async (): Promise<boolean> => {
    try {
      const userId = await AsyncStorage.getItem('user_id');
      return userId !== null;
    } catch (error) {
      console.error('❌ [useRegisterHook] Error al verificar ID de usuario:', error);
      return false;
    }
  };

  return { 
    register, 
    loading, 
    error, 
    success,
    sendActivationCode,
    sendActivationLoading,
    sendActivationError,
    activateAccount,
    activateAccountLoading,
    activateAccountError,
    resendActivationCode,
    resendActivationLoading,
    resendActivationError,
    getStoredUserId,
    getStoredCredentials,
    removeStoredCredentials,
    removeStoredUserId,
    hasStoredUserId
  };
};