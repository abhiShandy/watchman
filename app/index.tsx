import React, { useEffect } from "react";
import { Text, View, Pressable } from "react-native";
import { router } from "expo-router";
import { init } from "../lib/db";
import { StatusBar } from "expo-status-bar";

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
        <Text
          style={{
            fontSize: 16,
          }}
        >
          Setup Wallet
        </Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}
