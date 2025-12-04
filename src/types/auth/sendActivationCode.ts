// src/types/auth/activation.ts

// Respuesta exitosa del envío de código de activación
export interface SendActivationCodeSuccessResponse {
  status: string;
  body: {
    data: {
      message: string;
      correo?: string;
    };
  };
}

// Respuesta de error del envío de código de activación
export interface SendActivationCodeErrorResponse {
  status: string;
  body: {
    data: {
      message: string;
      error?: string;
    };
  };
}

// Type guards
export function isSendActivationCodeSuccessResponse(response: any): response is SendActivationCodeSuccessResponse {
  return response.status === '200 OK' && 
         response.body?.data?.message !== undefined;
}

export function isSendActivationCodeErrorResponse(response: any): response is SendActivationCodeErrorResponse {
  return (response.status && (response.status.includes('40') || response.status.includes('50'))) && 
         response.body?.data?.message !== undefined;
}

// Tipo unión para la respuesta
export type SendActivationCodeResponse = SendActivationCodeSuccessResponse | SendActivationCodeErrorResponse;

// Datos para enviar la solicitud de código de activación
export interface SendActivationCodeRequest {
  id_usuario: string;
}