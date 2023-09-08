import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import { getZpubsFromDB } from "../../lib/db";
import { router } from "expo-router";
import { shortenZpub } from "../../lib/bitcoin";

type Zpub = {
  id: string;
  zpub: string;
};

const ScanButton = () => (
  <Pressable onPress={() => router.push("/scan")}>
    <Text>Scan QR code</Text>
  </Pressable>
);

const ZpubRow = ({ zpubs, index }: { zpubs: Zpub[]; index: number }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "black",
        padding: 12,
        marginVertical: 8,
      }}
    >
      <Text
        style={{
          margin: 4,
        }}
      >
        {index + 1}.
      </Text>
      {(zpubs && zpubs[index] && (
        <Text>{shortenZpub(zpubs[index].zpub)}</Text>
      )) || <ScanButton />}
    </View>
  );
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
    <View style={{ flex: 1, justifyContent: "flex-start" }}>
      <Text style={{ marginTop: 10, textAlign: "center" }}>
        Setup 2-of-3 multisig
      </Text>
      <View
        style={{
          margin: 28,
        }}
      >
        <Text>Cosigners</Text>
        <ZpubRow zpubs={zpubs} index={0} />
        {zpubs && zpubs.length > 0 && <ZpubRow zpubs={zpubs} index={1} />}
        {zpubs && zpubs.length > 1 && <ZpubRow zpubs={zpubs} index={2} />}
      </View>
    </View>
  );
}
