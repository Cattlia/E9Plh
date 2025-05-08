import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FlexStartExample = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.item}>Oversikt</Text>
      <Text style={styles.item}>Oversikt</Text>
      <Text style={styles.item}>Oversikt</Text>
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
