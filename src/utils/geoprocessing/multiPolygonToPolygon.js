/**
Converts a type multiPolygon json to a type Polygon json.
Turns out it was not necessary after all, however keeping the function as it can be useful in the future.
 */

const multiPolygonToPolygon = (geojson) => {

    let newGeojson = {
        "type": "FeatureCollection",
        "features": []
      }

    geojson.features.forEach(f => {
        let geom=f.geometry; 
        let props=f.properties;
        //console.log(props, geom)
      if(geom.type === 'MultiPolygon') {
        for (var i=0; i < geom.coordinates.length; i++){
          var polygon = {
               'type':'Polygon', 
               'coordinates':geom.coordinates[i],
               'properties': props ? props : {}};
            let feature = {
                "type": "Feature",
                "properties": props ? props : {},
                "geometry": polygon
            }
          newGeojson.features = newGeojson.features.concat(feature);
      }
      } else if (geom.type === 'Polygon') {
        console.log('POLY!', geom, props)
        let feature = {
          "type": "Feature",
          "properties": props ? props : {},
          "geometry": geom
      }
      newGeojson.features = newGeojson.features.concat(feature);
      }

    
    })

   console.log(newGeojson.features[0])
  return newGeojson;

}
  export default multiPolygonToPolygon