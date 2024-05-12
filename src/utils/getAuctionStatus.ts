export const getAuctionStatus = (state: number) => {
  if (state === 0) return "notStarted";
  if (state === 1) return "running";
  if (state === 2) return "complete";
  return "undefined";
};
