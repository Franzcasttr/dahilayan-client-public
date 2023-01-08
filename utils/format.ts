export const formatter = (value: number) => {
  const formatter = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(value);
  return formatter;
};
// export const formatter = (value: number) => {
//   const formatter = new Intl.NumberFormat('fil-PH', {
//     style: 'currency',
//     currency: 'PHP',
//     minimumFractionDigits: 0,
//   }).format(value);
//   return formatter;
// };
