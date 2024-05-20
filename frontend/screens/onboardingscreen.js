import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';


const OnboardingScreen = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('Notification'); // Navigate to the Notification screen when Get Started button is pressed
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/img_01.png')} style={styles.logo} />
      </View>
      <Text style={styles.headerText}>Manage your{"\n"}Tasks</Text>
      <Text style={styles.subHeaderText}>Tasks Management made easy</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Get Started"
          color="#FFFFFF" // Note: This color prop won't change the button's background color in native development.
          onPress={() => navigation.navigate('Login')} // Make sure 'Login' matches the screen name defined in your stack navigator
        />
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 239, 
    height: 239, 
    marginTop: 3,
    marginBottom: 6,
    resizeMode: "contain",
  },
  headerText: {
    fontSize: 45,
    fontWeight: '900',
    textAlign: 'left',
    marginTop: -40,
    marginBottom: -1,
    marginLeft: 1,
    marginRight: 35,
  },
  subHeaderText: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 210,
    marginLeft: 1,
    marginRight: 49,
  },
  buttonContainer: {
    width: '100%', 
    position: 'absolute',
    bottom: 10, 
    alignItems: 'center',
    backgroundColor: '#184E77',
    padding: 10,
    borderRadius: 25,
    margin: 10,
  },
});
