import { NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Libro: { idBook: string | undefined},
  Añadir: any
};

export type ListBooksProps = {
  navigation: NavigationProp<RootStackParamList>;
};