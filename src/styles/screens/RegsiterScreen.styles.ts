// src/styles/screens/RegisterScreen.styles.ts
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const registerStyles = StyleSheet.create({
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
    backgroundColor: 'rgba(130, 180, 33, 0.7)', // Capa verde semi-transparente
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  innerContainer: {
    width: width * 0.92,
    maxWidth: 500,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 24,
    padding: 28,
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
    width: 90,
    height: 90,
    marginBottom: 10,
    borderRadius: 45,
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
    color: '#2C3E29',
    marginBottom: 24,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  inputHalf: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2C3E29',
    marginBottom: 6,
  },
  inputLabelRequired: {
    color: '#e74c3c',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#C5E1A5',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    color: '#2C3E29',
    marginBottom: 16,
    shadowColor: '#82B421',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputError: {
    borderColor: '#e74c3c',
    borderWidth: 2,
  },
  selectContainer: {
    marginBottom: 16,
  },
  selectLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2C3E29',
    marginBottom: 8,
  },
  selectOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  selectOption: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#C5E1A5',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#82B421',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectOptionSelected: {
    backgroundColor: '#82B421',
    borderColor: '#6A951B',
  },
  selectOptionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#5D7A2E',
  },
  selectOptionTextSelected: {
    color: '#fff',
  },
  registerButton: {
    backgroundColor: '#6A951B',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  registerButtonDisabled: {
    backgroundColor: '#bdc3c7',
    opacity: 0.6,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.8,
  },
  backButton: {
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
  },
  backButtonDisabled: {
    opacity: 0.5,
  },
  backButtonText: {
    color: '#5D7A2E',
    fontSize: 14,
    fontWeight: '500',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 12,
    fontWeight: '500',
  },
  errorTextSmall: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 8,
    paddingLeft: 4,
  },
});