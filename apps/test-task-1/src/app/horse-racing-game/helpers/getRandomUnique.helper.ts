export const getRandomUnique = <T>(array: T[], count = 10): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
