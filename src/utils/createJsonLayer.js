import getJsonType from './getJsonType';
import generateUniqueID from './generateUniqueID';
import getDefaultColor from './getDefaultColor';


const createJsonLayer = (json, name, index) => {
    var type = getJsonType(json);
    var id = generateUniqueID(name);
    json.color= getDefaultColor(index);
    json.opacity = 0.8;

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