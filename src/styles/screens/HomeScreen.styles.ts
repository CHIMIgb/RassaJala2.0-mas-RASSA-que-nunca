// src/styles/screens/HomeScreen.styles.ts
import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../colors';
import { spacing } from '../spacing';
import { commonStyles } from '../common';

const { width } = Dimensions.get('window');
const isDesktop = width > 768;

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flex: 1,
  },
  
  // Hero Banner (Banner de bienvenida)
  heroBanner: {
    width: '100%',
    height: isDesktop ? 450 : 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroBannerImage: {
    resizeMode: 'cover',
    opacity: 0.9,
  },
  heroOverlay: {
    backgroundColor: 'rgba(42, 87, 45, 0.85)', // Verde oscuro semitransparente
    paddingHorizontal: isDesktop ? spacing.xl * 2 : spacing.lg,
    paddingVertical: isDesktop ? spacing.xl * 1.5 : spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  heroTitle: {
    fontSize: isDesktop ? 42 : 30,
    fontWeight: '900',
    color: colors.white,
    marginBottom: spacing.md,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  heroSubtitle: {
    fontSize: isDesktop ? 22 : 18,
    color: colors.white,
    marginBottom: spacing.sm,
    textAlign: 'center',
    lineHeight: isDesktop ? 30 : 24,
    fontWeight: '600',
    maxWidth: 800,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  heroDescription: {
    fontSize: isDesktop ? 18 : 16,
    color: colors.white,
    textAlign: 'center',
    lineHeight: isDesktop ? 26 : 22,
    maxWidth: 800,
    marginBottom: spacing.xl,
    fontWeight: '500',
    opacity: 0.95,
  },
  heroButton: {
    backgroundColor: colors.agriPrimary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: 50,
    marginTop: spacing.md,
    ...commonStyles.shadow,
    borderWidth: 2,
    borderColor: colors.white,
  },
  heroButtonText: {
    color: colors.white,
    fontSize: isDesktop ? 18 : 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  
  // Sección de Productos
  productsSection: {
    paddingHorizontal: isDesktop ? spacing.xl * 2 : spacing.lg,
    paddingVertical: isDesktop ? spacing.xl * 1.5 : spacing.xl,
    backgroundColor: colors.agriLight,
  },
  productsTitle: {
    fontSize: isDesktop ? 32 : 26,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: spacing.xl,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  
  // Categorías
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: spacing.xl,
    paddingVertical: spacing.sm,
  },
  categoryButton: {
    paddingHorizontal: isDesktop ? spacing.xl : spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 25,
    marginRight: spacing.md,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.border,
    minWidth: isDesktop ? 120 : 100,
    alignItems: 'center',
    justifyContent: 'center',
    ...commonStyles.shadow,
  },
  categoryButtonSelected: {
    backgroundColor: colors.agriPrimary,
    borderColor: colors.agriDark,
  },
  categoryText: {
    color: colors.textSecondary,
    fontWeight: '600',
    fontSize: isDesktop ? 16 : 14,
  },
  categoryTextSelected: {
    color: colors.white,
    fontWeight: '700',
  },
  
  // Productos Grid
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: isDesktop ? 'flex-start' : 'space-between',
    gap: isDesktop ? spacing.lg : spacing.md,
  },
  productCard: {
    width: isDesktop ? '23%' : '48%',
    backgroundColor: colors.white,
    borderRadius: 16,
    ...commonStyles.shadow,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: isDesktop ? 0 : spacing.md,
  },
  productImageContainer: {
    width: '100%',
    height: isDesktop ? 200 : 160,
    backgroundColor: colors.agriLight,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  productImage: {
    width: '85%',
    height: '85%',
    resizeMode: 'contain',
  },
  productInfo: {
    padding: spacing.lg,
    paddingTop: spacing.md,
  },
  productName: {
    fontSize: isDesktop ? 20 : 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    textAlign: 'left',
  },
  productDuration: {
    fontSize: isDesktop ? 14 : 12,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    textAlign: 'left',
    lineHeight: isDesktop ? 18 : 16,
    fontStyle: 'italic',
  },
  productPrice: {
    fontSize: isDesktop ? 24 : 20,
    fontWeight: '800',
    color: colors.agriPrimary,
    marginBottom: spacing.md,
    textAlign: 'left',
  },
  addToCartButton: {
    backgroundColor: colors.agriPrimary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  addToCartText: {
    color: colors.white,
    fontSize: isDesktop ? 16 : 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  
  // Sección Misión, Visión y Valores
  valuesSection: {
    paddingHorizontal: isDesktop ? spacing.xl * 2 : spacing.lg,
    paddingVertical: isDesktop ? spacing.xl * 2 : spacing.xl,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  valuesContainer: {
    flexDirection: isDesktop ? 'row' : 'column',
    justifyContent: 'space-between',
    gap: isDesktop ? spacing.xl : spacing.lg,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  valueCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: isDesktop ? spacing.xl : spacing.lg,
    borderWidth: 2,
    borderColor: colors.agriLight,
    ...commonStyles.shadow,
    minHeight: isDesktop ? 380 : 320,
    alignItems: 'center',
  },
  valueCardIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.agriPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    ...commonStyles.shadow,
  },
  valueCardIconImage: {
    width: 40,
    height: 40,
    tintColor: colors.white,
  },
  valueCardTitle: {
    fontSize: isDesktop ? 28 : 22,
    fontWeight: '800',
    color: colors.agriPrimary,
    marginBottom: spacing.md,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  divider: {
    height: 3,
    backgroundColor: colors.agriPrimary,
    width: '40%',
    alignSelf: 'center',
    marginBottom: spacing.lg,
    borderRadius: 2,
  },
  valueCardText: {
    fontSize: isDesktop ? 16 : 14,
    color: colors.textPrimary,
    lineHeight: isDesktop ? 24 : 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});