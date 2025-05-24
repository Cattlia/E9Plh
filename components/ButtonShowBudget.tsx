
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { useRouter, Router } from 'expo-router';
import { ROUTES, Destination, RoutePath } from 'src/routes';

type Props = {
    destination: keyof typeof ROUTES;
    title?: string;
};

export const ButtonShowBudget = ({ destination, title = "Vis budsjett"}: Props) => {
  const router = useRouter();
  const onPress = () => {
    router.push(ROUTES[destination] as RoutePath);
  };


  return (
    <View style={styles.container}>      
      <View style={styles.buttonContainer}>
        <Button onPress={onPress} title={title} color="rgb(20, 110, 170)" />
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

