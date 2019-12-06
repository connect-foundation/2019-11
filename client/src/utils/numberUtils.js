export const convertToPrice = number =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const fromPiceToNumber = price => price.replace(/\,/g, "");
