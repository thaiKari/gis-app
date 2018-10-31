import  union from '@turf/union';
import performActionOnAllFeaturePairs from './performActionOnAllFeaturePairs';

const unionFunction = (geojson1, geojson2) => {

  if( !(geojson1 && geojson2) ) {
    return 'Two geometries are required'
  } else if (geojson1.features[0].geometry.type !== geojson2.features[0].geometry.type ) {
    return 'The geometries must be of the same type.'
  }

  let newGeojson;

  if(geojson1.features[0].type === 'Polygon') {
    newGeojson = performActionOnAllFeaturePairs(geojson1, geojson2, union)
  } else {
    newGeojson =  'combine FEATURES'
  }
     

    return(newGeojson);
  }

  export default unionFunction