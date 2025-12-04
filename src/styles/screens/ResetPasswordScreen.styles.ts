import { StyleSheet, Dimensions } from 'react-native'; // Importar Dimensions
import { colors } from '../colors';
import { spacing } from '../spacing';
import { commonStyles } from '../common';

// Obtener el ancho de la pantalla para el modal
const { width } = Dimensions.get('window');

export const resetPasswordStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // ... (tus estilos existentes: innerContainer, title, instructions, etc.)
  innerContainer: {
    flexGrow: 1,
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
  inputDisabled: {
    backgroundColor: '#f0f0f0',
    color: '#a0a0a0',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: spacing.md,
    marginTop: -spacing.sm,
  },
  resetButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: spacing.md,
    ...commonStyles.shadow,
  },
  resetButtonDisabled: {
    backgroundColor: colors.primary,
    opacity: 0.6,
  },
  resetButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  
  // --- AÑADIR TODOS ESTOS ESTILOS PARA EL MODAL ---
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
  },
  modalContainer: {
    width: width * 0.9, // 90% del ancho de la pantalla
    maxWidth: 400, // Un ancho máximo para web
    backgroundColor: colors.surface, // Fondo blanco (o el de tu app)
    borderRadius: 10,
    padding: spacing.lg,
    alignItems: 'center',
    ...commonStyles.shadow, // Sombra
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  modalMessage: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  modalButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 8,
    ...commonStyles.shadow,
  },
  modalButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
    passwordContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
    passwordInput: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    borderRadius: 8,
    fontSize: 16,
    color: colors.textPrimary,
    paddingRight: 50, // Espacio para el icono
  },
    eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 12,
    padding: 4,
  },
});