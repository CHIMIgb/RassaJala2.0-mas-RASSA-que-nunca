// src/types/navigation.ts
export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  Register: undefined;
  ProductDetail: { productId: string };
  Cart: undefined;
  Profile: undefined;
  ProfileAdmin: undefined;
  AdminPanel: undefined;
  AuthRedirect: undefined;
  ActiveCodeScreen: undefined;
  // Pantalla para recuperar la contraseña
  // Esta pantalla espera un 'token' que viene del deep link
  ResetPassword: { token: string };
};