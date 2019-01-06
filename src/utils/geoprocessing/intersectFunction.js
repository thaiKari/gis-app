import  intersect from '@turf/intersect';
import performActionOnAllFeaturePairs from './performActionOnAllFeaturePairs';

const intersectFunction = (geojson1, geojson2) => {
  if( !(geojson1 && geojson2) ) {
    return 'Two geometries are required'
  } else if (geojson1.features[0].geometry.type !== 'Polygon' && geojson1.features[0].geometry.type !== 'MultiPolygon'  ) {
    return 'The geometries must be of type Polygon or MultiPolygon.'
  } else if (geojson1 === geojson2) {
    return 'The geometries cannot be identical'
  }
  
  let newGeojson = performActionOnAllFeaturePairs(geojson1, geojson2, intersect)
  //Remove null or undefined features:
  newGeojson.features = newGeojson.features.filter(f => f != null);

    if (!newGeojson.features[0]) {
      return 'The geometries do not overlap'
    }
    return newGeojson;
  }

  export default intersectFunction