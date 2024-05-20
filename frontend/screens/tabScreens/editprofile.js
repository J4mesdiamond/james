import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const EditProfile = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [tagName, setTagName] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = 'dummy_token'; // Update this with your actual token retrieval logic

        const response = await fetch('http://172.20.10.11:4000/getUserProfile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const userData = await response.json();
        if (response.ok) {
          setFullName(userData.fullName || '');
          setEmail(userData.email || '');
          setTagName(userData.tagName || '');
        } else {
          if (response.status === 404 && userData.message === 'User profile not found') {
            // Handle the case where the user profile is not found
            console.log('User profile not found');
          } else {
            throw new Error(userData.message || 'Failed to fetch user information');
          }
        }
      } catch (error) {
        console.error('Error:', error);
        // Display alert only if the error is not "User profile not found"
        if (error.message !== 'User profile not found') {
          Alert.alert("Error", error.message);
        }
      } finally {
        setIsLoading(false); // Set isLoading to false regardless of success or failure
      }
    };

    fetchUserInfo();
  }, []);

  const handleSaveProfile = async () => {
    try {
      const response = await fetch('http://172.20.10.11:4000/updateProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          tagName,
        }),
      });
      const json = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Profile updated successfully");
      } else {
        throw new Error(json.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert("Error", error.message);
    }
  };

  const handlePressOutside = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handlePressOutside}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#184E77" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <View style={{ width: 24 }} />
        </View>

        <Image source={require('../assets/prof.png')} style={styles.profileIcon} />

        <Text style={styles.label}>Full name</Text>
        <TextInput 
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#888"
          selectionColor="#007BFF"
          value={fullName}
          onChangeText={setFullName}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput 
          style={styles.input}
          placeholder="user@email.com"
          placeholderTextColor="#888"
          selectionColor="#007BFF"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Tag name</Text>
        <TextInput 
          style={styles.input}
          placeholder="Tag name"
          placeholderTextColor="#888"
          selectionColor="#007BFF"
          value={tagName}
          onChangeText={setTagName}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
  headerTitle: {
    fontSize: 29,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    color: '#184E77',
  },
  profileIcon: {
    width: 100,
    height: 100,
    marginBottom: 15,
    marginTop: 50,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 20,
    fontSize: 14,
    fontWeight: '500',
    color: '#00000058',
    marginBottom: 15
  },
  input: {
    height: 50,
    width: '90%',
    borderWidth: 1.4,
    borderColor: '#184E77',
    padding: 10,
    marginBottom: -1,
    borderRadius: 25,
    color: 'black',
  },
  saveButton: {
    backgroundColor: '#184E77',
    borderRadius: 30,
    width: '90%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default EditProfile;
