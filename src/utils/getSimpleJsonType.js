// Polygon and Multipolygon are both classified as Polygon
// LineString and MultiLineString are both calssified as Linestring
const getSimpleJsonType = (json) => {
    let type;
    switch (json.features[0].geometry.type) {
        case 'Polygon':
        case 'MultiPolygon':
            type='Polygon'
          break;
        case 'LineString':
        case 'MultiLineString':
            type='LineString'
            break;
        case 'Point':
            type='Point'
            break;
        default:
          break;
      }
      return type;
    };

export default getSimpleJsonType