//combines the features of two feature collections into one
// can have duplicates
const combineFeatures = (featureCollectionList) => {
    let newGeojson = {
      "type": "FeatureCollection",
      "features": []
    }

    for (var i in featureCollectionList) {
      newGeojson.features = newGeojson.features.concat( featureCollectionList[i].features )
    }

    return(newGeojson);
  }

  export default combineFeatures