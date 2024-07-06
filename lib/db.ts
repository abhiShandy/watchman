import * as sqlite from "expo-sqlite";

const db = sqlite.openDatabaseSync("db.db");

// Create table
export const init = () => {
  db.execSync("CREATE TABLE IF NOT EXISTS zpubs (id INTEGER PRIMARY KEY AUTOINCREMENT, zpub TEXT NOT NULL UNIQUE)");
  // Create address table
  db.execSync("CREATE TABLE IF NOT EXISTS addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, address TEXT NOT NULL UNIQUE)");
};

export const saveZpubToDB = (zpub: string) => {
  db.runSync("INSERT INTO zpubs (zpub) VALUES (?)", [zpub]);
};

export const getZpubsFromDB = async () => {
  return await db.getAllAsync("SELECT * FROM zpubs");
};

export const bulkInsertAddresses = (addresses: string[]) => {
  for (const address of addresses) {
    db.runSync("INSERT INTO addresses (address) VALUES (?)", [address]);
  }
};

export const listAddresses = async () => {
  return await db.getAllAsync("SELECT * FROM addresses");
};
