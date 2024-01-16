import { View, Text, Image, StyleSheet, FlatList, SafeAreaView, Pressable, RefreshControl } from 'react-native';
import useAllBooks from '../../hooks/useAllBooks';
import { BACK_API } from '@env';
import { ListBooksProps } from '../../types/listBooks.type';
import { useCallback, useState } from 'react';

const ListBooks: React.FC<ListBooksProps> = ({ navigation }) => {
  const { books, loading, refetchUseGetAllBooks } = useAllBooks();
  const [refresh, setRefresh] = useState<boolean>(false);

  const onRefresh = useCallback(async () => {
    setRefresh(true);
    await refetchUseGetAllBooks();
    setRefresh(false);
  }, [refetchUseGetAllBooks]);

  if (loading) return <Text>Cargando...</Text>;
   
  return (
    <SafeAreaView style={styles.safeArea}>
      <Pressable style={styles.addBook} onPress={() => navigation.navigate('Añadir')}><Text><Image source={require('../../../assets/book.png')}/>Añadir libro</Text></Pressable>
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
        refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
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