import bbox from '@turf/bbox';
import bboxPolygon from '@turf/bbox-polygon';
import combineFeatures from './combineFeatures';
import createFeatureCollectionFromFeature from './createFeatureCollectionFromFeature';

const bboxFunction = (geojsonList) => {

    if(geojsonList.length < 1) {
        return {newJson: 'select a layer'};
    }

    let combinedgeojsons = combineFeatures(geojsonList);
    console.log(combinedgeojsons)
    let bbox_res = bbox(combinedgeojsons);
    let bboxPolygon_res = bboxPolygon(bbox_res);
    // returns a feature... we want all jsons as feature collections
    let bboxFeatureCollection = createFeatureCollectionFromFeature([bboxPolygon_res])

  return {bbox: bbox_res, newJson: bboxFeatureCollection };

}
  export default bboxFunction