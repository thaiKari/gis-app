import  union from '@turf/union';
import performActionOnAllFeaturePairs from './performActionOnAllFeaturePairs';
import combineFeatures from './combineFeatures';

const unionFunction = (geojson1, geojson2) => {

  if( !(geojson1 && geojson2) ) {
    return 'Two geometries are required'
  } else if (geojson1.features[0].geometry.type !== geojson2.features[0].geometry.type ) {
    return 'The geometries must be of the same type.'
  } else if (geojson1 === geojson2) {
    return 'The geometries cannot be identical'
  }

  let newGeojson;

  if(geojson1.features[0].geometry.type === 'Polygon') {
    newGeojson = performActionOnAllFeaturePairs(geojson1, geojson2, union);
  } else {
    newGeojson =  combineFeatures(geojson1, geojson2)
  }
    return(newGeojson);
  }

  export default unionFunction