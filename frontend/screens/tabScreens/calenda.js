import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card } from 'react-native-paper';

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const Calenda = ({ route }) => {
  const [items, setItems] = useState({});

  const { title, description, date } = route.params || {};

  useEffect(() => {
    if (title && date) {
      addTask(title, description, date);
    }
    fetchTasks();
  }, [title, description, date]);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://172.20.10.11:4000/tasks');
      if (response.ok) {
        const data = await response.json();
        const tasks = {};
        data.forEach((task) => {
          const taskDate = timeToString(new Date(task.date));
          if (!tasks[taskDate]) {
            tasks[taskDate] = [];
          }
          tasks[taskDate].push({ title: task.title, description: task.description, height: 80 });
        });
        setItems(tasks);
      } else {
        console.log('Failed to fetch tasks');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
        <Card>
          <Card.Content>
            <View
              style={{
                ...styles.taskContent,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}
            >
              <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
              <Text>{item.description}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  // Get the current date
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        loadItemsForMonth={() => {}}
        selected={currentDate}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  taskContent: {
    marginLeft: 10,
    backgroundColor: '#F6FAFD',
    padding: 15,
    borderRadius: 13,
    fontWeight: '500',
  },
});

export default Calenda;
