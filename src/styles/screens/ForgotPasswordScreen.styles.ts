import { StyleSheet } from 'react-native';
import { colors } from '../colors';
import { spacing } from '../spacing';
import { commonStyles } from '../common';

export const forgotPasswordStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
    marginBottom: spacing.lg,
  },
  instructions: {
    textAlign: 'center',
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    fontSize: 14,
    lineHeight: 20,
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
  // --- AÑADIDO ---
  inputDisabled: {
    backgroundColor: '#f0f0f0', // Un color grisáceo para indicar que está deshabilitado
    color: '#a0a0a0',
  },
  recoverButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: spacing.md,
    ...commonStyles.shadow,
  },
  // --- AÑADIDO ---
  recoverButtonDisabled: {
    backgroundColor: colors.primary, // Mantenemos el color
    opacity: 0.6, // Reducimos la opacidad
  },
  recoverButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  // --- AÑADIDO ---
  backButtonDisabled: {
    opacity: 0.5,
  },
  backButtonText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
});