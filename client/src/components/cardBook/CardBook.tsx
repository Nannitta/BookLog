import useGetBook from '../../hooks/useGetBook';
import { Text, SafeAreaView, Image, StyleSheet, ScrollView, Pressable, RefreshControl, View, Alert } from 'react-native';
import { BACK_API } from '@env';
import { CardBookProps } from '../../types/cardBook.type';
import { deleteBookService } from '../../services/Books';
import { useState, useCallback } from 'react';
import { useFonts } from 'expo-font';

const CardBook: React.FC<CardBookProps> = ({ route, navigation }) => {
  const [fontsLoaded] = useFonts({
    'Oswald-SemiBold': require('../../../assets/fonts/Oswald-SemiBold.ttf'),
    'Roboto-Regular': require('../../../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Light': require('../../../assets/fonts/Roboto-Light.ttf'),
    'Roboto-Bold': require('../../../assets/fonts/Roboto-Bold.ttf'),
  });

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
    Alert.alert('Libro eliminado correctamente');
    navigation.navigate('Mis libros');
  };

  if (loading) return <Text>Cargando...</Text>;
  
  if (fontsLoaded) {
    return (
      <SafeAreaView style={styles.main}>
        {
          book
            ? <ScrollView style={styles.scroll}
              refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
            >
              <Pressable onPress={() => navigation.navigate('Editar', { idBook: idBook })} style={styles.editButton}>
                <Image source={require('../../../assets/edit.png')} style={styles.icon}/>
              </Pressable>
              <View style={styles.bookInfoContainer}>
                <View style={styles.coverShadow}>
                  <Image source={{ uri: `${BACK_API}/uploads/${book.cover}`}} style={styles.cover}/>
                </View>
                <View style={styles.bookInfo}>
                  <Text style={styles.title}>{book.title}</Text>
                  <Text style={styles.sub}>{book.author}</Text>
                  <Text style={styles.sub}>{book.yearRelease}</Text>
                  <Text style={styles.sub}>{book.editorial}</Text>
                </View>
              </View>
              <Text style={styles.sinop}>Sinópsis</Text>
              <Text style={styles.resume}>{book.resume}</Text>
              <Pressable onPress={() => deleteBook()} style={styles.deleteButton}>
                <View style={styles.deleteButtonContainer}>
                  <Image source={require('../../../assets/delete.png')} style={styles.icon}/>
                  <Text style={styles.deleteText}>Eliminar libro</Text>
                </View>
              </Pressable>
            </ScrollView> 
            : null
        }
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#F2EFE6'
  },
  scroll: {
    marginBottom: 10
  },
  editButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginBottom: 20
  },
  bookInfoContainer: {
    flexDirection: 'row',
    gap: 10
  },
  bookInfo: {
    width: '52%',
    gap: 5
  },
  cover: {
    width: 170,
    height: 250
  },
  coverShadow: {
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 1,
    elevation: 5,
    backgroundColor: '#F2EFE6',
    width: 170,
    height: 250
  },
  title: {
    fontFamily: 'Oswald-SemiBold',
    color: '#001A70',
    fontSize: 24,
    lineHeight: 27
  },
  sub: {
    color: '#001A70',
    fontFamily: 'Roboto-Light'
  },
  sinop: {
    color: '#001A70',
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    marginTop: 8,
    marginBottom: 8
  },
  resume: {
    color: '#616161',
    fontFamily: 'Roboto-Regular',
    marginBottom: 24
  },
  deleteButton: {
    borderColor: '#EC3A3A',
    borderWidth: 2,
    borderRadius: 8,
    padding: 14,
    alignSelf: 'center'
  },
  deleteButtonContainer: {
    flexDirection: 'row'
  },
  deleteText: {
    fontFamily: 'Roboto-Bold',
    color: '#EC3A3A',
    fontSize: 18,
    marginLeft: 8
  },
  icon: {
    width: 24,
    height: 24
  }
});

export default CardBook;