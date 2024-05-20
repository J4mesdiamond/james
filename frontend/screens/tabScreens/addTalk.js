import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Animated,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import { configureNotifications, scheduleNotification } from './notify';

const AddTalk = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const animationValue = new Animated.Value(0);

  useEffect(() => {
    configureNotifications();
  }, []);

  const handleDatePicker = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleTimePicker = (event, time) => {
    setShowTimePicker(false);
    if (time) {
      setSelectedTime(time);
    }
  };

  const handleAddTalk = async () => {
    if (title.trim() && description.trim() && selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      const formattedTime = selectedTime ? selectedTime.toLocaleTimeString() : ''; // Format time if selected

      try {
        const response = await fetch('http://172.20.10.11:4000/addTask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            description,
            date: formattedDate,
            time: formattedTime,
          }),
          timeout: 5000,
        });

        if (response.ok) {
          console.log('Task added successfully');
          navigation.navigate('calenda');
          setTitle('');
          setDescription('');
          setSelectedDate(new Date()); // Reset date selection
          setSelectedTime(null); // Reset time selection

          // Schedule a notification
          const notificationDate = new Date(selectedDate);
          if (selectedTime) {
            notificationDate.setHours(selectedTime.getHours());
            notificationDate.setMinutes(selectedTime.getMinutes());
          }
          await scheduleNotification('Task Reminder', `Don't forget: ${title} - ${description}`, notificationDate);
        } else {
          console.log('Failed to add task');
        }
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const animateInput = () => {
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOutside = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handlePressOutside}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Animated.View>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter task title"
            onFocus={animateInput}
          />
          <TextInput
            style={[styles.input, { height: 100 }]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter task description"
            multiline
            onFocus={animateInput}
          />
        </Animated.View>

        <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.buttonText}>Select Date</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDatePicker}
          />
        )}

        <TouchableOpacity style={styles.timeButton} onPress={() => setShowTimePicker(true)}>
          <Text style={styles.buttonText}>Select Time</Text>
        </TouchableOpacity>

        {showTimePicker && (
          <DateTimePicker
            value={selectedTime || new Date()} // Use selected time or current time
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleTimePicker}
          />
        )}

        <TouchableOpacity style={styles.addButton} onPress={handleAddTalk}>
          <Text style={styles.buttonText}>Add Task</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  input: {
    width: 310,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  dateButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  timeButton: {
    backgroundColor: '#001EFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddTalk;
