import getJsonType from './getJsonType';
import generateUniqueID from './generateUniqueID';
import getDefaultColor from './getDefaultColor';
import createFeatureCollectionFromFeature from "./geoprocessing/createFeatureCollectionFromFeature";

const createJsonLayer = (json, name) => {
    var type = getJsonType(json);
    if (type === 'Feature') {
      json = createFeatureCollectionFromFeature([json]);
      type = getJsonType(json);
    } if (!type) {
      return 'Sorry, file type is not supported';
    }

    var id = generateUniqueID(name);
    json.color= json.color ?json.color: getDefaultColor();
    json.opacity = json.opacity? json.opacity: 1;

    if(type === 'Polygon' || type ==='MultiPolygon') {
      json.strokeColor = json.strokeColor ? json.strokeColor: json.color;
      json.strokeOpacity = json.strokeOpacity ? json.strokeOpacity: 1;
      json.opacity = json.opacity? json.opacity: 0.8;
    }

    if(type === 'Point' ) {
      json.radius = json.radius ? json.radius: 5;
    }
    

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