import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

export default function SifoScreen() {
  const db = useSQLiteContext();

  const [individData, setIndividData] = useState<any[]>([]);
  const [husholdningData, setHusholdningData] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const indivTables = ['individutgifter', 'spedbarnsutstyr'];
      const husholdTables = ['husholdningsutgifter', 'barnehagekostnader'];

      const fetchTable = async (table: string) => {
        return await db.getAllAsync(`SELECT * FROM ${table};`);
      };

      let indivResults: any[] = [];
      for (const t of indivTables) {
        const rows = await fetchTable(t);
        rows.forEach((row: any) => row._table = t); 
        indivResults.push(...rows);
      }

      let hushResults: any[] = [];
      for (const t of husholdTables) {
        const rows = await fetchTable(t);
        hushResults.push(...rows);
      }

      setIndividData(indivResults);
      setHusholdningData(hushResults);
    };

    loadData();
  }, []);

  const formatAge = (min: any, max: any) => {
    const a = min < 0 ? 'før fødsel' : min;
    return max && max !== min ? `${a}–${max}` : `${a}`;
  };

  const formatCurrency = (n: any) => {
    return `${Math.round(n)} kr`;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Individutgifter</Text>
      {individData.map((item, i) => (
        <View key={i} style={styles.block}>
          <Text style={styles.bold}>{item.kategori || item.kategori}</Text>
          {'alder_min' in item && (
            <Text>Alder: {formatAge(item.alder_min, item.alder_max)}</Text>
          )}
          {'kjønn' in item && item.kjønn && (
            <Text>Kjønn: {item.kjønn}</Text>
          )}
          <Text>Beløp: {formatCurrency(item.beløp)}</Text>
        </View>
      ))}

      <Text style={styles.header}>Husholdningsutgifter</Text>
      {husholdningData.map((item, i) => (
        <View key={i} style={styles.block}>
          {'kategori' in item && <Text style={styles.bold}>{item.kategori}</Text>}
          {'min_personer' in item && (
            <Text>Personer: {item.min_personer}–{item.max_personer}</Text>
          )}
          {'drivstoff' in item && item.drivstoff && (
            <Text>Drivstoff: {item.drivstoff}</Text>
          )}
          {'barn_nr' in item && <Text>Barn nr: {item.barn_nr}</Text>}
          <Text>Beløp: {formatCurrency(item.beløp)}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  block: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 6,
  },
  bold: {
    fontWeight: '600',
  },
});
