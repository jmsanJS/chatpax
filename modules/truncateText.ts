export const truncateUsername = (word: string) => {
  if (word.length > 15) {
    return word.slice(0, 12) + "...";
  }
  return word;
}

export const truncateLastMessage = (word: string) => {
  if (word.length > 25) {
    return word.slice(0, 22) + "...";
  }
  return word;
}