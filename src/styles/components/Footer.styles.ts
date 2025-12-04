// src/styles/components/Footer.styles.ts
import { StyleSheet } from 'react-native';
import { colors } from '../colors';
import { spacing } from '../spacing';
import { commonStyles } from '../common';

export const footerStyles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  footerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
    borderRadius: 10,
    minWidth: 60,
  },
  activeButton: {
    backgroundColor: '#f0f8ff', // Color azul claro para el estado activo
    transform: [{ scale: 1.05 }],
  },
  footerIcon: {
    fontSize: 22,
    marginBottom: spacing.xs,
    color: colors.textSecondary,
  },
  activeIcon: {
    color: colors.primary, // Usamos el color primary para íconos activos
  },
  footerText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  activeText: {
    color: colors.primary, // Usamos el color primary para texto activo
    fontWeight: '600',
  },
});