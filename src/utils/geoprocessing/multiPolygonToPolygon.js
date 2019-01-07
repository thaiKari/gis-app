const multiPolygonToPolygon = (geojson) => {

    let newGeojson = {
        "type": "FeatureCollection",
        "features": []
      }

    geojson.features.forEach(f => {
        let geom=f.geometry; 
        let props=f.properties;
   if (geom.type === 'MultiPolygon'){
      for (var i=0; i < geom.coordinates.length; i++){
          var polygon = {
               'type':'Polygon', 
               'coordinates':geom.coordinates[i],
               'properties': props};
            let feature = {
                "type": "Feature",
                "properties": props,
                "geometry": polygon
            }
          newGeojson.features = newGeojson.features.concat(feature);
      }
    }
    })

   
  return newGeojson;

}
  export default multiPolygonToPolygon