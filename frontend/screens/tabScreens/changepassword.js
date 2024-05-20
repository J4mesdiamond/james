import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';

const ChangePassword = ({ navigation }) => {
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleChangePassword = async () => {
    try {
      const response = await axios.post('http://172.20.10.11:4000/changePassword', {
        email: email.trim(),
        currentPassword,
        newPassword,
      });
      if (response.status === 200) {
        Alert.alert('Success', 'Password changed successfully');
        navigation.navigate('home')
      } else {
        Alert.alert('Error', 'Failed to change password');
      }
    } catch (error) {
      console.error('Change Password Error:', error);
      Alert.alert('Error', 'Failed to change password');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        
        <Text style={styles.headerText}>Change Password</Text>
        <View style={{ width: 24 }} />  
      </View>

      <Text style={styles.label}>Email</Text>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="email-outline" size={24} color="black" />
        <TextInput 
          style={styles.input} 
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={text => setEmail(text)} // Update email state
        />
      </View>
      
      <Text style={styles.label}>Current Password</Text>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="lock-outline" size={24} color="black" />
          <TextInput 
            style={styles.input} 
            placeholder="Password"
            secureTextEntry={!currentPasswordVisible}
            onChangeText={text => setCurrentPassword(text)} // Update current password state
          />
        <TouchableOpacity onPress={() => setCurrentPasswordVisible(!currentPasswordVisible)}>
          <MaterialIcons name={currentPasswordVisible ? "visibility" : "visibility-off"} size={24} color="black" />
        </TouchableOpacity>
      </View>

      
      <Text style={styles.label1}>New Password</Text>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="lock-outline" size={24} color="black" />
          <TextInput 
            style={styles.input} 
            placeholder="New Password"
            secureTextEntry={!newPasswordVisible}
            onChangeText={text => setNewPassword(text)} // Update new password state
          />
        <TouchableOpacity onPress={() => setNewPasswordVisible(!newPasswordVisible)}>
          <MaterialIcons name={newPasswordVisible ? "visibility" : "visibility-off"} size={24} color="black" />
        </TouchableOpacity>
      </View>

      
      <TouchableOpacity style={styles.saveButton} onPress={handleChangePassword}>
        <Text style={styles.saveButtonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 70,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    top: 35,
    left: 0,
    right: 0,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white',
  },
  backButton: {
    marginLeft: 10,
    color: '#184E77',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    color: '#184E77',
  },
  label: {
    alignSelf: 'flex-start',
    width: '100%',
    marginLeft: 20,
    marginBottom: 5,
    marginTop: 20,
    color: '#00000058',
  },
  label1: {
    alignSelf: 'flex-start',
    width: '100%',
    marginLeft: 20,
    marginBottom: 5,
    marginTop: 1,
    color: '#00000058',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    padding: 15,
    borderWidth: 1.6,
    borderColor: '#184E77', 
    borderRadius: 25,  
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,

  },
  saveButton: {
    backgroundColor: '#184E77', 
    borderRadius: 25,
    width: '90%',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  saveButtonText: {
    color: 'white', 
    fontSize: 16,
    fontWeight: '500',
  }
});

export default ChangePassword;
