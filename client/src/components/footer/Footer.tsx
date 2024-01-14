import { Text, Image, StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';

const Footer = () => {
  return (
    <View>
      <Text>
        © 2024  ||  Hecho por Nair Glez.  ||
        <Link href={'https://www.linkedin.com/in/nairglez/'}>        
          <Image style={styles.icon} source={require('../../../assets/linkedin.png')}/>
        </Link>
        <Link href={'https://github.com/Nannitta/Books-app'}>
          <Image style={styles.icon} source={require('../../../assets/github.png')}/>
        </Link> 
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24
  }
});

export default Footer;