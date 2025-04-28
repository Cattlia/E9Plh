import { StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

import { UtgiftskategorierSectionList } from '@/components/Utgiftskategorier';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Cat />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />

      <UtgiftskategorierSectionList />

    </View>
  );
}

export const Cat = () => {
  return (
    <View>
      <Text>Hello,jalla</Text>
      <TextInput
      style={{
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
      }}
      defaultValue="Name you!"
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
