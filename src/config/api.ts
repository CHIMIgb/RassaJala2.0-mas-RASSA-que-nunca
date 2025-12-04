// src/config/api.ts
import { API_BASE_URL, API_VERSION } from '@env';

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  VERSION: API_VERSION,
  BASE_API_URL: `${API_BASE_URL}/${API_VERSION}`,
};

// También puedes exportar endpoints específicos
export const API_ENDPOINTS = {

    // Endpoint para autenticar al usuario
    AUTH: '/auth',

    // Endpoint para añadir el token a la lista negra
    AUTH_REVOKE: '/auth/token/revoke',

    // Endpoint para registar un usuario
    REGISTER: '/users/register',

    // Endpoint para enviar código de activación
    SEND_ACTIVATION_CODE: (userId: string) => `/auth/send-activation-code/${userId}`,

    // Endpoint para validar el código y activar la cuenta
    VALIDATE_ACTIVATION_CODE: (userId: string) => `/auth/activate-account/${userId}`,

    // Endpoint para reenviar código de activación
    RESEND_ACTIVATION_CODE: (userId: string) => `/auth/resend-activation-code/${userId}`,

    // Endpoint para solicitar recuperación de contraseña
    REQUEST_PASSWORD_RECOVERY: '/users/solicitar-recuperacion',

    // Endpoint para restablecer la contraseña con el token
    RESET_PASSWORD_WITH_TOKEN: '/users/restablecer-password'
};