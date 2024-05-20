import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import Material Icons for the email icon

const ResetScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/ploy.png')} style={styles.topImage} />
      <Image source={require('../assets/logo2.png')} style={styles.centerImage} />

      <Text style={styles.instructionText}>Enter your email{'\n'}address below</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.backToLoginText}>
          Remember password? <Text style={styles.linkText}>Back to login</Text>
        </Text>
      </TouchableOpacity>

      <Text style={styles.label}>Email</Text>
      <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={24} color="black" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
        />
      </View>
      <Text style={styles.helperText}>Input your registered email</Text>

      <TouchableOpacity style={styles.button} onPress={() => console.log('Reset')}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  topImage: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'flex-start',
    marginLeft: 129,
    marginBottom: 4, 
    marginTop: -5,
  },
  centerImage: {
    width: 175,
    height: 150,
    resizeMode: 'contain',
    marginTop: 20,
    marginBottom: 20,
  },
  instructionText: {
    textAlign: 'left',
    width: '100%',
    fontSize: 29,
    fontWeight: '800',
    marginBottom: 10,
  },
  backToLoginText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '3600',
    marginBottom: 20,
    marginRight: 95,

  },
  linkText: {
    color: '#184E77',
    fontWeight: 'bold',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 5,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '500',
    color: 'grey',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#184E77',
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    padding: 3,
    width: '100%',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
    color: '#184E77',
  },
  input: {
    flex: 1,
    height: 40,
  },
  helperText: {
    fontSize: 14,
    color: 'grey',
    marginBottom: 20,
    marginLeft: -80,
    marginRight: 50,
  },
  button: {
    backgroundColor: '#184E77',
    borderRadius: 20,
    width: '100%',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ResetScreen;
