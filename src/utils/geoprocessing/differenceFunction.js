import  difference from '@turf/difference';
import performActionOnAllFeaturePairs from './performActionOnAllFeaturePairs';

const differenceFunction = (geojson1, geojson2) => {
  if( !(geojson1 && geojson2) ) {
    return 'Two geometries are required'
  } else if (geojson1.features[0].geometry.type !== 'Polygon' && geojson1.features[0].geometry.type !== 'MultiPolygon'  ) {
    return 'The geometries must be of type Polygon or MultiPolygon.'
  } else if (geojson1 === geojson2) {
    return 'The geometries cannot be identical'
  }
    let newGeojson = performActionOnAllFeaturePairs(geojson1, geojson2, difference)
    if (!newGeojson.features[0]) {
      return 'There is no geometry left after performing the difference operation. Try swapping the order'
    }
    return(newGeojson);
    
  }

  export default differenceFunction