import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Dimensions } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

export default function SifoFlatlistScreen() {
  const db = useSQLiteContext();
  const [alder, setAlder] = useState<number[]>([]);
  const [mann, setMann] = useState<(number | null)[]>([]);
  const [kvinne, setKvinne] = useState<(number | null)[]>([]);

  useEffect(() => {
    const load = async () => {
      const rows = await db.getAllAsync<{ alder: number; kjønn: string | null; beløp: number }>(
        `SELECT alder, kjønn, beløp FROM individutgifter WHERE kategori = 'Personlig pleie';`
      );

      const alderList = Array.from({ length: 100 }, (_, i) => i);
      const mannList = Array(100).fill(null);
      const kvinneList = Array(100).fill(null);

      for (const row of rows) {
        if (row.kjønn === 'mann') {
          mannList[row.alder] = Math.round(row.beløp);
        } else if (row.kjønn === 'kvinne') {
          kvinneList[row.alder] = Math.round(row.beløp);
        } else {
          // Shared: apply to both
          mannList[row.alder] = Math.round(row.beløp);
          kvinneList[row.alder] = Math.round(row.beløp);
        }
      }

      setAlder(alderList);
      setMann(mannList);
      setKvinne(kvinneList);
    };

    load();
  }, []);

  const renderRow = (label: string, values: (number | null)[]) => (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      {values.map((val, i) => (
        <Text key={i} style={styles.cell}>{val ?? '-'}</Text>
      ))}
    </View>
  );

  return (
    <ScrollView horizontal style={styles.scroll}>
      <View style={styles.table}>
        <Text style={styles.title}>Personlig pleie</Text>
        {renderRow('Alder', alder)}
        {renderRow('Mann', mann)}
        {renderRow('Kvinne', kvinne)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  table: {
    padding: 12,
    minWidth: 100 * 45, // enough for 100 columns
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    width: 70,
    fontWeight: 'bold',
    paddingRight: 6,
  },
  cell: {
    width: 40,
    textAlign: 'center',
    fontSize: 12,
  },
});
