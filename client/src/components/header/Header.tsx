import { View, Image, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';

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

const Header = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Image style={styles.logo} source={require('../../../assets/splash.png')}/>
      </Pressable>
    </View>
  );
};

export default Header;