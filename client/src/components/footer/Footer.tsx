import { Text, Image, StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>
        © 2024  ||  Hecho por Nair Glez.  ||
      </Text>
      <View style={styles.iconsContainer}>
        <Link href={'https://www.linkedin.com/in/nairglez/'}>        
          <Image style={styles.icon} source={require('../../../assets/linkedin.png')}/>
        </Link>
        <Link href={'https://github.com/Nannitta/Books-app'}>
          <Image style={styles.icon} source={require('../../../assets/github.png')}/>
        </Link> 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 5,
    backgroundColor: '#F2EFE6'
  },
  footerText: {
    color: '#001A70',
    marginRight: 10
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: 10
  },
  icon: {
    width: 16,
    height: 16
  }
});

export default Footer;