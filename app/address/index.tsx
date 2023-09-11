import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import {
  bulkInsertAddresses,
  getZpubsFromDB,
  listAddresses,
} from "../../lib/db";
import { generateElectrumAddressList, shortenBase58 } from "../../lib/bitcoin";
import { StatusBar } from "expo-status-bar";

export default function Address() {
  const [addresses, setAddresses] = useState<string[]>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getAddresses = async () => {
      const zpubs = (await getZpubsFromDB()) as { zpub: string }[];

      if (!zpubs.length) {
        return;
      }

      const addresses = (await listAddresses()) as
        | { address: string }[]
        | undefined;

      if (addresses.length) {
        setAddresses(addresses.map((address) => address.address));
        setIsLoading(false);
        return;
      } else {
        const addressList = generateElectrumAddressList(
          zpubs.map((zpub) => zpub.zpub),
        );
        bulkInsertAddresses(addressList);
        setAddresses(addressList);
        setIsLoading(false);
      }
    };

    getAddresses();
  }, []);
  return (
    <View style={{ marginHorizontal: 28 }}>
      <Text style={{ textAlign: "center" }}>Address List</Text>
      {isLoading && <ActivityIndicator />}
      {addresses?.map((address, index) => (
        <Text style={{ padding: 4 }} key={index}>
          {index + 1 + "." + shortenBase58(address)}
        </Text>
      ))}
      <StatusBar style="auto" />
    </View>
  );
}
