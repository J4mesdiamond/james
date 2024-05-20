import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as Notifications from 'expo-notifications';

const Notification = () => {
  useEffect(() => {
    configureNotifications();
  }, []);

  const handleScheduleNotification = async () => {
    await scheduleNotification('Test Title', 'This is a test notification', 5); // 5 seconds from now
  };

  return (
    <View style={styles.container}>
      <Text>Notification Screen</Text>
      <Button title="Schedule Notification" onPress={handleScheduleNotification} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Notification;

export const configureNotifications = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    if (newStatus !== 'granted') {
      alert('You need to enable notifications for this app.');
      return;
    }
  }
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
};

export const scheduleNotification = async (title, body, seconds) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: {
      seconds: seconds,
    },
  });
};
