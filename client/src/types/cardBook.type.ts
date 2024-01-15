import { RouteProp, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Libro: { idBook: string},
  Editar: { idBook: string}
};

type CardBookRouteProp = RouteProp<RootStackParamList, 'Libro'>;

export type CardBookProps = {
  route: CardBookRouteProp;
  navigation: NavigationProp<RootStackParamList>
};