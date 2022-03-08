import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { colors } from '../utils/colors';
import { RoundedButton } from '../components/RoudedButton';
import {spacing} from '../utils/sizes';

export const Focus = ({addSubject}) => {
  const [subject, setSubject] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={subject}
          label="What would you like to focus on?"
          onChangeText={(value) => setSubject(value)}
        />
        <View style={styles.button}>
          <RoundedButton title="+" size={50} onPress={() => addSubject(subject)}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 0.1,
  },
  textInput: {
    flex: 1,
    marginRight: spacing.sm,
  },
  button: {
    justifyContent: 'center',
  },
  inputContainer: {
    padding: spacing.lg,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
