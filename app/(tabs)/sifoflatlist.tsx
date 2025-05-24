import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

export default function SifoFlatList() {
  const db = useSQLiteContext();
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const tables = ['individutgifter', 'spedbarnsutstyr'];
      const results: any[] = [];

      for (const table of tables) {
        const rows = await db.getAllAsync(`SELECT * FROM ${table};`);
        rows.forEach((row: any) => {
          row._source = table;
          results.push(row);
        });
      }

      setItems(results);
    };

    loadData();
  }, []);

  const formatAge = (min: any, max: any) => {
    const a = min < 0 ? 'før fødsel' : min;
    return max && max !== min ? `${a}–${max}` : `${a}`;
  };

  const formatAmount = (n: any) => `${Math.round(n)} kr`;

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <Text style={styles.kategori}>{item.kategori || '(uten kategori)'}</Text>
      {'alder_min' in item && (
        <Text>Alder: {formatAge(item.alder_min, item.alder_max)}</Text>
      )}
      {'kjønn' in item && item.kjønn && <Text>Kjønn: {item.kjønn}</Text>}
      <Text>Beløp: {formatAmount(item.beløp)}</Text>
    </View>
  );

  return (
    <FlatList
      data={items}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  item: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 6,
  },
  kategori: {
    fontWeight: '600',
    fontSize: 16,
  },
});
