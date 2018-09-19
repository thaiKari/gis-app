
import React, {Component} from 'react';
import { SvgIcon } from '@material-ui/core';

  const PolygonIcon = (props) => (
    <SvgIcon {...props}>
        <path/>     
    </SvgIcon>
  );

  class LayerIcon extends Component {
    
    render() {

      const { classes, layer, index, setLayerColor } = this.props;

      var iconStyles = {
      };
    

      if(layer.data.color) {
          iconStyles.backgroundColor = layer.data.color
      }
      else {
          console.log('no color set for Icon');
      }
  
      return (
        <PolygonIcon style={iconStyles}/>
      );
  
  
    }

  }

export default LayerIcon