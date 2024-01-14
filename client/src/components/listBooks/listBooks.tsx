import { View, Text, Image, StyleSheet } from 'react-native';
import useAllBooks from '../../hooks/useAllBooks';
import { BACK_API } from '@env';

const ListBooks = () => {
  const { books, loading } = useAllBooks();

  if (loading) return <Text>Cargando...</Text>;

  const styles = StyleSheet.create({
    cover: {
      width: 80,
      height: 160
    },
    icon: {
      width: 24,
      height: 24
    }
  });
   
  return (
    <View>
      {
        books.map((book) => {
          return (
            <View key={book.id}>
              <Image source={require('../../../assets/plus.png')} style={styles.icon}/>
              <Image source={{ uri: `${BACK_API}/uploads/${book.cover}`}} style={styles.cover}/>
              <Text>{book.title}</Text>
            </View>
          );
        })
      }
    </View>
  );
};

export default ListBooks;