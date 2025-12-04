// src/types/auth/activation.ts

// Respuesta exitosa de la activación de cuenta
export interface ActivateAccountSuccessResponse {
  status: string;
  body: {
    data: {
      message: string;
    };
  };
}

// Respuesta de error de la activación de cuenta
export interface ActivateAccountErrorResponse {
  status: string;
  body: {
    data: {
      message: string;
      error?: string;
    };
  };
}

// Type guards
export function isActivateAccountSuccessResponse(response: any): response is ActivateAccountSuccessResponse {
  return response.status === '200 OK' && 
         response.body?.data?.message !== undefined;
}

export function isActivateAccountErrorResponse(response: any): response is ActivateAccountErrorResponse {
  return (response.status && (response.status.includes('40') || response.status.includes('50'))) && 
         response.body?.data?.message !== undefined;
}

// Tipo unión para la respuesta
export type ActivateAccountResponse = ActivateAccountSuccessResponse | ActivateAccountErrorResponse;

// Datos para enviar la solicitud de activación de cuenta
export interface ActivateAccountRequest {
  codigo_activacion: string;
}