import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // If using Expo

const ReferFriend = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Navigation Back Arrow and Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Invite your friends</Text>
        <View style={{ width: 24 }} />  
      </View>

      {/* Image */}
      <Image 
        source={require('../assets/004.png')}
        style={styles.image}
      />

      {/* Invitation Text */}
      <Text style={styles.invitationText}>
        Share this code with your friends to sign up
      </Text>

      {/* Referral Code Container */}
      <View style={styles.codeContainer}>
        <View style={styles.codeSection}>
          <Text style={styles.codeText}>JJDHFYRH</Text>
        </View>
        <TouchableOpacity style={styles.shareSection} onPress={() => console.log('Share Code')}>
          <Text style={styles.shareText}>Share Code</Text>
        </TouchableOpacity>
      </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: -100,
    paddingTop: 40,
  },
  backButton: {
    marginLeft: 10,
    color: '#184E77',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 23,
    fontWeight: 'bold',
    color: '#184E77',
  },
  image: {
    width: 300,  
    height: 200, 
    marginTop: 70,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  invitationText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#184E77',
  },
  codeContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
  },
  codeSection: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    borderWidth: 1,
    borderColor: '#184E77'
  },
  codeText: {
    fontSize: 16,
    color: '#184E77',
  },
  shareSection: {
    flex: 1,
    backgroundColor: '#184E77',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  shareText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  }
});


export default ReferFriend;
