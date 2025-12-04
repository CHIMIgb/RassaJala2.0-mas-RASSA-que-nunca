// src/services/auth/tokenService.ts
import { Platform } from 'react-native';
import { API_CONFIG, API_ENDPOINTS } from '../../config/api';

// services/auth/revokeTokenService.ts
export const revokeTokenService = {
  revokeToken: async (token: string) => {
    const url = `${API_CONFIG.BASE_API_URL}${API_ENDPOINTS.AUTH_REVOKE}`;
    
    console.log('=== REVOKE TOKEN DEBUG ===');
    console.log('URL:', url);
    console.log('Token completo:', token);
    console.log('Token length:', token.length);
    console.log('Sistema operativo: ',Platform.OS);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status);
      console.log('Response status text:', response.statusText);
      
      const responseText = await response.text();
      console.log('Raw response:', responseText);
      
      let responseData;
      try {
        responseData = JSON.parse(responseText);
        console.log('Parsed response:', responseData);
      } catch (e) {
        console.log('Response is not JSON:', responseText);
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, message: ${responseData?.message || responseText}`);
      }

      return responseData;
    } catch (error) {
      console.error('Error completo en revokeToken:', error);
      throw error;
    }
  },
};