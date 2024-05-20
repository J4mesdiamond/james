import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Code = ({ navigation }) => {
  const [code, setCode] = useState("");

  const handleVerify = () => {
    console.log('Verify code', code);
    // Add any additional verification logic here
    Keyboard.dismiss();  // Dismiss the keyboard on verify
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Image 
        source={require('../assets/033.png')} 
        style={styles.image}
      />
      <Text style={styles.headerText}>Verification</Text>
      <Text style={styles.descriptionText}>You will get a code via email</Text>
      
      <TextInput 
        style={styles.codeInput} 
        onChangeText={setCode}
        value={code}
        keyboardType="number-pad"
        maxLength={4}  // Set the max length to 4 digits
        placeholder="----"
        autoFocus={true}
        returnKeyType="done"  // Shows 'Done' button on iOS keyboard
        onSubmitEditing={Keyboard.dismiss}  // Dismiss the keyboard when 'Done' is pressed
      />
      
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyButtonText}>Verify</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => console.log('Resend code')}>
        <Text style={styles.resendText}>Didn't receive any code? Resend</Text>
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
    backgroundColor: 'white',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 25,
    marginTop: 90,
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#184E77',
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
    color: '#184E7780',
  },
  codeInput: {
    fontSize: 24,
    letterSpacing: 32, 
    width: 200,
    padding: 10,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  verifyButton: {
    backgroundColor: '#184E77',
    borderRadius: 20,
    width: '90%',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 19,
    fontWeight: '600',
  },
  resendText: {
    marginTop: 20,
    color: 'blue',
  }
});

export default Code;
