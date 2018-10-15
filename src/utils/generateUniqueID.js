/**
 * @param {*} name the name of the object to be ided
 */
const generateUniqueID = (name) => {
  //Static variable:
  generateUniqueID.layerNum = generateUniqueID.layerNum ?
                              generateUniqueID.layerNum + 1 : 1

    return name + generateUniqueID.layerNum;
  };

export default generateUniqueID

