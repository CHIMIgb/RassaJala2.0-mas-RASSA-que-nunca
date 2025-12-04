// src/styles/screens/LoginScreen.styles.ts
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#82B421', // Color principal verde agrícola
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.15, // Imagen con transparencia
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(130, 180, 33, 0.7)', // Capa verde semi-transparente
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  innerContainer: {
    width: width * 0.9,
    maxWidth: 450,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    // Sombra suave
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 16,
    borderRadius: 70,
    backgroundColor: '#fff',
    // Sombra para el logo
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  form: {
    width: '100%',
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2C3E29', // Verde oscuro para texto
    marginBottom: 10,
    marginTop: 4,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#C5E1A5', // Borde verde claro
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#2C3E29',
    marginBottom: 20,
    // Sombra muy suave
    shadowColor: '#82B421',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  passwordInput: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#C5E1A5',
    borderRadius: 12,
    padding: 16,
    paddingRight: 50,
    fontSize: 16,
    color: '#2C3E29',
    // Sombra muy suave
    shadowColor: '#82B421',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 4,
  },
  forgotPasswordButton: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#5D7A2E', // Verde medio
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#6A951B', // Verde oscuro para el botón
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginBottom: 20,
    // Sombra para dar profundidad
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonDisabled: {
    backgroundColor: '#bdc3c7',
    opacity: 0.6,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.8,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#C5E1A5',
  },
  separatorText: {
    marginHorizontal: 16,
    color: '#5D7A2E',
    fontSize: 14,
    fontWeight: '600',
  },
  createAccountButton: {
    alignItems: 'center',
    marginBottom: 8,
  },
  createAccountText: {
    color: '#495057',
    fontSize: 14,
  },
  createAccountLink: {
    color: '#3498db', // Azul para el enlace de registro
    fontWeight: 'bold',
  },
  backButton: {
    alignItems: 'center',
    padding: 12,
  },
  backButtonText: {
    color: '#5D7A2E',
    fontSize: 14,
    fontWeight: '500',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 13,
    marginTop: -12,
    marginBottom: 16,
    paddingLeft: 4,
    fontWeight: '500',
  },
});