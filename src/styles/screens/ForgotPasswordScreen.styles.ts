// src/styles/screens/ForgotPasswordScreen.styles.ts
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const forgotPasswordStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#82B421', // Color principal verde agrícola
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.15,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(130, 180, 33, 0.7)',
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
    paddingTop: 70,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -60,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 12,
    borderRadius: 50,
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: '#82B421',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2C3E29', // Negro/verde oscuro
    marginBottom: 16,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  instructions: {
    fontSize: 14,
    color: '#495057', // Gris oscuro
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#C5E1A5',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#2C3E29',
    marginBottom: 20,
    shadowColor: '#82B421',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputDisabled: {
    backgroundColor: '#f5f5f5',
    opacity: 0.6,
  },
  recoverButton: {
    backgroundColor: '#6A951B',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  recoverButtonDisabled: {
    backgroundColor: '#bdc3c7',
    opacity: 0.6,
  },
  recoverButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.8,
  },
  backButton: {
    alignItems: 'center',
    padding: 12,
  },
  backButtonDisabled: {
    opacity: 0.5,
  },
  backButtonText: {
    color: '#5D7A2E',
    fontSize: 14,
    fontWeight: '500',
  },
});