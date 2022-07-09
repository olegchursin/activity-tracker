export const getDatetimeDefaultValue = (timestamp: Date | string): string => {
  let ts = new Date();
  if (timestamp) {
    ts = new Date(timestamp);
  }
  ts.setMinutes(ts.getMinutes() - ts.getTimezoneOffset());
  ts.setMilliseconds(null);
  ts.setSeconds(null);
  return ts.toISOString().slice(0, -1);
};

export const getLocaleTimestamp = (timestamp: Date | string) => {
  return new Date(timestamp).toLocaleString();
};
