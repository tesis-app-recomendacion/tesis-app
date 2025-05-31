import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabaseSync("recombot.db");

export const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS docente (
        uid TEXT PRIMARY KEY NOT NULL,
        nivel_educativo TEXT,
        area TEXT,
        dispositivo TEXT,
        conectividad TEXT,
        experiencia TEXT,
        estrategias TEXT,
        disponibilidad TEXT,
        estado_equipo TEXT
      );
    `);

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS simuladores (
        id TEXT PRIMARY KEY NOT NULL,
        nombre TEXT,
        lenguaje TEXT,
        usabilidad TEXT,
        instalacion TEXT,
        licencia TEXT,
        areas TEXT,
        personalizacion TEXT,
        compatibilidad TEXT,
        nivel_educativo TEXT,
        estrategias TEXT,
        colaborativo TEXT
      );
    `);

    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS favoritos (
        id TEXT PRIMARY KEY NOT NULL
      );
    `);
  });
};

export { db };

