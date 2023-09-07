import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { getZpubsFromDB } from "../../lib/db";
import * as bitcoin from "bitcoinjs-lib";
import * as ecc from "@bitcoin-js/tiny-secp256k1-asmjs";
import BIP32 from "bip32";
const bip32 = BIP32(ecc);

export default function Address() {
  const [address, setAddress] = useState<string>();
  useEffect(() => {
    const calculateFirstAddress = async () => {
      const zpubs = (await getZpubsFromDB()) as { zpub: string }[];

      if (!zpubs.length) {
        return;
      }
      const network = bitcoin.networks.bitcoin;
    };

    calculateFirstAddress();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Address</Text>
      <Text>{address}</Text>
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
