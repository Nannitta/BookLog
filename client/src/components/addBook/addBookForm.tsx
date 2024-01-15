import { addBook } from '../../services/Books';
import { useState } from 'react';
import { CoverState } from '../../types/editBook.type';
import * as ImagePicker from 'expo-image-picker';
import { TextInput, SafeAreaView, Pressable, Text, Alert, Image, ScrollView, View } from 'react-native';
import { Book } from '../../types/book.type';
import { AddBookFormProps } from '../../types/addBook.type';

const AddBookForm: React.FC<AddBookFormProps> = ({ navigation }) => {
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

  return (
    <SafeAreaView>
      <ScrollView>
        <TextInput
          placeholder='Título'
          onChangeText={setTitle}
          value={title}
        />
        <TextInput
          placeholder='Autor'
          onChangeText={setAuthor}
          value={author}   
        />
        <TextInput
          placeholder='Editorial'
          onChangeText={setEditorial}
          value={editorial}
        />
        <TextInput
          placeholder='Año de publicación'
          onChangeText={setYearRelease}
          value={yearRelease}
        />
        <TextInput
          placeholder='Sinópsis'
          onChangeText={setResume}
          multiline
          numberOfLines={5}
          value={resume}
        />
        <View> 
          <Text> 
          Portada 
          </Text> 
          <Pressable 
            onPress={uploadCover}> 
            <Text> 
            Selecciona una imágen
            </Text> 
          </Pressable> 
          {cover ? ( 
            <View> 
              <Image source={{ uri: cover.uri }}/> 
            </View> 
          ) : null} 
        </View> 
        <Pressable onPress={submitChanges}>
          <Text>Añadir libro</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Mis libros', '/')}>
          <Text>Cancelar</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddBookForm;