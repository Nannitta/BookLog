import { View, Image, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const Header = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../../assets/splash.png')}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    paddingTop: 20,
    alignItems: 'center'
  },
  logo: {
    width: 150,
    height: 60,
  }
});

export default Header;