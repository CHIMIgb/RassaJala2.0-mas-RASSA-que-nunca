// src/types/auth/register.ts
export interface RegisterData {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  correo: string;
  sexo: string;
  nombre_usuario: string;
  password: string;
  id_rol: number;
}

// Respuesta exitosa del registro
export interface RegisterSuccessResponse {
  status: string;
  body: {
    data: {
      message: string;
      id_usuario: string;
    };
  };
}

// Respuesta de error del registro
export interface RegisterErrorResponse {
  status: string;
  body: {
    data: {
      message: string;
      error?: string;
    };
  };
}

// Type guards
export function isRegisterSuccessResponse(response: any): response is RegisterSuccessResponse {
  return response.status === '200 OK' && 
         response.body?.data?.message !== undefined;
}

export function isRegisterErrorResponse(response: any): response is RegisterErrorResponse {
  return (response.status && (response.status.includes('40') || response.status.includes('50'))) && 
         response.body?.data?.message !== undefined;
}

// Tipo unión para la respuesta
export type RegisterResponse = RegisterSuccessResponse | RegisterErrorResponse;