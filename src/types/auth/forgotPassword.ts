/**
 * Tipos para la solicitud de recuperación de contraseña
 */

// Interface para el body de la petición
export interface ForgotPasswordRequest {
  correo: string;
}

// Respuesta exitosa
export interface ForgotPasswordSuccessResponse {
  status: '200 OK';
  body: {
    data: {
      message: string;
    };
  };
}

// Respuesta de error (400, 500, etc.)
export interface ForgotPasswordErrorResponse {
  status: string;
  body: {
    data: {
      message: string;
      error?: string;
    };
  };
}

// Tipo unión para la respuesta
export type ForgotPasswordResponse = ForgotPasswordSuccessResponse | ForgotPasswordErrorResponse;


// Type Guards para verificar el tipo de respuesta
export function isForgotPasswordSuccessResponse(response: any): response is ForgotPasswordSuccessResponse {
  return response.status === '200 OK' && 
         response.body?.data?.message !== undefined;
}

export function isForgotPasswordErrorResponse(response: any): response is ForgotPasswordErrorResponse {
  return (response.status && (response.status.includes('40') || response.status.includes('50'))) && 
         response.body?.data?.message !== undefined;
}