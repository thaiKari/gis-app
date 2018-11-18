import pointsWithinPolygon from '@turf/points-within-polygon';
import center from '@turf/center'
import {point} from '@turf/helpers';

const isLineSegmentWithinPolygon = (lineSegment, clipArea) => {
 
    let segCoords = lineSegment.geometry.coordinates;
    let point2check;
    if (segCoords.length == 2 ) {
        point2check = center(lineSegment);                       
    } else {
        point2check = point(segCoords[1]);
    }

    let first_within = pointsWithinPolygon(point2check, clipArea).features.length;

    if(first_within > 0) {
        return true;
    }

    return false;

}
export default isLineSegmentWithinPolygon