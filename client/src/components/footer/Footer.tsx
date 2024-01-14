import { Text, Image, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24
  }
});

const Footer = () => {
  return (
    <View>
      <Text>
        © 2024  ||  Hecho por Nair Glez.  || 
        <Image style={styles.icon} source={require('../../../assets/linkedin.png')}/>
        <Image style={styles.icon} source={require('../../../assets/github.png')}/>
      </Text>
    </View>
  );
};

export default Footer;