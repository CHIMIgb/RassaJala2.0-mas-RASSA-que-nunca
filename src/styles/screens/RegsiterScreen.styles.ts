// src/styles/screens/RegisterScreen.styles.ts
import { StyleSheet } from 'react-native';
import { colors } from '../colors';
import { spacing } from '../spacing';
import { commonStyles } from '../common';

export const registerStyles = StyleSheet.create({
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
    marginBottom: spacing.lg,
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
    marginBottom: spacing.xs,
    fontSize: 16,
    color: colors.textPrimary,
    backgroundColor: colors.white,
  },
  inputError: {
    borderColor: colors.error,
    borderWidth: 2,
  },
  
  // Estilos para el selector de sexo
  selectContainer: {
    marginBottom: spacing.md,
  },
  selectLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.xs,
    color: colors.textPrimary,
  },
  selectOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  selectOption: {
    flex: 1,
    padding: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  selectOptionSelected: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  selectOptionText: {
    color: colors.textSecondary,
    fontWeight: '500',
  },
  selectOptionTextSelected: {
    color: colors.white,
    fontWeight: '600',
  },

  registerButton: {
    backgroundColor: colors.secondary,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.md,
    ...commonStyles.shadow,
  },
  registerButtonDisabled: {
    backgroundColor: colors.disabled,
  },
  registerButtonText: {
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
    backgroundColor: colors.white,
  },
  backButtonDisabled: {
    borderColor: colors.disabled,
    backgroundColor: colors.background,
  },
  backButtonText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '500',
  },
  
  errorText: {
    color: colors.error,
    textAlign: 'center',
    marginTop: spacing.sm,
    fontSize: 14,
    fontWeight: '500',
  },
  errorTextSmall: {
    color: colors.error,
    fontSize: 12,
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
});