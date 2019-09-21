// returns a new date shifted a certain number of days (can be negative)
function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}
function getBeginningTimeForDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
// obj can be a parseable string, a millisecond timestamp, or a Date object
function convertToDate(obj) {
  return obj instanceof Date ? obj : new Date(obj);
}

export { shiftDate, getBeginningTimeForDate, convertToDate };
export default { shiftDate, getBeginningTimeForDate, convertToDate };
