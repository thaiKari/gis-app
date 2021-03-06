
import React, {Component} from 'react';
import { SvgIcon } from '@material-ui/core';
import { Timeline, FiberManualRecord } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';;
/**
 * Icon showing color and type of a layer
 */
  const PolygonIcon = (props) => (
    <SvgIcon {...props}>
        <path/>     
    </SvgIcon>
  );

  const styles = theme => ({
  
  });


  class LayerIcon extends Component {

    getColor(layer) {
      var color;
      if(layer.data.color) {
        color = layer.data.color
      }
      else {
          console.log('no color set for Icon');
      }
  
      return color;
    }
    
    render() {

      const {layer} = this.props;

      var iconStyles = {
      };

      var color = this.getColor(layer);
      var icon;

      switch (layer.type) {
        case 'Polygon':
        case 'MultiPolygon' :
          iconStyles.backgroundColor = color;
          iconStyles.borderStyle = 'solid';
          iconStyles.borderWidth = 'thin';
          iconStyles.borderRadius = 3;
          iconStyles.borderColor = layer.data.strokeColor;
          iconStyles.opactiy = layer.data.opactiy;
          icon = <PolygonIcon style={iconStyles}/>
          break;

        case 'LineString':
        case 'MultiLineString':
          iconStyles.color = color;
          iconStyles.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          icon = <Timeline style={iconStyles}/>
          break;
        case 'Point':
          iconStyles.color = color;
          iconStyles.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          icon = <FiberManualRecord style={iconStyles}/>
          break;
        default:
          console.log('unidentified layer type', layer.type);
      }
  
      return (
        <div>
          {icon}
        </div>
      );
  
  
    }

  }

  export default withStyles(styles, { withTheme: true })(LayerIcon);