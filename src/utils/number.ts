export const randomRange = (min: number, max: number) => {
  return Math.floor((max + 1 - min) * Math.random() + min);
};
