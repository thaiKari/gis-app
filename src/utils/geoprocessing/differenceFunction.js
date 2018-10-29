import  difference from '@turf/difference';

const differenceFunction = (geojson1, geojson2) => {
    console.log('In the differenceFunction')
    let newGeojson = {
      "type": "FeatureCollection",
      "features": []
    }

    //assume both are of type FeatureCollection:
    geojson1.features.forEach(poly1 => {
      geojson2.features.forEach(poly2 => {
        newGeojson.features.push(difference(poly1, poly2))
      });
    });
    console.log(newGeojson);

    return(newGeojson);
    
  }

  export default differenceFunction