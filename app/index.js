import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

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
    <View>
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
    <View>
      <Text>List of Co-signers</Text>

      {coSigners.map((coSigner, index) => (
        <Text key={index}>{index + 1 + "." + coSigner}</Text>
      ))}

      <Button title="Add Co-signer" onPress={() => setShowScanner(true)} />

      {showScanner && (
        <Scanner
          handleScanned={(data) => {
            setCoSigners([...coSigners, data]);
            setShowScanner(false);
          }}
        />
      )}
    </View>
  );
}
