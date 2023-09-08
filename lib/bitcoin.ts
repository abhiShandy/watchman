import * as bitcoin from "bitcoinjs-lib";
import * as ecc from "@bitcoin-js/tiny-secp256k1-asmjs";
import bs58 from "bs58check";
import BIP32 from "bip32";
const bip32 = BIP32(ecc);

export const shortenBase58 = (data: string) => {
  if (!data) return data;
  if (data.length <= 16) return data;
  return `${data.slice(0, 8)}...${data.slice(-8)}`;
};

function pubkeys_to_address(publicKeys) {
  const pubkeys = publicKeys.map((hex) => Buffer.from(hex, "hex"));
  const { address } = bitcoin.payments.p2wsh({
    redeem: bitcoin.payments.p2ms({ m: 2, pubkeys }),
  });
  return address;
}

export function generateElectrumAddressList(zpubs, change = false) {
  const xpubs = zpubs.map((zpub, index) => {
    const zpubBytes = bs58.decode(zpub);
    const slicedBytes = zpubBytes.slice(4);
    const xpubBytes = Buffer.concat([
      Buffer.from("0488b21e", "hex"),
      slicedBytes,
    ]);
    return bs58.encode(xpubBytes);
  });

  const addressList = [];
  for (let i = 0; i < 10; i++) {
    const publicKeys = xpubs.map((xpub) => {
      const node = bip32.fromBase58(xpub);
      return node
        .derive(change ? 1 : 0)
        .derive(i)
        .publicKey.toString("hex");
    });
    addressList.push(pubkeys_to_address(publicKeys.sort()));
  }
  return addressList;
}
