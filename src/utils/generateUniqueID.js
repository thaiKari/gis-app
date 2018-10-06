/**
 * @param {*} name the name of the object to be ided
 */
const generateUniqueID = (name) => {
    let d = new Date();
    let n = d.getTime();

    return name + n;
  };

export default generateUniqueID

