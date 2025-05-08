import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BaselineExample = () => {
  return (
    <View style={{
        flexDirection: 'column',
        alignItems: 'flex-start',
        height: 100,
        backgroundColor: '#f0f0f0',
      }}>
        <Text style={{ fontSize: 20 }}>Big</Text>
        <Text style={{ fontSize: 12 }}>Small</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'baseline', // Aligns items along their text baselines
  },
  item: {
    margin: 10,
  },
});

export default BaselineExample;
