import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Button, TouchableWithoutFeedback, Keyboard, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SignupScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://192.168.8.101:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      });
      const data = await response.json();
      if (response.status === 201) {
        console.log('Signup Successful');
        navigation.navigate('Login');
      } else {
        console.log('Signup Failed:', data.message || 'Unknown Error');
      }
    } catch (error) {
      console.error('Signup Error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Image source={require('../assets/ploy.png')} style={styles.logos} />
          <Image source={require('../assets/logo2.png')} style={styles.logo} />
          <Text style={styles.titleText}>Create account</Text>

          <Text style={styles.inputLabel}>Full name</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Full name"
              keyboardType="default"
            />
          </View>

          <Text style={styles.inputLabel}>Email</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
            />
          </View>

          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              <Ionicons name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} size={20} style={styles.inputIcons} />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Sign Up" color="#ffffff" onPress={handleSignUp} />
          </View>

          <View style={styles.signupContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signupText}>
                Already have an account? <Text style={styles.signupLink}>Login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 100,
    alignSelf: 'center',
    marginTop: 100,
    marginBottom: 25,
    resizeMode: 'contain',
  },
  logos: {
    position: 'absolute',
    top: 10,
    right: -20,
  },
  titleText: {
    fontSize: 40,
    fontWeight: '900',
    textAlign: 'left',
    marginTop: -40,
    marginBottom: 20,
    marginLeft: 1,
  },
  inputLabel: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    color: 'grey',
  },  
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#184E77',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    marginVertical: 5,
    width: '100%',
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  inputIcons: {
    marginRight: 10,
    color: "#20BF55"
  },
  buttonContainer: {
    marginbottom: 90,
    marginTop: 50,
    backgroundColor: '#184E77',
    padding: 10,
    borderRadius: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  signupContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  signupText: {
    marginTop: 20,
    color: '#184E77',
  },
  signupLink: {
    fontWeight: 'bold',
    color: '#184E77',
  },
});
