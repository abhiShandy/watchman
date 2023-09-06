import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { getZpubsFromDB } from "../../lib/db";
import { router } from "expo-router";

type Zpub = {
  id: string;
  zpub: string;
};

export default function Cosigners() {
  const [zpubs, setZpubs] = useState<Zpub[]>();

  useEffect(() => {
    const getZpubs = async () => {
      const zpubs = await getZpubsFromDB();
      setZpubs(zpubs as Zpub[]);
    };

    getZpubs();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Cosigners</Text>
      {zpubs &&
        zpubs.map((zpub) => (
          <Text key={zpub.id}>{zpub.id + ". " + zpub.zpub}</Text>
        ))}
      <Button title={"Scan more"} onPress={() => router.push("/scan")} />
      <Button title={"Addresses"} onPress={() => router.push("/address")} />
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
