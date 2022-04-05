import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import ColorCounter from '../components/ColorCounter';

const CONST_INCREMENT = 15;

const SquareScreen = () => {
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);

  const setColor = (color, change) => {
    switch (color) {
      case 'red':
        red + change > 255 || red + change < 0 ? null : setRed(red + change);
        return;
      case 'green':
        green + change > 255 || green + change < 0
          ? null
          : setGreen(green + change);
        return;
      case 'blue':
        blue + change > 255 || blue + change < 0
          ? null
          : setBlue(blue + change);
        return;
    }
  };

  return (
    <View>
      <ColorCounter
        color="Red"
        onIncrease={() => setColor('red', CONST_INCREMENT)}
        onDecrease={() => setColor('red', -CONST_INCREMENT)}
      />
      <ColorCounter
        color="Blue"
        onIncrease={() => setColor('blue', +CONST_INCREMENT)}
        onDecrease={() => setColor('blue', -CONST_INCREMENT)}
      />
      <ColorCounter
        color="Green"
        onIncrease={() => setColor('green', +CONST_INCREMENT)}
        onDecrease={() => setColor('green', -CONST_INCREMENT)}
      />
      <View
        style={{
          height: 150,
          width: 150,
          backgroundColor: `rgb(${red}, ${green}, ${blue})`,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SquareScreen;
