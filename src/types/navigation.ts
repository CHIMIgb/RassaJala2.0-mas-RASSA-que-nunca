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
  ResetPassword: { token: string };
};