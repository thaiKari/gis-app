/**
 * Rounds a floating point number to specified number of decimal places 
 */
const roundToNdecimals = (value, decimals) => {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }


export default roundToNdecimals