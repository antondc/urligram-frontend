export const diffClientTimeAgainstUTC = (dateToCompare: string): number => {
  const dateToCompareDateObject = new Date(dateToCompare);

  const dateToCompareTimeMil = dateToCompareDateObject.getTime();
  const dateToCompareTimeSec = dateToCompareTimeMil / 1000;

  const clientLocalDateObject = new Date();
  const clientLocalTimeOffset = clientLocalDateObject.getTimezoneOffset();
  const clientLocalTimeOffsetSec = clientLocalTimeOffset * 60;
  const clientLocalTimeMil = clientLocalDateObject.getTime();
  const clientLocalTimeSec = clientLocalTimeMil / 1000;
  const clientUtcTime = clientLocalTimeSec + clientLocalTimeOffsetSec;
  const difference = clientUtcTime - dateToCompareTimeSec;

  return difference;
};
