import  difference from '@turf/difference';

const differenceFunction = (geojson1, geojson2) => {
  if( !(geojson1 && geojson2) ) {
    return 'Two geometries are required'
  } else if (geojson1.features[0].geometry.type !== 'Polygon' && geojson1.features[0].geometry.type !== 'MultiPolygon'  ) {
    return 'The geometries must be of type Polygon or MultiPolygon.'
  } else if (geojson1 === geojson2) {
    return 'The geometries cannot be identical'
  }

  let newFeatures = []

   geojson1.features.forEach((f1, i) => {
    let f1_temp = JSON.parse(JSON.stringify(f1));
     geojson2.features.forEach((f2) => {
        f1_temp = difference(f1_temp, f2)
     });
      
     newFeatures.push(f1_temp)
    });

    newFeatures.forEach( (f, i) => {
      geojson1.features[i] = f;
    });

    //Remove all null or unidentified features
    geojson1.features = geojson1.features.filter(f => f != null);

    if (!geojson1.features[0]) {
      return 'There is no geometry left after performing the difference operation. Try swapping the order'
    }
    return(geojson1);
    
  }

  export default differenceFunction