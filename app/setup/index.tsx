import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { getZpubsFromDB } from "../../lib/db";
import { router } from "expo-router";
import { shortenBase58 } from "../../lib/bitcoin";
import { StatusBar } from "expo-status-bar";

type Zpub = {
  id: string;
  zpub: string;
};

const ScanButton = () => (
  <Pressable
    onPress={() => router.push("/scan")}
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
        fontSize: 16,
      }}
    >
      Scan QR code
    </Text>
  </Pressable>
);

const ZpubRow = ({ zpubs, index }: { zpubs: Zpub[]; index: number }) => {
  if (zpubs && zpubs[index])
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
            fontSize: 16,
          }}
        >
          {index + 1}.
        </Text>
        <Text style={{ fontSize: 16 }}>{shortenBase58(zpubs[index].zpub)}</Text>
      </View>
    );
  return <ScanButton />;
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
        {zpubs && zpubs.length === 3 && (
          <Pressable
            onPress={() => router.push("/summary")}
            style={{
              borderWidth: 1,
              borderColor: "black",
              padding: 12,
              marginVertical: 8,
              backgroundColor: "lightgray",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
              }}
            >
              Done
            </Text>
          </Pressable>
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
