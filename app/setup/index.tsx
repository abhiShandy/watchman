import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import { getZpubsFromDB } from "../../lib/db";
import { router } from "expo-router";
import { shortenZpub } from "../../lib/bitcoin";

type Zpub = {
  id: string;
  zpub: string;
};

export default function Setup() {
  const [zpubs, setZpubs] = useState<Zpub[]>();

  useEffect(() => {
    const getZpubs = async () => {
      const zpubs = await getZpubsFromDB();
      setZpubs(zpubs as Zpub[]);
    };

    getZpubs();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <View>
        <Text style={{ marginTop: 10, textAlign: "center" }}>
          Setup 2-of-3 multisig
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: "black",
            padding: 12,
            margin: 16,
          }}
        >
          <Text style={{ marginHorizontal: 4 }}>Cosigners</Text>
          <Text
            style={{
              margin: 4,
            }}
          >
            1. {zpubs && zpubs[0] && shortenZpub(zpubs[0].zpub)}
          </Text>
          <Text
            style={{
              margin: 4,
            }}
          >
            2. {zpubs && zpubs[1] && shortenZpub(zpubs[1].zpub)}
          </Text>
          <Text
            style={{
              margin: 4,
            }}
          >
            3. {zpubs && zpubs[2] && shortenZpub(zpubs[2].zpub)}
          </Text>
        </View>
      </View>
      <Pressable
        style={{
          alignItems: "center",
          borderWidth: 1,
          borderColor: "black",
          margin: 16,
          padding: 12,
        }}
        onPress={() => router.push("/scan")}
      >
        <Text>Scan QR code</Text>
      </Pressable>
    </View>
  );
}
