import { useState } from 'react';
import { TextInput, View, Pressable, Text, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { editBook } from '../../services/Books';
import { CoverState, EditBookProps } from '../../types/editBook.type';
import { Book } from '../../types/book.type';

const EditBookForm: React.FC<EditBookProps> = ({ navigation, route}) => {
  const { idBook } = route.params;
   
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
    const refreshBook: Book = {
      title,
      author,
      editorial,
      yearRelease,
      resume
    };    

    try {
      await editBook(idBook, refreshBook, cover);
      Alert.alert('Libro editado correctamente');
      navigation.navigate('Libro', {idBook: idBook});
    } catch (err) {      
      console.error(err);
    }
  };

  return (
    <View style={styles.main}>
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
        <Pressable onPress={submitChanges} style={styles.editBook}>
          <Text style={styles.editText}>Aceptar</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Libro', {idBook: idBook})} style={styles.cancel}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </Pressable> 
      </View> 
    </View>
  );
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
    paddingVertical: 8
  },
  imgSelected: {
    height: 100
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 30,
    justifyContent: 'space-around'
  },
  editBook: {
    backgroundColor: '#00CC7C',
    padding: 14,
    borderColor: '#00CC7C',
    borderWidth: 2,
    borderRadius: 8,
    width: 150
  },
  editText: {
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

export default EditBookForm;