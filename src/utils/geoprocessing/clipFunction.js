import getJsonType from '../getJsonType';
import intersect from './intersectFunction';
import isLineSegmentWithinPolygon from './isLineSegmentWithinPolygon';
import pointsWithinPolygon from '@turf/points-within-polygon';
import lineSplit from '@turf/line-split';
import polygonToLine from '@turf/polygon-to-line';

/**
 * Clips all geometry to fit inside the clipArea.
 */

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
        }if (type === 'LineString' || type === 'MultiLineString' ){
            newJson = {
                "type": "FeatureCollection",
                "features": []
              }
            data.features.forEach(line => {
                clipArea.features.forEach(poly => {
                    //Transform Polygon layer to lines.
                    //Split the lines where they intersect the polygon border lines
                    let splitLines = lineSplit(line, polygonToLine(poly));
                    
                    //If line does not intersect with polygon border, it is either
                    //completely inside or completely outside
                    if(splitLines.features.length === 0) {
                        if(isLineSegmentWithinPolygon(line, clipArea)) {
                            newJson.features.push(line);
                        }
                    }

                    //For all lines that intersect the polygon area, keep the parts that are inside
                    splitLines.features.forEach( lineSegment => {
                        if(isLineSegmentWithinPolygon(lineSegment, clipArea)) {
                            newJson.features.push(lineSegment);
                        }
                        
                    });
              });
            });
        }

        //Remove null or undefined features:
        newJson.features = newJson.features.filter(f => f != null);

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