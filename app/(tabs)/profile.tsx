import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { UtgiftskategorierFlatList2 } from '@/components/UtgiftskategorierFlatList2';
import { ButtonBasics } from '@/components/ButtonBasics';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>Profil</Text>
        <ButtonBasics />
      </View>

      <View style={styles.separator} />

      <UtgiftskategorierFlatList2 />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // better than center for scrollable lists
    paddingTop: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#ccc', // `Themed.View` may not need lightColor/darkColor if it's custom
  },
});
