import colorPalette from './colorPalette';

/**
 * Sets a color from a decided colorpalett based on the index in the list
 * @param {*} index the index of the object in the list
 */

const getDefaultColor = (index) => {  
    var colorChoices = Object.keys(colorPalette);
    var colorIndex = (index- Math.floor(index /colorChoices.length)*colorChoices.length);
    return colorPalette[colorChoices[colorIndex]];
  };

export default getDefaultColor