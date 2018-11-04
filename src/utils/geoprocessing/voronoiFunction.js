import voronoi from '@turf/voronoi';
import combineFeatures from './combineFeatures';

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

    
    newJson.features = newJson.features.filter(function (el) {
        return el != null;
      });

  return newJson;

}
  export default voronoiFunction