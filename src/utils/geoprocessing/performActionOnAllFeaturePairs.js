const performActionOnAllFeaturePairs = (FeatureCollection1, FeatureCollection2, action) => {

    let newGeojson = {
      "type": "FeatureCollection",
      "features": []
    }

    //assume both are of type FeatureCollection:
    FeatureCollection1.features.forEach(poly1 => {
        FeatureCollection2.features.forEach(poly2 => {
        newGeojson.features.push(action(poly1, poly2))
      });
    });

    return(newGeojson);
  }

  export default performActionOnAllFeaturePairs