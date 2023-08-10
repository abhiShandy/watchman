import { StatusBar } from "expo-status-bar";
import { Pressable, Text, SafeAreaView, FlatList } from "react-native";

export default function App() {
  const openQRCodeScanner = () => {
    console.log("openQRCodeScanner");
  };

  return (
    <SafeAreaView
      style={{
        alignItems: "center",
        marginHorizontal: 32,
      }}
    >
      <Pressable
        onPress={openQRCodeScanner}
        style={{
          borderWidth: 2,
          borderColor: "black",
          padding: 4,
          width: "100%",
          height: 48,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 4,
        }}
      >
        <Text
          style={{
            fontWeight: 600,
          }}
        >
          Import Wallet
        </Text>
      </Pressable>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
