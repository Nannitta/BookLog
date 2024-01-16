import Header from './src/components/header/Header';
import ListBooks from './src/components/listBooks/listBooks';
import Footer from './src/components/footer/Footer';
import CardBook from './src/components/cardBook/CardBook';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditBookForm from './src/components/editBook/EditBookForm';
import { Book } from './src/types/book.type';
import AddBookForm from './src/components/addBook/addBookForm';

type RootStackParamList = {
  Libro: { idBook: string},
  Editar: { idBook: string},
  'Mis libros': Book[],
  Añadir: any
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <>
      <Header/>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerStyle: { backgroundColor: '#F2EFE6'}, headerTintColor: '#001A70'}}>
          <Stack.Screen name='Mis libros' component={ListBooks}/>
          <Stack.Screen name='Libro' component={CardBook}/>
          <Stack.Screen name='Editar' component={EditBookForm}/>
          <Stack.Screen name='Añadir' component={AddBookForm}/>
        </Stack.Navigator>
      </NavigationContainer>
      <Footer/>
    </>
  );
}