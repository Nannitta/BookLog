import { addBook } from '../../services/Books';
import { useState } from 'react';
import { CoverState } from '../../types/editBook.type';
import * as ImagePicker from 'expo-image-picker';
import { TextInput, Pressable, Text, Alert, View, StyleSheet, ScrollView } from 'react-native';
import { Book } from '../../types/book.type';
import { AddBookFormProps } from '../../types/addBook.type';
import { useFonts } from 'expo-font';

const AddBookForm: React.FC<AddBookFormProps> = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'Oswald-SemiBold': require('../../../assets/fonts/Oswald-SemiBold.ttf'),
    'Roboto-Regular': require('../../../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Light': require('../../../assets/fonts/Roboto-Light.ttf'),
    'Roboto-Bold': require('../../../assets/fonts/Roboto-Bold.ttf'),
  });

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [editorial, setEditorial] = useState('');
  const [yearRelease, setYearRelease] = useState('');
  const [resume, setResume] = useState('');
  const [cover, setCover] = useState<CoverState>();

  const uploadCover = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (status !== 'granted') {
      Alert.alert('Ha ocurrido un error al subir la portada');
    } else {
      const result = await ImagePicker.launchImageLibraryAsync();    
      
      if (!result.canceled) {
        const response = await fetch(result.assets[0].uri);               
        const blob = await response.blob();
        
        setCover({
          uri: result.assets[0].uri,
          type: 'image/jpeg',
          name: 'cover.jpg',
          data: blob,
        } as { uri: string; type: string; name: string; data: Blob });
      }      
    }
  };

  const submitChanges = async () => {
    const addedBook: Book = {
      title,
      author,
      editorial,
      yearRelease,
      resume
    };    

    try {
      await addBook(addedBook, cover);
      navigation.navigate('Mis libros', '/');
    } catch (err) {      
      console.error(err);
    }
  };

  if (fontsLoaded) {
    return (
      <ScrollView style={styles.main}>
        <View style={styles.flexRow}>
          <TextInput
            placeholder='Título'
            onChangeText={setTitle}
            value={title}
            style={styles.inputText}
          />
          <TextInput
            placeholder='Autor'
            onChangeText={setAuthor}
            value={author}
            style={styles.inputText}   
          />
        </View>
        <View style={styles.flexRow}>
          <TextInput
            placeholder='Editorial'
            onChangeText={setEditorial}
            value={editorial}
            style={styles.inputText}
          />
          <TextInput
            placeholder='Año de publicación'
            onChangeText={setYearRelease}
            value={yearRelease}
            maxLength={4}
            keyboardType='phone-pad'
            style={styles.inputText}
          />
        </View>
        <TextInput
          placeholder='Sinópsis'
          onChangeText={setResume}
          multiline
          numberOfLines={5}
          value={resume}
          style={styles.borderInput}
        />
        <View> 
          <Pressable 
            onPress={uploadCover}> 
            <Text style={styles.borderInput}> 
              Selecciona una imágen
            </Text> 
          </Pressable> 
          {cover ? ( 
            <Text style={styles.imgSelected}> 
                Imágen seleccionada: <Text>{cover.uri.split('/')[11]}</Text>
            </Text> 
          ) : null} 
        </View>
        <View style={styles.buttonsContainer}>
          <Pressable onPress={submitChanges} style={styles.addBook}>
            <Text style={styles.addText}>Añadir libro</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Mis libros', '/')} style={styles.cancel}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </Pressable>
        </View> 
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F2EFE6',
    paddingRight: 20,
    paddingLeft: 20,
    paddingVertical: 40
  },
  flexRow: {
    flexDirection: 'row',
    gap: 35
  },
  inputText: {
    width: 150,
    borderBottomColor: '#616161',
    borderBottomWidth: 1,
    marginVertical: 20
  },
  borderInput: {
    borderColor: '#616161',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 20,
    paddingLeft: 20,
    paddingVertical: 8,
    overflow: 'scroll'
  },
  portraitText: {
    color: '#616161',
    opacity: 0.6
  },
  imgSelected: {
    height: 100
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 30,
    justifyContent: 'space-around',
    marginBottom: 60
  },
  addBook: {
    backgroundColor: '#00CC7C',
    padding: 14,
    borderColor: '#00CC7C',
    borderWidth: 2,
    borderRadius: 8,
    width: 150
  },
  addText: {
    fontFamily: 'Roboto-Bold',
    color: '#001A70',
    fontSize: 18,
    textAlign: 'center'
  },
  cancel: {
    borderColor: '#EC3A3A',
    borderWidth: 2,
    borderRadius: 8,
    padding: 14,
    alignSelf: 'center',
    width: 150
  },
  cancelText: {
    fontFamily: 'Roboto-Bold',
    color: '#EC3A3A',
    fontSize: 18,
    textAlign: 'center'
  }
});

export default AddBookForm;