export function persentDefference(a, b) {
  return  +(100 * Math.abs( ( a - b ) / ( (a+b)/2 ) )).toFixed(2);
 }


 export function totalAmount(a, b, c) {
  return ((a * b) - (a * c)).toFixed(2);
}


export function capitalize(str) {
return str.charAt(0).toUpperCase() + str.substr(1)
}

export function formatNumber(value) {
  if (value >= 1e9) {
    // If it's in billions
    return `${(value / 1e9).toFixed(0)} billion`;
  } else if (value >= 1e6) {
    // If it's in millions
    return `${(value / 1e6).toFixed(0)} million`;
  } else if (value >= 1e3) {
    // If it's in thousands, with space between
    return value.toLocaleString("en-US").replace(/,/g, " ");
  } else {
    // For small numbers, return the value as it is
    return value;
  }
}

