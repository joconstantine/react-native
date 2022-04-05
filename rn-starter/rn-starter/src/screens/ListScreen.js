import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const ListScreen = () => {
  const friends = [
    { name: 'Friend #1', age: 32 },
    { name: 'Friend #2', age: 31 },
    { name: 'Friend #3', age: 33 },
    { name: 'Friend #4', age: 34 },
    { name: 'Friend #5', age: 37 },
    { name: 'Friend #6', age: 38 },
    { name: 'Friend #7', age: 34 },
    { name: 'Friend #8', age: 20 },
    { name: 'Friend #9', age: 30 },
  ];

  return (
    <FlatList
      data={friends}
      renderItem={({ item }) => {
        return (
          <Text style={styles.textStyle}>
            {item.name} - Age {item.age}
          </Text>
        );
      }}
      keyExtractor={(friend) => friend.name}
    />
  );
};

const styles = StyleSheet.create({
  textStyle: {
    marginVertical: 20,
  },
});

export default ListScreen;
