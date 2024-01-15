import { useState } from 'react';
import { TextInput, View, Pressable, Text, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { editBook } from '../../services/Books';
import { RouteProp, NavigationProp } from '@react-navigation/native';
import { Book } from '../../types/book.type';

interface CoverState {
  uri: string;
  type: string;
  name: string;
  data: Blob;
}

type RootStackParamList = {
  Libro: { idBook: string}
};

type EditBookRouteProp = RouteProp<RootStackParamList, 'Libro'>;

type EditBookProps = {
  route: EditBookRouteProp;
  navigation: NavigationProp<RootStackParamList>
};

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
    } catch (err) {      
      console.error(err);
    }
  };

  return (
    <View>
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
        <Text>Aceptar</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Libro', {idBook: idBook})}>
        <Text>Cancelar</Text>
      </Pressable>
    </View>
  );
};

export default EditBookForm;