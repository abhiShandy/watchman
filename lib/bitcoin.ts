export const shortenZpub = (zpub: string) => {
  return `${zpub.slice(0, 8)}...${zpub.slice(-8)}`;
};
