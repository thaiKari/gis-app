import area from '@turf/area';

/**
 * Adds an Area property to each feature of a polygon featureCollection
 */

const areaOfPolygons = (geojson) => {

    geojson.features.forEach(f => {
        f.properties['Area_(m^2)'] = area(f);
    })

   
  return geojson;

}
  export default areaOfPolygons