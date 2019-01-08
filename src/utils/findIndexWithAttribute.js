/**
Returns the index of the first item in array that has the attribute with given value
-1 if not found
 */

const findIndexWithAttribute = (array, attr, value) => {
    for(var i in array ) {
        if(array[i][attr] === value) {
            return i;
        }
      }
      return -1;
  };

export default findIndexWithAttribute