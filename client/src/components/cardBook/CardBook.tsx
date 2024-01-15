import useGetBook from '../../hooks/useGetBook';
import { Text, SafeAreaView, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { BACK_API } from '@env';
import { RouteProp, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Libro: { idBook: string},
  Editar: { idBook: string}
};

type CardBookRouteProp = RouteProp<RootStackParamList, 'Libro'>;

type CardBookProps = {
  route: CardBookRouteProp;
  navigation: NavigationProp<RootStackParamList>
};

const CardBook: React.FC<CardBookProps> = ({ route, navigation }) => {
  const idBook = route.params.idBook; 
  const { book, loading } = useGetBook(idBook);
  if (loading) return <Text>Cargando...</Text>;

  return (
    <SafeAreaView style={styles.main}>
      {
        book
          ? <ScrollView style={styles.scroll}>
            <Pressable onPress={() => navigation.navigate('Editar', { idBook: idBook })}>
              <Image source={require('../../../assets/edit.png')} style={styles.icon}/>
            </Pressable>
            <Image source={{ uri: `${BACK_API}/uploads/${book.cover}`}} style={styles.cover}/>
            <Text>{book.title}</Text>
            <Text>{book.author}</Text>
            <Text>{book.yearRelease}</Text>
            <Text>{book.editorial}</Text>
            <Text>Sinópsis</Text>
            <Text>{book.resume}</Text>
          </ScrollView> 
          : null
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  scroll: {
    marginBottom: 10
  },
  cover: {
    width: 240,
    height: 320
  },
  icon: {
    width: 24,
    height: 24
  }
});

export default CardBook;