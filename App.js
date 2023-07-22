import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function App() {
  const openQRCodeScanner = () => {
    console.log("openQRCodeScanner");
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={openQRCodeScanner}>
        <Text>Import Electrum Multisig Wallet</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
