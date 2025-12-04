// src/styles/screens/LoginScreen.styles.ts
import { StyleSheet } from 'react-native';
import { colors } from '../colors';
import { spacing } from '../spacing';
import { commonStyles } from '../common';

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  form: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: 10,
    ...commonStyles.shadow,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.md,
    fontSize: 16,
    color: colors.textPrimary,
  },
  // --- NUEVOS ESTILOS PARA EL CAMPO DE CONTRASEÑA ---
  passwordContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    borderRadius: 8,
    fontSize: 16,
    color: colors.textPrimary,
    paddingRight: 50, // Espacio para el icono
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 12,
    padding: 4,
  },
  // --- FIN DE NUEVOS ESTILOS ---
  loginButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: spacing.sm,
    ...commonStyles.shadow,
  },
  loginButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotPasswordButton: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: 14,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  separatorText: {
    marginHorizontal: spacing.sm,
    color: colors.textSecondary,
  },
  createAccountButton: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  createAccountText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  createAccountLink: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  backButton: {
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  backButtonText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: spacing.md,
    backgroundColor: 'rgba(255, 56, 96, 0.1)',
    padding: spacing.sm,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.error,
  },
  loginButtonDisabled: {
    backgroundColor: colors.disabled,
    borderColor: colors.border,
  },
});