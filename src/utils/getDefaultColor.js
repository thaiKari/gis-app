import colorPalette from './colorPalette';

/**
 * Sets a color from a decided colorpalett
 */

const getDefaultColor = () => { 
  getDefaultColor.index =  getDefaultColor.index  ? getDefaultColor.index +1: 1;
  let index = getDefaultColor.index ;
  console.log('getDefaultColor', index)  
  var colorChoices = Object.keys(colorPalette);
    var colorIndex = (index- Math.floor(index /colorChoices.length)*colorChoices.length);
    return colorPalette[colorChoices[colorIndex]];
  };

export default getDefaultColor