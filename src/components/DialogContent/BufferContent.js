import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { DialogContent, TextField } from '@material-ui/core';
import DialogFeedback from './DialogFeedback';
import LayersSelectSimple from '../LayersSelectSimple2';
import LayerNameTextField from '../LayerNameTextField';

const styles = theme => ({
  
  });

  class BufferContent extends Component {
    
    render() {

      const { theme, errorMessage, layers, changeLayer, distance, changeDistance, outputName, setName } = this.props;
  
      return (
        <DialogContent>
              {errorMessage.length > 0 ?
                <DialogFeedback message={errorMessage} variant={'error'} />
                : null
              }
              
              <LayersSelectSimple 
                  layers={layers}
                  changeLayer={changeLayer}/>
                <div style={{margin: theme.spacing.unit}}>
                <TextField
                  error = {isNaN(distance) && distance}
                  value={distance}
                  label="Distance (m)"
                  onChange={(e) => changeDistance(e.target.value)}
                />

                <LayerNameTextField
                  layerName={outputName}
                  setName={setName}
                  defaultName={outputName}
                  layers={layers}
                  layerIndex={-1}
                  promt={'Output layer name'} />
                
                  </div>

            </DialogContent>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(BufferContent);