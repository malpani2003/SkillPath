import * as SQLite from "expo-sqlite";

let database: SQLite.SQLiteDatabase | null = null;

export async function getDatabase() {
  if (database) {
    return database;
  }
  database = await SQLite.openDatabaseAsync("skillpath.db");

  await initializeDatabase(database);
  
  return database;
}

async function initializeDatabase(
  db: SQLite.SQLiteDatabase,
) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      age INTEGER NOT NULL
    );
  `);
}

export async function resetUsersDatabase() {
  const db = await getDatabase();

  await db.execAsync(`
    DELETE FROM users;
  `);

  await db.execAsync(`
    INSERT INTO users (id, name, age)
    VALUES
      (1, 'Aarav', 24),
      (2, 'Priya', 29),
      (3, 'Rahul', 31);
  `);
}