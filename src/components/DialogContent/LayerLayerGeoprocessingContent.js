import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { DialogContent } from '@material-ui/core';
import DialogFeedback from './DialogFeedback';
import DoubleLayerPicker from '../DoubleLayerPicker';
import LayerNameTextField from '../LayerNameTextField';

const styles = theme => ({
  
  });

  class LayerLayerGeoprocessingContent extends Component {
    
    render() {

      const {theme, layerIds, errorMessage, layers, setLayerIds, outputName, setName, type  } = this.props;
  
      let prompt1 = type === 'difference' ? 'Input Layer' : 'Layer 1'
      let prompt2 = type === 'difference' ? 'Difference Layer' : 'Layer 2'

      let l1 = layers.find( l => l.id === layerIds[0] )
      let l2 = layers.find( l => l.id === layerIds[1] )

      if(l1) {
        prompt1 += ' (Type: ' + l1.data.features[0].geometry.type  + ')'
      }
      if(l2) {
        prompt2 += ' (Type: ' + l2.data.features[0].geometry.type  + ')'
      }

      let layerOptions = layers;

      if (type === 'intersect' || type === 'difference' ) {
        layerOptions = layers.filter(layer => layer.type === 'Polygon' || layer.type === 'MultiPolygon' );
      }

      return (
        <DialogContent>
              {errorMessage.length > 0 ?
                <DialogFeedback message={errorMessage} variant={'error'} />
                : null
              }
              {type === 'intersect' || type === 'difference'  ?
                <DialogFeedback message={type + ' operation only accepts Polygons'}/>
                :
                null
              }
              
              <DoubleLayerPicker prompt1={prompt1}
                  prompt2={prompt2}
                  layers={layerOptions}
                  setLayerIds={setLayerIds}/>
                <div style={{margin: theme.spacing.unit}}>
                <LayerNameTextField
                  layerName={outputName}
                  setName={setName}
                  defaultName={outputName}
                  layers={layerOptions}
                  layerIndex={-1}
                  promt={'Output layer name'} />
                
                  </div>         
            </DialogContent>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(LayerLayerGeoprocessingContent);