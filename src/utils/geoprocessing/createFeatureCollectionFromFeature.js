//combines list of features to feature collection
const createFeatureCollectionFromFeature = (featureList) => {

    let newGeojson = {
      "type": "FeatureCollection",
      "features": []
    }

    for (var i in featureList) {
        newGeojson.features = newGeojson.features.concat( featureList[i])
      }
    
    return(newGeojson);
  }

  export default createFeatureCollectionFromFeature