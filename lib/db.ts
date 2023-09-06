import * as sqlite from "expo-sqlite";

const db = sqlite.openDatabase("db.db");

// Create table
export const init = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS zpubs (id INTEGER PRIMARY KEY AUTOINCREMENT, zpub TEXT NOT NULL UNIQUE)",
      [],
      () => {
        console.log("zpubs table created");
      },
      (_, err) => {
        console.error(err);
        return false;
      }
    );
  });
};

export const saveZpubToDB = (zpub: string) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO zpubs (zpub) VALUES (?)",
      [zpub],
      (_, { rows }) => {
        console.log(`inserted ${rows.length} zpubs`);
        console.log("zpub saved to db");
      },
      (_, err) => {
        console.error(err);
        return false;
      }
    );
  });
};

export const getZpubsFromDB = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM zpubs",
        [],
        (_, { rows }) => {
          console.log(`fetched ${rows.length} zpubs`);
          resolve(rows._array);
        },
        (_, err) => {
          console.error(err);
          reject(err);
          return false;
        }
      );
    });
  });
};
