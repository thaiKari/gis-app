import getJsonType from './getJsonType';
import generateUniqueID from './generateUniqueID';
import getDefaultColor from './getDefaultColor';


const createJsonLayer = (json, name, index) => {
    var type = getJsonType(json);
    var id = generateUniqueID(name);
    json.color= getDefaultColor(index);

    var layer = {
      id: id,
      type: type,
      displayName: name,
      visible: true,
      data: json 
    }

    return layer
  };

export default createJsonLayer