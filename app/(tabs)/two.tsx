import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { UtgiftskategorierFlatList2 } from '@/components/UtgiftskategorierFlatList2';
import { ButtonBasics } from '@/components/ButtonBasics'


export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two <ButtonBasics /></Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
      <UtgiftskategorierFlatList2 /> 
    </View>
  );
}



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
