import useGetBook from '../../hooks/useGetBook';
import { Text, SafeAreaView, Image, StyleSheet, ScrollView } from 'react-native';
import { BACK_API } from '@env';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Libro: { idBook: string}
};

type CardBookRouteProp = RouteProp<RootStackParamList, 'Libro'>;

type CardBookProps = {
  route: CardBookRouteProp;
};

const CardBook: React.FC<CardBookProps> = ({ route }) => {
  const idBook = route.params.idBook; 
  const { book, loading } = useGetBook(idBook);
  if (loading) return <Text>Cargando...</Text>;

  return (
    <SafeAreaView style={styles.main}>
      {
        book
          ? <ScrollView style={styles.scroll}>
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
  }
});

export default CardBook;