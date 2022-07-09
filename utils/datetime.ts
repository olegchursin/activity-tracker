export const getDatetimeDefaultValue = (timestamp: Date | string): string => {
  if (!timestamp) {
    return;
  }
  const ts = new Date(timestamp);
  ts.setMinutes(ts.getMinutes() - ts.getTimezoneOffset());
  return ts.toISOString().slice(0, -1);
};
