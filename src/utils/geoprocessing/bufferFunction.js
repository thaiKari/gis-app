import  buffer from '@turf/buffer';

const bufferFunction = (geojson, distance) => {

    if(!geojson) {
        return 'select a layer'
    } if(! distance) {
        return 'choose a distance in meters'
    }

  return buffer(geojson, distance, {units: 'meters'});

}
  export default bufferFunction