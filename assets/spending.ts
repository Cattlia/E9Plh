/*

import { SQLiteDatabase } from 'expo-sqlite';

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const result = await db.getFirstAsync<{ user_version: number } | null>(
     'PRAGMA user_version'
  );

  const userVersion = result?.user_version ?? 0;

  if (userVersion === 0) {
   const statements = [


    `CREATE TABLE husholdningsutgifter (
        id INTEGER PRIMARY KEY,
        KATEGORI TEXT,
        min_personer INTEGER,
        max_personer INTEGER,
        drivstoff TEXT,
        beløp REAL
);`,

    `CREATE TABLE individutgifter (
        id INTEGER PRIMARY KEY,
        kategori TEXT,
        alder_min INTEGER,
        alder_max INTEGER,
        kjønn TEXT, 
        spesialgruppe TEXT,
        beløp REAL
);`,

    `CREATE TABLE barnehagekostnader (
         id INTEGER PRIMARY KEY,
        inntekt_min INTEGER,
        barn_nr INTEGER,
        alder_min INTEGER,
        beløp REAL
);`,

    `CREATE TABLE spedbarnsutstyr (
        id INTEGER PRIMARY KEY,
        kategori TEXT, 
        alder_min REAL,
        alder_max REAL,
        beløp REAL
 );`,

`INSERT INTO husholdningsutgifter (id, kategori, min_personer, max_personer, drivstoff, beløp) VALUES
(1,'Andre dagligvarer',1,1,NULL,410.0),
(2,'Andre dagligvarer',2,2,NULL,470.0),
(3,'Andre dagligvarer',3,3,NULL,620.0),
(4,'Andre dagligvarer',4,4,NULL,740.0),
(5,'Andre dagligvarer',5,5,NULL,850.0),
(6,'Andre dagligvarer',6,6,NULL,960.0),
(7,'Andre dagligvarer',7,7,NULL,1040.0),
(8,'Husholdningsartikler',1,1,NULL,580.0),
(9,'Husholdningsartikler',2,2,NULL,630.0),
(10,'Husholdningsartikler',3,3,NULL,710.0),
(11,'Husholdningsartikler',4,4,NULL,910.0),
(12,'Husholdningsartikler',5,5,NULL,980.0),
(13,'Husholdningsartikler',6,6,NULL,1060.0),
(14,'Husholdningsartikler',7,7,NULL,1130.0),
(15,'Møbler',1,1,NULL,540.0),
(16,'Møbler',2,2,NULL,600.0),
(17,'Møbler',3,3,NULL,730.0),
(18,'Møbler',4,4,NULL,940.0),
(19,'Møbler',5,5,NULL,1100.0),
(20,'Møbler',6,6,NULL,1320.0),
(21,'Møbler',7,7,NULL,1500.0),
(22,'Mediebruk og fritid',1,1,NULL,2440.0),
(23,'Mediebruk og fritid',2,2,NULL,2480.0),
(24,'Mediebruk og fritid',3,3,NULL,2610.0),
(25,'Mediebruk og fritid',4,4,NULL,2700.0),
(26,'Mediebruk og fritid',5,5,NULL,2730.0),
(27,'Mediebruk og fritid',6,6,NULL,2760.0),
(28,'Mediebruk og fritid',7,7,NULL,2760.0),
(29,'Bilkostnader',1,4,'bensin',3175.0),
(30,'Bilkostnader',5,7,'bensin',4800.0),
(31,'Bilkostnader',1,4,'elbil',2108.0),
(32,'Bilkostnader',5,7,'elbil',2900.0),
(33,'Barnepass',1,1,NULL,0.0),
(34,'Barnepass',2,2,NULL,0.0),
(35,'Barnepass',3,3,NULL,0.0),
(36,'Barnepass',4,4,NULL,0.0),
(37,'Barnepass',5,5,NULL,0.0),
(38,'Barnepass',6,6,NULL,0.0),
(39,'Barnepass',7,7,NULL,0.0);
`,

`INSERT INTO individutgifter (id, kategori, alder_min, alder_max, kjønn, spesialgruppe, beløp) VALUES
(1,'Mat og drikke',1,1,NULL,NULL,1570.0),
(2,'Mat og drikke',2,5,NULL,NULL,2090.0),
(3,'Mat og drikke',6,9,NULL,NULL,2960.0),
(4,'Mat og drikke',10,13,'kvinne',NULL,3250.0),
(5,'Mat og drikke',10,13,'mann',NULL,3340.0),
(6,'Mat og drikke',14,17,'kvinne',NULL,3700.0),
(7,'Mat og drikke',14,17,'mann',NULL,4220.0),
(8,'Mat og drikke',18,30,'kvinne',NULL,4080.0),
(9,'Mat og drikke',31,60,'kvinne',NULL,3850.0),
(10,'Mat og drikke',61,74,'kvinne',NULL,3540.0),
(11,'Mat og drikke',74,NULL,'kvinne',NULL,3200.0),
(12,'Mat og drikke',18,30,'mann',NULL,4830.0),
(13,'Mat og drikke',31,60,'mann',NULL,4540.0),
(14,'Mat og drikke',61,74,'mann',NULL,3990.0),
(15,'Mat og drikke',74,NULL,'mann',NULL,3700.0),
(16,'Mat og drikke',NULL,NULL,NULL,'gravide/ammende',4540.0),
(17,'Klær og sko',0,1,NULL,NULL,450.0),
(18,'Klær og sko',1,2,NULL,NULL,540.0),
(19,'Klær og sko',2,5,NULL,NULL,690.0),
(20,'Klær og sko',6,9,NULL,NULL,750.0),
(21,'Klær og sko',10,13,'kvinne',NULL,710.0),
(22,'Klær og sko',10,13,'mann',NULL,960.0),
(23,'Klær og sko',14,17,'kvinne',NULL,980.0),
(24,'Klær og sko',14,17,'mann',NULL,820.0),
(25,'Klær og sko',18,NULL,'kvinne',NULL,1040.0),
(26,'Klær og sko',18,NULL,'mann',NULL,960.0),
(27,'Personlig pleie',0,1,NULL,NULL,490),
(28,'Personlig pleie',1,2,NULL,NULL,590),
(29,'Personlig pleie',3,5,NULL,NULL,350.0),
(30,'Personlig pleie',4,5,NULL,NULL,220.0),
(31,'Personlig pleie',6,9,NULL,NULL,250.0),
(32,'Personlig pleie',10,13,'mann',NULL,480.0),
(33,'Personlig pleie',10,13,'kvinne',NULL,360.0),
(34,'Personlig pleie',14,17,'mann',NULL,470.0),
(35,'Personlig pleie',14,17,'kvinne',NULL,590.0),
(36,'Personlig pleie',18,50,'kvinne',NULL,960.0),
(37,'Personlig pleie',18,999,'mann',NULL,770.0),
(38,'Personlig pleie',51,999,'kvinne',NULL,920.0),
(39,'Lek og mediebruk',0,1,NULL,NULL,150.0),
(40,'Lek og mediebruk',1,2,NULL,NULL,370.0),
(41,'Lek og mediebruk',3,5,NULL,NULL,720.0),
(42,'Lek og mediebruk',6,9,NULL,NULL,1110.0),
(43,'Lek og mediebruk',10,13,NULL,NULL,1410.0),
(44,'Lek og mediebruk',14,17,NULL,NULL,1540.0),
(45,'Lek og mediebruk',18,NULL,NULL,NULL,1030.0),
(46,'Reisekostnader',6,19,NULL,NULL,314.0),
(47,'Reisekostnader',20,66,NULL,NULL,897.0),
(48,'Reisekostnader',66,NULL,NULL,NULL,449.0),
(49,'Reisekostnader',20,29,NULL,'student',537.0);
`,

`INSERT INTO barnehagekostnader (id, inntekt_min, barn_nr, alder_min, beløp) VALUES
(1,615590,1,2,3000.0),
(2,550000,1,2,1666.0),
(3,615590,2,2,2100.0),
(4,550000,2,2,1166.0),
(5,615590,3,2,0.0),
(6,550000,3,2,0.0);
INSERT INTO spedbarnsutstyr (id, kategori, alder_min, alder_max, beløp) VALUES
(1,'grunnutrustning',-0.5,0,4000.0),
(2,'supplering',0,1,540.0);
`,

`PRAGMA user_version = 1;`

   ];
   
    try {
         await db.execAsync('BEGIN TRANSACTION;');

    for (const statement of statements) {
         await db.execAsync(statement);
  }

    await db.execAsync('COMMIT;');
    } catch (error) {
    await db.execAsync('ROLLBACK;');
    throw error;
    }
  }
}


*/