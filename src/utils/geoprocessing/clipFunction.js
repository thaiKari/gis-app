import getJsonType from '../getJsonType';
import intersect from './intersectFunction';

const clipFunction = (geojsonList, clipArea) => {
    console.log(clipArea)

    let newJsons = geojsonList.map(data => {
        console.log(data.dispName)
        let type = getJsonType(data);
        let newJson;
        if (type === 'Polygon' || type === 'MultiPolygon') {
            newJson = intersect(data, clipArea);
            return newJson;
        }

        newJson.dispName = data.dispName;

        //console.log(type, data);

    });

  return newJsons;

}
  export default clipFunction