import { View, Text, Image, StyleSheet, FlatList, SafeAreaView, Pressable } from 'react-native';
import useAllBooks from '../../hooks/useAllBooks';
import { BACK_API } from '@env';
import { NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Libro: { idBook: string}
};

type ListBooksProps = {
  navigation: NavigationProp<RootStackParamList>;
};

const ListBooks: React.FC<ListBooksProps> = ({ navigation }) => {
  const { books, loading } = useAllBooks();

  if (loading) return <Text>Cargando...</Text>;
   
  return (
    <SafeAreaView style={styles.safeArea}>
      <Pressable style={styles.addBook}><Text><Image source={require('../../../assets/book.png')}/>Añadir libro</Text></Pressable>
      <FlatList
        data={books}
        renderItem={({ item: book }) => (
          <View key={book.id}>
            <Pressable onPress={() => navigation.navigate('Libro', { idBook: book.id })}>
              <Image source={require('../../../assets/plus.png')} style={styles.icon}/>
            </Pressable>
            <Image source={{ uri: `${BACK_API}/uploads/${book.cover}`}} style={styles.cover}/>
            <Text>{book.title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  cover: {
    width: 80,
    height: 160
  },
  icon: {
    width: 24,
    height: 24
  },
  addBook: {
    backgroundColor: 'red',
    padding: 16,
    justifyContent: 'center'
  }
});

export default ListBooks;