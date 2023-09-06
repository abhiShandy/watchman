import React, { useEffect } from "react";
import { View, StyleSheet, Button } from "react-native";
import { Link, router } from "expo-router";
import { init } from "../lib/db";

export default function App() {
  useEffect(() => {
    init();
  }, []);

  return (
    <View style={styles.container}>
      <Link href="/scan" asChild>
        <Button title="Scan" />
      </Link>
      <Button title="Address" onPress={() => router.push("/address")} />
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
