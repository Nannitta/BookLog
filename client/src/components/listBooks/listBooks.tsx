import { View, Text, Image, StyleSheet, FlatList, SafeAreaView, Pressable, RefreshControl } from 'react-native';
import useAllBooks from '../../hooks/useAllBooks';
import { BACK_API } from '@env';
import { ListBooksProps } from '../../types/listBooks.type';
import { useCallback, useState } from 'react';
import { useFonts } from 'expo-font';

const ListBooks: React.FC<ListBooksProps> = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'Oswald-SemiBold': require('../../../assets/fonts/Oswald-SemiBold.ttf'),
    'Roboto-Light': require('../../../assets/fonts/Roboto-Light.ttf'),
    'Roboto-Bold': require('../../../assets/fonts/Roboto-Bold.ttf'),
  });

  const { books, loading, refetchUseGetAllBooks } = useAllBooks();
  const [refresh, setRefresh] = useState<boolean>(false);

  const onRefresh = useCallback(async () => {
    setRefresh(true);
    await refetchUseGetAllBooks();
    setRefresh(false);
  }, [refetchUseGetAllBooks]);

  if (loading) return <Text>Cargando...</Text>;

  if (fontsLoaded) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Pressable style={styles.addBook} onPress={() => navigation.navigate('Añadir')}>
          <View style={styles.buttonContainer}>
            <Image source={require('../../../assets/book.png')} style={styles.bookIcon}/>
            <Text style={styles.buttonText}>
              Añadir libro
            </Text>
          </View>
        </Pressable>
        <FlatList
          data={books}
          renderItem={({ item: book }) => (
            <View key={book.id} style={styles.cardBook}>
              <View style={styles.bookInfoContainer}>
                <View style={styles.coverShadow}>
                  <Image source={{ uri: `${BACK_API}/uploads/${book.cover}`}} style={styles.cover}/>
                </View>
                <View style={styles.bookInfo}>
                  <Text style={styles.title}>{book.title}</Text>
                  <Text style={styles.author}>{book.author}</Text>
                  <Text style={styles.resume} ellipsizeMode="tail" numberOfLines={4}>{book.resume}</Text>
                </View>
              </View>
              <View style={styles.plusContainer}>
                <Pressable onPress={() => navigation.navigate('Libro', { idBook: book.id })}>
                  <Image source={require('../../../assets/plus.png')} style={styles.icon}/>
                </Pressable>
              </View>
            </View>
          )}
          refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
        />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: '#F2EFE6'
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  addBook: {
    backgroundColor: '#00CC7C',
    padding: 14,
    borderRadius: 8,
    width: '42%',
    alignSelf: 'flex-end',
    marginTop: 10,
    marginBottom: 30
  },
  bookIcon: {
    width: 16,
    height: 16
  },
  buttonText: {
    fontFamily: 'Roboto-Bold',
    color: '#001A70',
    fontSize: 18,
    marginLeft: 8
  },
  cardBook: {
    gap: 20
  },
  bookInfoContainer: {
    flexDirection: 'row',
    gap: 10
  },
  cover: {
    width: 150,
    height: 224
  },
  coverShadow: {
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 1,
    elevation: 5,
    backgroundColor: '#F2EFE6',
    width: 150,
    height: 224
  },
  bookInfo: {
    width: '52%'
  },
  title: {
    color: '#001A70',
    fontFamily: 'Oswald-SemiBold',
    fontSize: 24,
    lineHeight: 27
  },
  author: {
    color: '#001A70',
    fontFamily: 'Roboto-Light',
    marginBottom: 5
  },
  resume: {
    color: '#616161',
    fontFamily: 'Roboto-Regular'
  },
  plusContainer: {
    alignItems: 'flex-end',
    position: 'relative',
    bottom: 42
  },
  icon: {
    width: 24,
    height: 24
  },
});

export default ListBooks;