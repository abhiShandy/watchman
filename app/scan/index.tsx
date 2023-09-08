import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { router } from "expo-router";
import { saveZpubToDB } from "../../lib/db";

export default function Scan() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    alert(`Scanned: ${data}`);
    saveZpubToDB(data);
    router.push("/setup");
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", marginBottom: 16 }}>
        Scan your Zpub
      </Text>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.scanner}
      />
      <Pressable
        onPress={() => router.back()}
        style={{
          padding: 12,
          alignItems: "center",
        }}
      >
        <Text>Go Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  scanner: {
    height: 300,
    width: "100%",
  },
});
