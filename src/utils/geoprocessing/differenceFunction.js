import  difference from '@turf/difference';
import performActionOnAllFeaturePairs from './performActionOnAllFeaturePairs';

const differenceFunction = (geojson1, geojson2) => {
    console.log('In the differenceFunction')
    let newGeojson = performActionOnAllFeaturePairs(geojson1, geojson2, difference)

    return(newGeojson);
    
  }

  export default differenceFunction