import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Verification = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.content}>
        <Image 
          source={require('../assets/022.png')}
          style={styles.image}
        />
        <Text style={styles.headerText}>Verification</Text>
        <Text style={styles.descriptionText}>
          We would send a one-time code {'\n'}to your mail
        </Text>
        <Text style={styles.labelText}>Email</Text>
        <TextInput 
          style={styles.input} 
          placeholder="username@email.com"
        />
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Code')}>
          <Text style={styles.buttonText}>Get Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: 'white',
  },
  backButton: {
    marginLeft: 20,
    marginTop: 10,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150, 
    height: 200, 
    marginBottom: 20,
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#184E77',
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
    color: '#184E77',
  },
  labelText: {
    fontSize: 18,
    alignSelf: 'flex-start',
    marginLeft: 30, 
    marginBottom: 5,
    color: '#00000058',
  },
  input: {
    height: 40,
    width: '90%',
    marginTop: 1,
    borderWidth: 1.6,
    padding: 25,
    borderRadius: 25,
    borderColor: '#184E77',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#184E77',
    width: '90%',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '500',
  }
});

export default Verification;
