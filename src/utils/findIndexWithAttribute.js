const findIndexWithAttribute = (array, attr, value) => {
    for(var i in array ) {
        if(array[i][attr] === value) {
            return i;
        }
      }
      return -1;
  };

export default findIndexWithAttribute