import { StatusBar } from "expo-status-bar";
import { Pressable, Text, SafeAreaView, FlatList } from "react-native";

const Wallet = ({ name, balance, color }) => (
  <Pressable
    style={{
      backgroundColor: color,
      borderWidth: 2,
      borderColor: "black",
      padding: 4,
      width: "100%",
      height: 48,
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: 4,
      marginBottom: 8,
      flexDirection: "row",
      paddingHorizontal: 8,
    }}
  >
    <Text
      style={{
        fontWeight: 600,
      }}
    >
      {name}
    </Text>
    <Text>{balance}</Text>
  </Pressable>
);

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
      <FlatList
        style={{
          width: "100%",
        }}
        data={[
          {
            name: "Wallet 1",
            balance: "1 BTC",
            color: "#eee",
          },
          {
            name: "Wallet 2",
            balance: "10 BTC",
            color: "#ddd",
          },
        ]}
        renderItem={({ item }) => <Wallet {...item} />}
      />
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
