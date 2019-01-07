import area from '@turf/area';

const areaOfPolygons = (geojson) => {

    geojson.features.forEach(f => {
        f.properties['Area_(m^2)'] = area(f);
    })

   
  return geojson;

}
  export default areaOfPolygons