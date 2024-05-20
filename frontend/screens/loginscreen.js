import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, Image,
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://172.20.10.11:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Login Successful, Token:', data.token, 'Full Name:', data.fullName);
        await AsyncStorage.setItem('userName', data.fullName);
        navigation.navigate('Homepage');
      } else {
        console.log('Login Failed:', data.message || 'Check your credentials');
        alert(data.message || 'Login failed, please try again!');
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('Login Error:', error.message);
    }
  };
  


  const handlePressOutside = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handlePressOutside}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.containers}>
          <Image source={require('../assets/logo2.png')} style={styles.logo} />
          <Text style={styles.titleText}>Login</Text>
          <Text style={styles.subtitleText}>Please login to continue</Text>

          <Text style={styles.inputLabel}>Email</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
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
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              <Ionicons name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} size={20} style={styles.inputIcon} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleLogin} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signupText}>
                Don't have an account? <Text style={styles.signupLink}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Notification')} style={styles.testNotificationButton}>
              <Text style={styles.testNotificationText}>Go to Notification Test</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  containers: {
    flex: 1,
    justifyContent: 'space-between',
  },
  logo: {
    width: 120,
    height: 100,
    alignSelf: 'center',
    marginTop: 100,
    marginBottom: 25,
    resizeMode: 'contain',
  },
  titleText: {
    fontSize: 45,
    fontWeight: '900',
    textAlign: 'left',
    marginTop: -40,
    marginBottom: -1,
    marginLeft: 1,
    marginRight: 195,
  },
  subtitleText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 15,
    marginBottom: 50,
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
  buttonContainer: {
    width: '100%',
    marginTop: 50,
    alignItems: 'center',
    backgroundColor: '#184E77',
    padding: 10,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500"
  },
  signupContainer: {
    alignItems: 'center',
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
  testNotificationButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  testNotificationText: {
    color: '#184E77',
    fontWeight: 'bold',
  }
});

export default LoginScreen;
