import { StyleSheet } from 'react-native';
import { colors } from '../../../styles/colors';
import { spacing } from '../../../styles/spacing';
import { commonStyles } from '../../../styles/common';

export const profileAdminStyles = StyleSheet.create({
  container: {
    ...commonStyles.container,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  profileCard: {
    ...commonStyles.card,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  adminActions: {
    ...commonStyles.card,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: colors.lightGray,
    paddingBottom: spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  label: {
    fontSize: 16,
    color: colors.textTertiary,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: '600',
    maxWidth: '50%',
    textAlign: 'right',
  },
  adminText: {
    color: colors.error,
    fontWeight: 'bold',
  },
  tokenText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  adminButton: {
    ...commonStyles.button,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: spacing.sm,
    backgroundColor: colors.primary,
  },
  usersButton: {
    backgroundColor: colors.secondary,
  },
  productsButton: {
    backgroundColor: colors.success,
  },
  ordersButton: {
    backgroundColor: colors.warning,
  },
  adminButtonText: {
    ...commonStyles.buttonText,
  },
  logoutButton: {
    ...commonStyles.button,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: spacing.sm,
    backgroundColor: colors.error,
  },
  logoutButtonText: {
    ...commonStyles.buttonText,
  },
});