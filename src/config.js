export const getSetting = (key, fallback = false) => {
    if (window.config) {
      // console.log(window.config[key]);
    }
    var value =
      (window.config && window.config[key]) ||
      (global.__CONFIG && global.__CONFIG[key]) ||
      process.env[key] ||
      fallback;
    return value;
  };