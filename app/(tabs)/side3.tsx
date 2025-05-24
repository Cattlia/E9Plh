import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

export default function Page3() {
  const db = useSQLiteContext();
  const [tableNames, setTableNames] = useState<string[]>([]);

  // Get table names
  useEffect(() => {
    async function fetchTables() {
      const result = await db.getAllAsync<{ name: string }>(
        "SELECT name FROM sqlite_master WHERE type='table';"
      );
      setTableNames(result.map((row) => row.name));
    }

    fetchTables();
  }, []);

  // Log row counts
  useEffect(() => {
    async function logTableCounts() {
      const targetTables = ['husholdningsutgifter', 'individutgifter', 'barnehagekostnader', 'spedbarnsutstyr'];

      for (const table of targetTables) {
        try {
          const [{ count }] = await db.getAllAsync<{ count: number }>(
            `SELECT COUNT(*) as count FROM ${table};`
          );
          console.log(`${table}: ${count} rows`);
        } catch (e) {
          console.warn(`Could not count rows for ${table}:`, e);
        }
      }
    }

    logTableCounts();
  }, [db]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Tables in Database</Text>
      {tableNames.map((tableName, index) => (
        <Text key={index} style={styles.tableName}>
          {tableName}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  tableName: {
    fontSize: 16,
    marginBottom: 8,
  },
});
