// src/types/auth.ts
export interface LoginCredentials {
  user: string;
  password: string;
}

// Respuesta exitosa
export interface AuthSuccessResponse {
  status: string;
  body: {
    data: {
      token: string;
      user: {
        id_rol: number;
        id_usuario: number;
        nombre_rol: string;
        nombre_usuario: string;
      };
    };
  };
}

// Respuesta de error
export interface AuthErrorResponse {
  status: string;
  body: {
    data: {
      message: string;
    };
  };
}

// Type guards
export function isAuthSuccessResponse(response: any): response is AuthSuccessResponse {
  return response.status === '200 OK' && 
         response.body?.data?.token !== undefined  &&
         response.body?.data?.user !== undefined;
}

export function isAuthErrorResponse(response: any): response is AuthErrorResponse {
  return (response.status === '401 Unauthorized' || response.status.includes('40')) && 
         response.body?.data?.message !== undefined;
}

// Tipo unión para la respuesta
export type AuthResponse = AuthSuccessResponse | AuthErrorResponse;

export interface User {
  id_rol: number;
  id_usuario: number;
  nombre_rol: string;
  nombre_usuario: string;
}