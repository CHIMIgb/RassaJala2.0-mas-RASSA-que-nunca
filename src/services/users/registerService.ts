// src/services/registerService.ts
import { RegisterData, RegisterResponse, isRegisterErrorResponse } from "../../types/users/register";
import { SendActivationCodeResponse,  isSendActivationCodeSuccessResponse, 
  isSendActivationCodeErrorResponse } from "../../types/auth/sendActivationCode";
  import { ActivateAccountResponse, isActivateAccountSuccessResponse, 
  isActivateAccountErrorResponse, ActivateAccountRequest } from "../../types/auth/activation";
  import { ResendActivationCodeSuccessResponse, ResendActivationCodeErrorResponse, ResendActivationCodeResponse, isResendActivationCodeErrorResponse } from "../../types/auth/reSendActivationCode";
import { API_CONFIG, API_ENDPOINTS } from "../../config/api";

export const registerService = {
  async register(userData: RegisterData): Promise<RegisterResponse> {
    try {
      console.log('🚀 [registerService] Enviando datos de registro:', JSON.stringify(userData, null, 2));
      
      const url = `${API_CONFIG.BASE_API_URL}${API_ENDPOINTS.REGISTER}`;
      console.log('📡 [registerService] URL:', url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log('📨 [registerService] Response status:', response.status);
      console.log('📨 [registerService] Response ok:', response.ok);

      const textResponse = await response.text();
      console.log('📨 [registerService] Response text:', textResponse);

      let data: RegisterResponse;
      try {
        data = JSON.parse(textResponse);
        console.log('📨 [registerService] Response JSON:', JSON.stringify(data, null, 2));
      } catch (parseError) {
        console.error('❌ [registerService] Error parsing JSON:', parseError);
        throw new Error(`Invalid JSON response: ${textResponse}`);
      }

      if (!response.ok) {
        console.log('❌ [registerService] Response not OK');
        if (isRegisterErrorResponse(data)) {
          console.log('❌ [registerService] Error response detected');
          throw new Error(data.body.data.message);
        } else {
          throw new Error(`Error en el registro: ${response.status} - ${response.statusText}`);
        }
      }

      console.log('✅ [registerService] Registro exitoso');
      return data;
    } catch (error) {
      console.error('❌ [registerService] Error en register:', error);
      if (error instanceof Error) {
        console.error('❌ [registerService] Error message:', error.message);
        console.error('❌ [registerService] Error stack:', error.stack);
      }
      throw error;
    }
  },

  // Servicio para enviar código de activación
  async sendActivationCode(userId: string): Promise<SendActivationCodeResponse> {
    try {
      console.log('🚀 [registerService] Enviando solicitud de código de activación para usuario:', userId);
      
      // ✅ Usar la ruta desde API_ENDPOINTS
      const url = `${API_CONFIG.BASE_API_URL}${API_ENDPOINTS.SEND_ACTIVATION_CODE(userId)}`;
      console.log('📡 [registerService] URL:', url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('📨 [registerService] Response status:', response.status);
      console.log('📨 [registerService] Response ok:', response.ok);

      const textResponse = await response.text();
      console.log('📨 [registerService] Response text:', textResponse);

      let data: SendActivationCodeResponse;
      try {
        data = JSON.parse(textResponse);
        console.log('📨 [registerService] Response JSON:', JSON.stringify(data, null, 2));
      } catch (parseError) {
        console.error('❌ [registerService] Error parsing JSON:', parseError);
        throw new Error(`Invalid JSON response: ${textResponse}`);
      }

      if (!response.ok) {
        console.log('❌ [registerService] Response not OK');
        if (isSendActivationCodeErrorResponse(data)) {
          console.log('❌ [registerService] Error response detected');
          throw new Error(data.body.data.message);
        } else {
          throw new Error(`Error al enviar código: ${response.status} - ${response.statusText}`);
        }
      }

      console.log('✅ [registerService] Código de activación enviado exitosamente');
      return data;
    } catch (error) {
      console.error('❌ [registerService] Error en sendActivationCode:', error);
      if (error instanceof Error) {
        console.error('❌ [registerService] Error message:', error.message);
        console.error('❌ [registerService] Error stack:', error.stack);
      }
      throw error;
    }
  },

  // Servicio para validar el codigo de activación
  async activateAccount(userId: string, activationData: ActivateAccountRequest): Promise<ActivateAccountResponse> {
    try {
      console.log('🚀 [registerService] Activando cuenta para usuario:', userId);
      console.log('🔢 [registerService] Código de activación:', activationData.codigo_activacion);
      
      const url = `${API_CONFIG.BASE_API_URL}${API_ENDPOINTS.VALIDATE_ACTIVATION_CODE(userId)}`;
      console.log('📡 [registerService] URL:', url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activationData),
      });

      console.log('📨 [registerService] Response status:', response.status);
      console.log('📨 [registerService] Response ok:', response.ok);

      const textResponse = await response.text();
      console.log('📨 [registerService] Response text:', textResponse);

      let data: ActivateAccountResponse;
      try {
        data = JSON.parse(textResponse);
        console.log('📨 [registerService] Response JSON:', JSON.stringify(data, null, 2));
      } catch (parseError) {
        console.error('❌ [registerService] Error parsing JSON:', parseError);
        throw new Error(`Invalid JSON response: ${textResponse}`);
      }

      if (!response.ok) {
        console.log('❌ [registerService] Response not OK');
        if (isActivateAccountErrorResponse(data)) {
          console.log('❌ [registerService] Error response detected');
          throw new Error(data.body.data.message);
        } else {
          throw new Error(`Error al activar cuenta: ${response.status} - ${response.statusText}`);
        }
      }

      console.log('✅ [registerService] Cuenta activada exitosamente');
      return data;
    } catch (error) {
      console.error('❌ [registerService] Error en activateAccount:', error);
      if (error instanceof Error) {
        console.error('❌ [registerService] Error message:', error.message);
        console.error('❌ [registerService] Error stack:', error.stack);
      }
      throw error;
    }
  },

  // Servicio para reenviar código de activación
  async resendActivationCode(userId: string): Promise<ResendActivationCodeResponse> {
    try {
      console.log('🔄 [registerService] Reenviando código de activación para usuario:', userId);
      
      const url = `${API_CONFIG.BASE_API_URL}${API_ENDPOINTS.RESEND_ACTIVATION_CODE(userId)}`;
      console.log('📡 [registerService] URL:', url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('📨 [registerService] Response status:', response.status);
      console.log('📨 [registerService] Response ok:', response.ok);

      const textResponse = await response.text();
      console.log('📨 [registerService] Response text:', textResponse);

      let data: ResendActivationCodeResponse;
      try {
        data = JSON.parse(textResponse);
        console.log('📨 [registerService] Response JSON:', JSON.stringify(data, null, 2));
      } catch (parseError) {
        console.error('❌ [registerService] Error parsing JSON:', parseError);
        throw new Error(`Invalid JSON response: ${textResponse}`);
      }

      if (!response.ok) {
        console.log('❌ [registerService] Response not OK');
        if (isResendActivationCodeErrorResponse(data)) {
          console.log('❌ [registerService] Error response detected');
          throw new Error(data.body.data.message);
        } else {
          throw new Error(`Error al reenviar código: ${response.status} - ${response.statusText}`);
        }
      }

      console.log('✅ [registerService] Código de activación reenviado exitosamente');
      return data;
    } catch (error) {
      console.error('❌ [registerService] Error en resendActivationCode:', error);
      if (error instanceof Error) {
        console.error('❌ [registerService] Error message:', error.message);
        console.error('❌ [registerService] Error stack:', error.stack);
      }
      throw error;
    }
  },

};