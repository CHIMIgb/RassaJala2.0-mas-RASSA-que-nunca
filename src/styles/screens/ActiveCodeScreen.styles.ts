// src/screens/ActiveCodeScreen/ActiveCodeScreen.styles.ts
import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { commonStyles } from '../../styles/common';

export const activeCodeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: spacing.lg,
    backgroundColor: colors.lightGray,
    padding: spacing.lg,
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 22,
  },
  codeContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  codeLabel: {
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: spacing.md,
    fontWeight: '500',
  },
  codeInputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  codeInput: {
    width: 45,
    height: 55,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.surface,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  codeInputFilled: {
    borderColor: colors.primary,
    backgroundColor: colors.lightGray,
  },
  timerContainer: {
    marginBottom: spacing.xl,
  },
  timerText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  validateButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginBottom: spacing.md,
    ...commonStyles.shadow,
  },
  validateButtonActive: {
    backgroundColor: colors.primary,
  },
  validateButtonDisabled: {
    backgroundColor: colors.disabled,
  },
  validateButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.surface,
  },
  resendButtonDisabled: {
    opacity: 0.5,
  },
  resendButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  backButtonText: {
    color: colors.primary,
    fontSize: 16,
    marginLeft: spacing.xs,
  },
});