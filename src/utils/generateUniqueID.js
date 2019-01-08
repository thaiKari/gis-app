/**
 * @param {*} name the name of the object to be ided
 * Appends a counter to the layer name to assure unique ids
 */
const generateUniqueID = (name) => {
  //Static variable:
  generateUniqueID.layerNum = generateUniqueID.layerNum ?
                              generateUniqueID.layerNum + 1 : 1

    return name + generateUniqueID.layerNum;
  };

export default generateUniqueID

