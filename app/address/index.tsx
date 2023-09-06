import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { getZpubsFromDB } from "../../lib/db";

export default function Address() {
  const [address, setAddress] = useState<string>();
  useEffect(() => {
    const calculateFirstAddress = async () => {
      const zpubs = await getZpubsFromDB();
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
