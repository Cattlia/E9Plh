import { StyleSheet, ScrollView, TextInput } from 'react-native';
import { Text, View } from '@/components/Themed';
import { ButtonShowBudget } from '@/components/ButtonShowBudget'
import { useRouter } from 'expo-router';


export default function Budsjettappen() {
    return (
    
    <View style={styles.container}>      
      <Text style={styles.title}>Budsjettappen</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
     
      <ButtonShowBudget title="Vis budsjett" destination="overview" />
      <ButtonShowBudget title="sifo" destination="sifoflatlist" />
      
    </View>
    
  );
}

//sqlite/api start






//sqlite/api slutt




export const VisBudsjett = () => {
  return (
    <View>
      <Text>Budsjettappen</Text>
      <TextInput
      style={{
        height: 30,
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
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
