import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Switch,
  Button as RNButton,
} from 'react-native';

import {
  Menu,
  Button as PaperButton,
  Provider as PaperProvider,
} from 'react-native-paper';

import { ButtonShowBudget } from '@/components/ButtonShowBudget';

export default function OverviewForm() {
  const [age, setAge] = useState('25');
  const [ageMenuVisible, setAgeMenuVisible] = useState(false);
  const [sex, setSex] = useState<'mann' | 'kvinne'>('mann');
  const [isStudent, setIsStudent] = useState(false);
  const [hasCar, setHasCar] = useState(false);
  const [carType, setCarType] = useState<'bensin' | 'el'>('bensin');
  const [familyCount, setFamilyCount] = useState('0');
  const [familyMembers, setFamilyMembers] = useState<
    { age: string; sex: 'mann' | 'kvinne' }[]
  >([]);

  const handleFamilyCountChange = (value: string) => {
    setFamilyCount(value);
    const count = parseInt(value, 10);
    setFamilyMembers(
      Array.from({ length: count }, () => ({
        age: '',
        sex: 'mann',
      }))
    );
  };

  const updateFamilyMember = (
    index: number,
    key: 'age' | 'sex',
    value: string
  ) => {
    const updated = [...familyMembers];
    updated[index][key] = value as 'mann' | 'kvinne';
    setFamilyMembers(updated);
  };

  const handleSubmit = () => {
    console.log({
      age,
      sex,
      isStudent,
      hasCar,
      carType: hasCar ? carType : null,
      familyMembers,
    });
  };

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Din info</Text>

        <Text>Alder:</Text>
        <PaperButton onPress={() => setAgeMenuVisible(true)}>{age} år</PaperButton>
        <Menu
          visible={ageMenuVisible}
          onDismiss={() => setAgeMenuVisible(false)}
          anchor={<Text></Text>}
        >
          {Array.from({ length: 101 }, (_, i) => (
            <Menu.Item
              key={i}
              onPress={() => {
                setAge(i.toString());
                setAgeMenuVisible(false);
              }}
              title={`${i}`}
            />
          ))}
        </Menu>

        <Text>Kjønn:</Text>
        <View style={styles.row}>
          <RNButton
            title="Mann"
            onPress={() => setSex('mann')}
            color={sex === 'mann' ? 'blue' : 'gray'}
          />
          <RNButton
            title="Kvinne"
            onPress={() => setSex('kvinne')}
            color={sex === 'kvinne' ? 'blue' : 'gray'}
          />
        </View>

        <View style={styles.switchRow}>
          <Text>Er student?</Text>
          <Switch value={isStudent} onValueChange={setIsStudent} />
        </View>

        <View style={styles.switchRow}>
          <Text>Har bil?</Text>
          <Switch value={hasCar} onValueChange={setHasCar} />
        </View>

        {hasCar && (
          <View style={styles.row}>
            <RNButton
              title="Bensin"
              onPress={() => setCarType('bensin')}
              color={carType === 'bensin' ? 'blue' : 'gray'}
            />
            <RNButton
              title="El"
              onPress={() => setCarType('el')}
              color={carType === 'el' ? 'blue' : 'gray'}
            />
          </View>
        )}

        <Text style={styles.header}>Familie</Text>
        <Text>Antall familiemedlemmer:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={familyCount}
          onChangeText={handleFamilyCountChange}
        />

        {familyMembers.map((member, index) => (
          <View key={index} style={styles.familyBlock}>
            <Text>Person {index + 1} alder:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={member.age}
              onChangeText={(val: string) =>
                updateFamilyMember(index, 'age', val)
              }
            />
            <Text>Kjønn:</Text>
            <View style={styles.row}>
              <RNButton
                title="Mann"
                onPress={() => updateFamilyMember(index, 'sex', 'mann')}
                color={member.sex === 'mann' ? 'blue' : 'gray'}
              />
              <RNButton
                title="Kvinne"
                onPress={() => updateFamilyMember(index, 'sex', 'kvinne')}
                color={member.sex === 'kvinne' ? 'blue' : 'gray'}
              />
            </View>
          </View>
        ))}

        <RNButton title="Beregn budsjett" onPress={handleSubmit} />

        <View style={{ marginTop: 20 }}>
          <ButtonShowBudget title="Hjem" destination="index" />
        </View>
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 8,
    marginVertical: 4,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 8,
  },
  familyBlock: {
    marginBottom: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
