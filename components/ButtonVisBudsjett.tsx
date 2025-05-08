
import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import { NavigationProp } from '@react-navigation/native';

type Props = {
    navigation: NavigationProp<any>;
};

export const ButtonVisBudsjett = ({ navigation }: Props) => {
  const onPress = () => {
   navigation.navigate('oversikt') ;
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.buttonContainer}>
        <Button onPress={onPress} title="Vis budsjett" color="rgb(20, 110, 170)" />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20,
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

