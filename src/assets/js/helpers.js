export const dateFormater = (isoDate) => {
  let date = new Date(isoDate);
  return `${date.toDateString()}, ${date.toLocaleTimeString()}`
}