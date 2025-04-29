import { StyleSheet, ScrollView, TextInput } from 'react-native';


import { Text, View } from '@/components/Themed';

//import { UtgiftskategorierSectionList } from '@/components/Utgiftskategorier';
import { UtgiftskategorierFlatList } from '@/components/UtgiftskategorierFlatList';


export default function TabOneScreen() {
  return (
    
    <View style={styles.container}>
      
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
     
      
      <UtgiftskategorierFlatList />

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
