export const truncate = (word: string) => {
  if (word.length > 15) {
    return word.slice(0, 12) + "...";
  }
  return word;
}