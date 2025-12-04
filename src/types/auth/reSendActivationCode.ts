// Respuesta exitosa del reenvío de código de activación
export interface ResendActivationCodeSuccessResponse {
  status: string;
  body: {
    data: {
      message: string;
      correo: string;
    };
  };
}

// Respuesta de error del reenvío de código de activación
export interface ResendActivationCodeErrorResponse {
  status: string;
  body: {
    data: {
      message: string;
      error?: string;
      error_type?: string;
    };
  };
}

// Type guards
export function isResendActivationCodeSuccessResponse(response: any): response is ResendActivationCodeSuccessResponse {
  return response.status === '200 OK' && 
         response.body?.data?.message !== undefined &&
         response.body?.data?.correo !== undefined;
}

export function isResendActivationCodeErrorResponse(response: any): response is ResendActivationCodeErrorResponse {
  return (response.status && (response.status.includes('40') || response.status.includes('50'))) && 
         response.body?.data?.message !== undefined;
}

// Tipo unión para la respuesta
export type ResendActivationCodeResponse = ResendActivationCodeSuccessResponse | ResendActivationCodeErrorResponse;