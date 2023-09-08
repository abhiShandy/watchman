import React, { useEffect } from "react";
import { Text, View, Pressable } from "react-native";
import { router } from "expo-router";
import { init } from "../lib/db";

export default function App() {
  useEffect(() => {
    init();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Pressable
        onPress={() => router.push("/setup")}
        style={{
          borderWidth: 1,
          borderColor: "black",
          padding: 12,
        }}
      >
        <Text>Setup Wallet</Text>
      </Pressable>
    </View>
  );
}
