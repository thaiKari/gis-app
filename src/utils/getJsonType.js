/**
 * 
 */

const getJsonType = (json) => {
    var type;

    if (json.type === 'FeatureCollection'){
      type = json.features[0].geometry.type;
    } else {
      console.log('json type should be FeatureCollection');
      //TODO: support more types
    }

    return type;
  };

export default getJsonType