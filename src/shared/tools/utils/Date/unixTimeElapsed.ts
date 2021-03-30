export const unixTimeElapsed = (unixTime: number): number => {
  const epochTime = unixTime * 1000;

  const originalTime = new Date(epochTime);
  const originalTimeUtc = originalTime.getTime();

  const clientCurrentDateObject = new Date();
  const clientCurrentTimeMil = clientCurrentDateObject.getTime();

  const difference = clientCurrentTimeMil - originalTimeUtc;

  return difference;
};
