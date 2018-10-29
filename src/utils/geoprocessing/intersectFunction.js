import  intersect from '@turf/intersect';
import performActionOnAllFeaturePairs from './performActionOnAllFeaturePairs';

const intersectFunction = (geojson1, geojson2) => {
    console.log('In the IntersectFunc')
    let newGeojson = performActionOnAllFeaturePairs(geojson1, geojson2, intersect)
    return newGeojson;
  }

  export default intersectFunction