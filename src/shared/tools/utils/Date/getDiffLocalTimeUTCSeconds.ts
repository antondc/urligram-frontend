export const getDiffLocalTimeUTCSeconds = (dateToCompare: string): number => {
  const dateToCompareDateObject = new Date(dateToCompare);
  const dateToCompareTimeMs = dateToCompareDateObject.getTime();
  const dateToCompareTimeS = dateToCompareTimeMs / 1000;

  const nowDateObjectLocal = new Date();
  const newDateUTCISO = nowDateObjectLocal.toUTCString();
  const nowDateUTCObject = new Date(newDateUTCISO);
  const nowTimeUTCDifferenceM = nowDateUTCObject.getTimezoneOffset();
  const nowTimeUTCDifferenceS = nowTimeUTCDifferenceM * 60;
  const nowTimeMs = nowDateUTCObject.getTime();
  const nowTimeS = nowTimeMs / 1000;
  const nowTimeUTCS = nowTimeS + nowTimeUTCDifferenceS;
  const difference = nowTimeUTCS - dateToCompareTimeS;

  return difference;
};
