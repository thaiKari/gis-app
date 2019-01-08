import voronoi from '@turf/voronoi';
import combineFeatures from './combineFeatures';
/**
 * Creates voronoi area for a list of points
 */

const voronoiFunction = (geojsonList, bbox) => {

    let newJson;

    if (geojsonList.length < 1) {
        return 'select a layer';
    } 

    let combinedgeojsons = combineFeatures(geojsonList);
    
    if (!bbox[0] || !bbox[1] || !bbox[2] || !bbox[3]) {
        newJson = voronoi(combinedgeojsons);
    } else {
        newJson = voronoi(combinedgeojsons, {bbox: bbox});
    }

    //Remove null or undefined features:
    newJson.features = newJson.features.filter(f => f != null);

  return newJson;

}
  export default voronoiFunction