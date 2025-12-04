import { StyleSheet } from 'react-native';
import { colors } from '../../colors';
import { spacing } from '../../spacing';
import { commonStyles } from '../../common';

export const adminPanelStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.textPrimary,
    padding: spacing.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: colors.lightGray,
    opacity: 0.9,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: spacing.md,
    backgroundColor: colors.surface,
  },
  statCard: {
    width: '48%',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.sm,
    alignItems: 'center',
    ...commonStyles.shadow,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  statTitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  statChange: {
    fontSize: 11,
    fontWeight: '600',
  },
  positive: {
    color: colors.success,
  },
  negative: {
    color: colors.error,
  },
  chartContainer: {
    backgroundColor: colors.surface,
    margin: spacing.sm,
    padding: spacing.md,
    borderRadius: 12,
    ...commonStyles.shadow,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  chart: {
    marginVertical: spacing.sm,
    borderRadius: 16,
  },
  actionsContainer: {
    backgroundColor: colors.surface,
    margin: spacing.sm,
    padding: spacing.md,
    borderRadius: 12,
    ...commonStyles.shadow,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: spacing.sm,
    ...commonStyles.shadow,
  },
  actionIcon: {
    fontSize: 20,
    color: colors.white,
    marginBottom: spacing.xs,
  },
  actionText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '500',
    textAlign: 'center',
  },
  summaryContainer: {
    backgroundColor: colors.surface,
    margin: spacing.sm,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.lg,
    ...commonStyles.shadow,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});