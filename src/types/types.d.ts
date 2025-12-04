// types.d.ts o donde tengas definidos tus tipos de navegación
import { RootStackParamList } from './src/types/navigation';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}