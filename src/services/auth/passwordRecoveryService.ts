import { API_CONFIG, API_ENDPOINTS } from "../../config/api";
import { 
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  isForgotPasswordErrorResponse
} from "../../types/auth/forgotPassword";
import { 
  ResetPasswordRequest,
  ResetPasswordResponse,
  isResetPasswordErrorResponse
} from "../../types/auth/resetPassword";

export const passwordRecoveryService = {
  
  /**
   * Llama al endpoint para solicitar la recuperación de contraseña
   */
  async requestRecovery(emailData: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    try {
      console.log('🚀 [passwordRecoveryService] Solicitando recuperación para:', JSON.stringify(emailData));
      
      const url = `${API_CONFIG.BASE_API_URL}${API_ENDPOINTS.REQUEST_PASSWORD_RECOVERY}`;
      console.log('📡 [passwordRecoveryService] URL:', url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      console.log('📨 [passwordRecoveryService] Response status:', response.status);

      const textResponse = await response.text();
      let data: ForgotPasswordResponse;

      try {
        data = JSON.parse(textResponse);
        console.log('📨 [passwordRecoveryService] Response JSON:', JSON.stringify(data, null, 2));
      } catch (parseError) {
        console.error('❌ [passwordRecoveryService] Error parsing JSON:', parseError);
        throw new Error(`Invalid JSON response: ${textResponse}`);
      }

      if (!response.ok) {
        console.log('❌ [passwordRecoveryService] Response not OK');
        if (isForgotPasswordErrorResponse(data)) {
          throw new Error(data.body.data.message);
        } else {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
      }

      console.log('✅ [passwordRecoveryService] Solicitud exitosa');
      return data;

    } catch (error) {
      console.error('❌ [passwordRecoveryService] Error en requestRecovery:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error desconocido en el servicio de recuperación');
    }
  },

  /**
   * Llama al endpoint para RESTABLECER la contraseña
   */
  async resetPassword(data: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    try {
      console.log('🚀 [passwordRecoveryService] Restableciendo contraseña...');
      
      const url = `${API_CONFIG.BASE_API_URL}${API_ENDPOINTS.RESET_PASSWORD_WITH_TOKEN}`;
      console.log('📡 [passwordRecoveryService] URL:', url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('📨 [passwordRecoveryService] Response status:', response.status);

      const textResponse = await response.text();
      let responseData: ResetPasswordResponse;

      try {
        responseData = JSON.parse(textResponse);
        console.log('📨 [passwordRecoveryService] Response JSON:', JSON.stringify(responseData, null, 2));
      } catch (parseError) {
        console.error('❌ [passwordRecoveryService] Error parsing JSON:', parseError);
        throw new Error(`Invalid JSON response: ${textResponse}`);
      }

      if (!response.ok) {
        console.log('❌ [passwordRecoveryService] Response not OK');
        if (isResetPasswordErrorResponse(responseData)) {
          throw new Error(responseData.body.data.message);
        } else {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
      }

      console.log('✅ [passwordRecoveryService] Contraseña restablecida');
      return responseData;

    } catch (error) {
      console.error('❌ [passwordRecoveryService] Error en resetPassword:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error desconocido al restablecer la contraseña');
    }
  },

};