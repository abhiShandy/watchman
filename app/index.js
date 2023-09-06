import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as SQLite from "expo-sqlite";
import * as bitcoin from "bitcoinjs-lib";

const db = SQLite.openDatabase("db.db");

export function Scanner({ handleScanned }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    handleScanned(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

export default function App() {
  const [coSigners, setCoSigners] = useState([]);
  const [showScanner, setShowScanner] = useState(false);
  return (
    <View style={styles.container}>
      <Text>List of Co-signers</Text>

      {coSigners.map((coSigner, index) => (
        <Text key={index}>{index + 1 + "." + coSigner}</Text>
      ))}

      <Button title="Add Co-signer" onPress={() => setShowScanner(true)} />

      {showScanner && (
        <>
          <Scanner
            handleScanned={(data) => {
              setCoSigners([...coSigners, data]);
              setShowScanner(false);
            }}
          />
          <Button title="Cancel" onPress={() => setShowScanner(false)} />
        </>
      )}

      <Button
        title="Generate Address"
        onPress={() => {
          const pubkeys = [
            "026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01",
            "02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9",
          ].map((hex) => Buffer.from(hex, "hex"));
          const { address } = bitcoin.payments.p2sh({
            redeem: bitcoin.payments.p2wsh({
              redeem: bitcoin.payments.p2ms({ m: 2, pubkeys }),
            }),
          });
          console.log("Bitcoin Address:", address);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
