/**
 * Method to generate a random number from min to max
 * @param min Number from
 * @param max Number max
 */
export const randomNumberGenerator = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;
