import area from '@turf/area';
import combineFeatures from './combineFeatures';
import createFeatureCollectionFromFeature from './createFeatureCollectionFromFeature';

const areaOfPolygons = (geojson) => {

    geojson.features.forEach(f => {
        f.properties['Area_(m^2)'] = area(f);
    })

   
  return geojson;

}
  export default areaOfPolygons