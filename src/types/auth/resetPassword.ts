/**
 * Tipos para RESTABLECER la contraseña
 */

// Interface para el body de la petición
export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmar_password: string;
}

// Respuesta exitosa
export interface ResetPasswordSuccessResponse {
  status: '200 OK';
  body: {
    data: {
      message: string;
    };
  };
}

// Respuesta de error (400, 500, etc.)
export interface ResetPasswordErrorResponse {
  status: string;
  body: {
    data: {
      message: string;
      error?: string;
    };
  };
}

// Tipo unión para la respuesta
export type ResetPasswordResponse = ResetPasswordSuccessResponse | ResetPasswordErrorResponse;


// Type Guards para verificar el tipo de respuesta
export function isResetPasswordSuccessResponse(response: any): response is ResetPasswordSuccessResponse {
  return response.status === '200 OK' && 
         response.body?.data?.message !== undefined;
}

export function isResetPasswordErrorResponse(response: any): response is ResetPasswordErrorResponse {
  return (response.status && (response.status.includes('40') || response.status.includes('50'))) && 
         response.body?.data?.message !== undefined;
}