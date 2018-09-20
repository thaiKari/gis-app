
import React, {Component} from 'react';
import { SvgIcon } from '@material-ui/core';
import { Timeline, FiberManualRecord } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';;

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

      const {layer, theme} = this.props;

      var iconStyles = {
      };

      var color = this.getColor(layer);
      var icon;

      switch (layer.type) {
        case 'Polygon':
          iconStyles.backgroundColor = color;
          icon = <PolygonIcon style={iconStyles}/>
          break;
        case 'LineString':
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