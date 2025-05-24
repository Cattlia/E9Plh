
import { SQLiteDatabase } from "expo-sqlite";

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const result = await db.getFirstAsync<{ user_version: number } | null>(
    'PRAGMA user_version'
  );

  const userVersion = result?.user_version ?? 0;

  if (userVersion === 0) {
    const statements = [
      `CREATE TABLE IF NOT EXISTS individutgifter (
        id INTEGER PRIMARY KEY,
        kategori TEXT,
        alder INTEGER,
        kjønn TEXT,
        spesialgruppe TEXT,
        beløp REAL
      );`,

       `INSERT INTO individutgifter (kategori, alder, kjønn, spesialgruppe, beløp) VALUES
        ${[...Array(100).keys()].map(age => {
          let entries: string[] = [];
          if (age === 0) entries.push(`('Personlig pleie', ${age}, NULL, NULL, 490)`);
          else if (age === 1 || age === 2) entries.push(`('Personlig pleie', ${age}, NULL, NULL, 590)`);
          else if (age === 3) entries.push(`('Personlig pleie', ${age}, NULL, NULL, 350)`);
          else if (age === 4 || age === 5) entries.push(`('Personlig pleie', ${age}, NULL, NULL, 220)`);
          else if (age >= 6 && age <= 9) entries.push(`('Personlig pleie', ${age}, NULL, NULL, 250)`);
          else if (age >= 10 && age <= 13) {
            entries.push(`('Personlig pleie', ${age}, 'kvinne', NULL, 360)`);
            entries.push(`('Personlig pleie', ${age}, 'mann', NULL, 480)`);
          } else if (age >= 14 && age <= 17) {
            entries.push(`('Personlig pleie', ${age}, 'kvinne', NULL, 590)`);
            entries.push(`('Personlig pleie', ${age}, 'mann', NULL, 470)`);
          } else if (age >= 18 && age <= 50) {
            entries.push(`('Personlig pleie', ${age}, 'kvinne', NULL, 960)`);
            entries.push(`('Personlig pleie', ${age}, 'mann', NULL, 770)`);
          } else if (age >= 51 && age <= 99) {
            entries.push(`('Personlig pleie', ${age}, 'kvinne', NULL, 920)`);
            entries.push(`('Personlig pleie', ${age}, 'mann', NULL, 770)`);
          }
          return entries;
        }).flat().join(',\n        ')};`,

     `PRAGMA user_version = 1;`

    ];

    try {
      await db.execAsync('BEGIN TRANSACTION;');
      for (const stmt of statements) {
        await db.execAsync(stmt);
      }

      const lekOgMediebrukData = [
        { from: 0, to: 0, beløp: 150 },
        { from: 1, to: 2, beløp: 370 },
        { from: 3, to: 5, beløp: 720 },
        { from: 6, to: 9, beløp: 1110 },
        { from: 10, to: 13, beløp: 1410 },
        { from: 14, to: 17, beløp: 1540 },
        { from: 18, to: 99, beløp: 1030 },
      ];

      for (const { from, to, beløp } of lekOgMediebrukData) {
        for (let alder = from; alder <= to; alder++) {
          await db.runAsync(
            `INSERT INTO individutgifter (kategori, alder, kjønn, spesialgruppe, beløp)
             VALUES (?, ?, NULL, NULL, ?);`,
            ['Lek og mediebruk', alder, beløp]
          );
        }
      }

      

      await db.execAsync('COMMIT;');
    } catch (error) {
      await db.execAsync('ROLLBACK;');
      throw error;
    }
  }
}
