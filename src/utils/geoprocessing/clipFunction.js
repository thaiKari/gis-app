import getJsonType from '../getJsonType';
import intersect from './intersectFunction';
import pointsWithinPolygon from '@turf/points-within-polygon';
import lineSplit from '@turf/line-split';
import polygonToLine from '@turf/polygon-to-line';
import {point} from '@turf/helpers';

const clipFunction = (geojsonList, clipArea) => {
    
    if (geojsonList.length === 0 || !clipArea) {
        return 'Select layers to proceed';
    }

    let newJsons = geojsonList.map(data => {
        let type = getJsonType(data);
        let newJson;
        if (type === 'Polygon' || type === 'MultiPolygon') {
            newJson = intersect(data, clipArea);         
        }
        if (type === 'Point') {
            newJson = pointsWithinPolygon(data, clipArea);
        }if (type === 'LineString'){
            newJson = {
                "type": "FeatureCollection",
                "features": []
              }
            data.features.forEach(line => {
                clipArea.features.forEach(poly => {
                    let splitLines = lineSplit(line, polygonToLine(poly))
                    splitLines.features.forEach( lineSegment => {
                       let segCoords = lineSegment.geometry.coordinates

                       let p1_within = pointsWithinPolygon(point(segCoords[0]), clipArea).features.length;
                       let plast_within = pointsWithinPolygon(point(segCoords[segCoords.length -1]), clipArea).features.length;
                       if(p1_within > 0 &&  plast_within > 0) {
                            newJson.features.push(lineSegment);
                        }
                    });
              });
            });
        }

        if(newJson) {
           if (newJson.type === "FeatureCollection") {
               if(newJson.features.length === 0){
                   return data.dispName + 'has no overlapping geometry'
               }
            newJson.dispName = data.dispName;
            return newJson;     
            }
            if (typeof newJson === 'string'){
                return data.dispName + ': ' + newJson; 
            }
        }

        return 'something went wrong during clip operations';
        


    });

  return newJsons;

}
  export default clipFunction