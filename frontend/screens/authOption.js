import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo

const AuthOption = ({ icon, label }) => (
  <View style={styles.signContainer}>
    <Image source={icon} style={styles.signlogo} />
    <Text style={styles.inputLabels}>{label}</Text>
  </View>
);

export default AuthOption;

const styles = StyleSheet.create({
  signContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 13,
    alignItems: "center",
    borderWidth: 2,
    borderColor: '#184E77',
    borderRadius: 20,
    marginTop: 17
  },
  inputLabels: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    color: '#242424',
    marginRight: 80,
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 20
  },
  signlogo: {
    width: 20,
    height: 20
  }
});
