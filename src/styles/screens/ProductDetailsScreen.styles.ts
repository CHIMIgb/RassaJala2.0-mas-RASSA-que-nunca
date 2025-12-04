// src/styles/screens/ProductDetailScreen.styles.ts
import { StyleSheet } from 'react-native';
import { colors } from '../colors';
import { spacing } from '../spacing';
import { commonStyles } from '../common';

export const productDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  imageContainer: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  productImage: {
    width: 200,
    height: 200,
  },
  infoContainer: {
    padding: spacing.lg,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  durationOptions: {
    marginBottom: spacing.lg,
  },
  durationOption: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  durationOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: '#e8f4fd', // Azul claro para selección
  },
  durationLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textTertiary,
    marginBottom: spacing.xs,
  },
  durationLabelSelected: {
    color: colors.primary,
  },
  durationPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.accent,
  },
  discountBadge: {
    fontSize: 12,
    color: colors.success,
    marginTop: spacing.xs,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.lg,
    ...commonStyles.shadow,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.accent,
  },
  descriptionContainer: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.lg,
    ...commonStyles.shadow,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  productDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  additionalInfo: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.lg,
    ...commonStyles.shadow,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    lineHeight: 20,
  },
  actionsContainer: {
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  actionButton: {
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    ...commonStyles.shadow,
  },
  addToCartButton: {
    backgroundColor: colors.primary,
  },
  buyNowButton: {
    backgroundColor: colors.secondary,
  },
  actionButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});