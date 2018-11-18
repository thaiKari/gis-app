const getJsonType = (json) => {
    var type;

    if (json.type === 'FeatureCollection'){
      type = json.features[0].geometry.type;
    } else if (json.type === 'Feature') {
      type = 'Feature'
    }
    else {
     type = null
    }

    return type;
  };

export default getJsonType