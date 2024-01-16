import { RouteProp, NavigationProp } from '@react-navigation/native';

export interface CoverState {
  uri: string;
  type: string;
  name: string;
  data: Blob;
}

type RootStackParamList = {
  Libro: { idBook: string }
  Editar: { idBook: string }
};

type EditBookRouteProp = RouteProp<RootStackParamList, 'Libro'>;

export type EditBookProps = {
  route: EditBookRouteProp;
  navigation: NavigationProp<RootStackParamList>
};