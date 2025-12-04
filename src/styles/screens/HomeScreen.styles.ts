// src/styles/screens/HomeScreen.styles.ts
import { StyleSheet } from 'react-native';
import { colors } from '../colors';
import { spacing } from '../spacing';
import { commonStyles } from '../common';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // Categorías
  categoriesContainer: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  categoryButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    marginHorizontal: spacing.xs,
    backgroundColor: colors.background,
  },
  categoryButtonSelected: {
    backgroundColor: colors.textPrimary,
  },
  categoryText: {
    color: colors.textSecondary,
    fontWeight: '500',
  },
  categoryTextSelected: {
    color: colors.white,
  },
  // Productos
  content: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: spacing.md,
    color: colors.textPrimary,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  productCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 10,
    marginBottom: spacing.md,
    ...commonStyles.shadow,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 120,
    backgroundColor: colors.background,
  },
  productInfo: {
    padding: spacing.sm,
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
    color: colors.textPrimary,
    textAlign: 'left',
  },
  productDuration: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    textAlign: 'left',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.accent,
    marginBottom: spacing.sm,
    textAlign: 'left',
  },
  productActions: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: spacing.xs,
  },
  productButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.xs,
    borderRadius: 5,
    width: '100%',
  },
  addToCartButton: {
    backgroundColor: colors.primary,
  },
  buyNowButton: {
    backgroundColor: colors.secondary,
  },
  productButtonText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '500',
  },

});