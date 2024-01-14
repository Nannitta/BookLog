import Header from './src/components/header/Header';
import ListBooks from './src/components/listBooks/listBooks';
import Footer from './src/components/footer/Footer';
import CardBook from './src/components/cardBook/CardBook';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <Header/>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Mis libros' component={ListBooks}/>
          <Stack.Screen name='Libro' component={CardBook}/>
        </Stack.Navigator>
      </NavigationContainer>
      <Footer/>
    </>
  );
}