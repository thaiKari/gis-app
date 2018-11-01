//combines the features of two feature collections into one
const combineFeatures = (FeatureCollection1, FeatureCollection2) => {

    let newGeojson = {
      "type": "FeatureCollection",
      "features": []
    }

    newGeojson.features = FeatureCollection1.features.concat(FeatureCollection2.features);
    return(newGeojson);
  }

  export default combineFeatures