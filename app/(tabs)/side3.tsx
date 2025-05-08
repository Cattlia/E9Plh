import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FlexStartExample = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.item}>Short</Text>
      <Text style={styles.item}>Medium length text</Text>
      <Text style={styles.item}>A very long piece of text that spans multiple lines</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'baseline', // Aligns items to the start of the container's cross axis
  },
  item: {
    margin: 10,
  },
});

export default FlexStartExample;
