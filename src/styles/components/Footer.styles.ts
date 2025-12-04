// src/styles/components/Footer.styles.ts
import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../colors';
import { spacing } from '../spacing';

const { width } = Dimensions.get('window');
const isDesktop = width > 768;

export const footerStyles = StyleSheet.create({
  footer: {
    backgroundColor: colors.agriDark,
    paddingHorizontal: isDesktop ? spacing.xl * 2 : spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    borderTopWidth: 4,
    borderTopColor: colors.agriPrimary,
  },
  
  // Primera fila (4 columnas)
  topRow: {
    flexDirection: isDesktop ? 'row' : 'column',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    gap: isDesktop ? spacing.lg : spacing.xl,
  },
  
  column: {
    flex: 1,
    alignItems: isDesktop ? 'flex-start' : 'center',
    marginBottom: isDesktop ? 0 : spacing.md,
  },
  
  columnTitle: {
    fontSize: isDesktop ? 16 : 14,
    fontWeight: '700',
    color: colors.white,
    marginBottom: spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  // Redes sociales
  socialIcons: {
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: isDesktop ? 'flex-start' : 'center',
    width: '100%',
  },
  
  socialIcon: {
    color: colors.white,
  },
  
  // Ubicación
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  
  locationIcon: {
    color: colors.agriAccent,
  },
  
  locationText: {
    fontSize: isDesktop ? 14 : 12,
    color: colors.agriAccent,
    textDecorationLine: 'underline',
    fontStyle: 'italic',
  },
  
  // Contacto
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.agriPrimary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 25,
    gap: spacing.sm,
    ...StyleSheet.absoluteFillObject,
  },
  
  contactButtonText: {
    color: colors.white,
    fontSize: isDesktop ? 14 : 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  
  // Enlaces
  linkText: {
    fontSize: isDesktop ? 14 : 12,
    color: colors.agriAccent,
    textDecorationLine: 'underline',
  },
  
  // Línea divisoria
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: spacing.lg,
    width: '100%',
  },
  
  // Segunda fila (enlaces inferiores)
  bottomRow: {
    flexDirection: isDesktop ? 'row' : 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: isDesktop ? spacing.xl * 2 : spacing.lg,
    marginBottom: spacing.lg,
  },
  
  bottomLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  
  bottomIcon: {
    color: colors.agriAccent,
  },
  
  bottomLinkText: {
    fontSize: isDesktop ? 14 : 12,
    color: colors.agriAccent,
    textDecorationLine: 'underline',
  },
  
  // Copyright
  copyrightContainer: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  
  copyrightText: {
    fontSize: isDesktop ? 12 : 10,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
});