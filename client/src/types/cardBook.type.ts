import { RouteProp, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Libro: { idBook: string},
  Editar: { idBook: string},
  'Mis libros': any
};

type CardBookRouteProp = RouteProp<RootStackParamList, 'Libro'>;

export type CardBookProps = {
  route: CardBookRouteProp;
  navigation: NavigationProp<RootStackParamList>
};