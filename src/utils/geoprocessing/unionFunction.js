import  union from '@turf/union';
import performActionOnAllFeaturePairs from './performActionOnAllFeaturePairs';
import combineFeatures from './combineFeatures';
import getSimpleJsonType from '../getSimpleJsonType';

/**
 * returns a union of two geojsons.
 */
const unionFunction = (geojson1, geojson2) => {

  let type1 = getSimpleJsonType(geojson1);
  let type2 = getSimpleJsonType(geojson2);


  if( !(geojson1 && geojson2) ) {
    return 'Two geometries are required'
  } else if (type1 !== type2 ) {
    return 'The geometries must be of the same type.'
  } else if (geojson1 === geojson2) {
    return 'The geometries cannot be identical'
  }

  let newGeojson;

  if(type1 === 'Polygon') {
    newGeojson = performActionOnAllFeaturePairs(geojson1, geojson2, union);
  } else {
    newGeojson =  combineFeatures([geojson1, geojson2])
  }

  //Remove null or undefined features:
  newGeojson.features = newGeojson.features.filter(f => f != null);

    return(newGeojson);
  }

  export default unionFunction