// src/services/authService.ts
import { LoginCredentials, AuthResponse, isAuthErrorResponse } from "../../types/auth/auth";
import { API_CONFIG, API_ENDPOINTS } from "../../config/api";

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const requestBody = {
        user: credentials.user,
        password: credentials.password
      };

      console.log('Enviando credenciales:', requestBody);

      const response = await fetch(`${API_CONFIG.BASE_API_URL}${API_ENDPOINTS.AUTH}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data: AuthResponse = await response.json();
      console.log('Respuesta del servidor:', data);

      if (!response.ok) {
        if (isAuthErrorResponse(data)) {
          throw new Error(data.body.data.message);
        } else {
          throw new Error(`Error en la autenticación: ${response.status}`);
        }
      }

      return data;
    } catch (error) {
      console.error('Error en authService.login:', error);
      throw error;
    }
  },
};