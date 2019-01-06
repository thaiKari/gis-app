import  buffer from '@turf/buffer';

const bufferFunction = (geojson, distance) => {

    if(!geojson) {
        return 'select a layer'
    } if(! distance) {
        return 'choose a distance in meters'
    }

    let newGeojson = buffer(geojson, distance, {units: 'meters'});
      //Remove null or undefined features:
  newGeojson.features = newGeojson.features.filter(f => f != null);

  if (!newGeojson.features[0]) {
    return 'The geometry remaining'
  }
  return newGeojson;

}
  export default bufferFunction