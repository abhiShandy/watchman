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
  // Create address table
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, address TEXT NOT NULL UNIQUE)",
      [],
      () => {
        console.log("addresses table created");
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

export const bulkInsertAddresses = (addresses: string[]) => {
  for (const address of addresses) {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO addresses (address) VALUES (?)",
        [address],
        (_, { rows }) => {
          console.log(`inserted ${rows.length} addresses`);
          console.log("address saved to db");
        }
      );
    });
  }
};

export const listAddresses = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM addresses",
        [],
        (_, { rows }) => {
          console.log(`fetched ${rows.length} addresses`);
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
