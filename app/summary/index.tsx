import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, Text, Pressable, Button } from "react-native";

export default function Summary() {
  return (
    <View
      style={{
        padding: 28,
      }}
    >
      <Text style={{ textAlign: "center", marginBottom: 28 }}>Balance</Text>
      <Button
        title="Address"
        onPress={() => {
          router.push("/address");
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}
