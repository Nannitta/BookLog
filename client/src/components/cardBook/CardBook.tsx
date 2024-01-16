import useGetBook from '../../hooks/useGetBook';
import { Text, SafeAreaView, Image, StyleSheet, ScrollView, Pressable, RefreshControl } from 'react-native';
import { BACK_API } from '@env';
import { CardBookProps } from '../../types/cardBook.type';
import { deleteBookService } from '../../services/Books';
import { useState, useCallback } from 'react';

const CardBook: React.FC<CardBookProps> = ({ route, navigation }) => {
  const idBook = route.params.idBook; 
  const { book, loading, refetchUseGetBook } = useGetBook(idBook);
  
  const [refresh, setRefresh] = useState<boolean>(false);

  const onRefresh = useCallback(async () => {
    setRefresh(true);
    await refetchUseGetBook();
    setRefresh(false);
  }, [refetchUseGetBook]);

  const deleteBook = async () => {
    await deleteBookService(idBook);
    navigation.navigate('Mis libros');
  };

  if (loading) return <Text>Cargando...</Text>;
  
  return (
    <SafeAreaView style={styles.main}>
      {
        book
          ? <ScrollView style={styles.scroll}
            refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
          >
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
            <Pressable onPress={() => deleteBook()}><Text><Image source={require('../../../assets/delete.png')}/>Eliminar libro</Text></Pressable>
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