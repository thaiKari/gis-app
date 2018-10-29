import  union from '@turf/union';
import performActionOnAllFeaturePairs from './performActionOnAllFeaturePairs';

const unionFunction = (geojson1, geojson2) => {
    let newGeojson = performActionOnAllFeaturePairs(geojson1, geojson2, union)

    return(newGeojson);
  }

  export default unionFunction