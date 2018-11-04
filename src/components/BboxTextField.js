import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography } from '@material-ui/core';
import findLayerById from '../utils/findLayerById';
import bboxFunction from '../utils/geoprocessing/bboxFunction';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 150,
      },
  });

  class BboxTextField extends Component {

    calculateBbox = () => {
        let { layerIds, setBbox, layers, setError } = this.props;

        let selectedLayersDataList = [];

        for (var i in layerIds ) {
            let layer = findLayerById(layerIds[i], layers);
            let data = layer ? layer.data : null;
            selectedLayersDataList.push( data ) 
          }
        
        let res = bboxFunction(selectedLayersDataList)
        if(res.bbox) {
            setBbox(res.bbox);
        } else {
            setError(res.newJson);
        }
        
        
    }


    handleChange = index => event => {
        let {bbox} = this.state;
        bbox[index] = event.target.value;

        this.setState({
            bbox: bbox
        });
      };
    
    render() {
    
      const { classes, theme, bbox } = this.props;
      // minX, minY, maxX, maxY]
  
      return (
        <div>
            <Typography style={{marginTop: theme.spacing.unit}} variant='caption'>Bounding box</Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
            <TextField
                label="minX"
                className={classes.textField}
                value={bbox[0]}
                onChange={this.handleChange(0)}
                margin="normal"
                />
            <TextField
                label="miny"
                className={classes.textField}
                value={bbox[1]}
                onChange={this.handleChange(1)}
                margin="normal"
                />
            <TextField
                label="maxX"
                className={classes.textField}
                value={bbox[2]}
                onChange={this.handleChange(2)}
                margin="normal"
                />
            <TextField
                label="maxY"
                className={classes.textField}
                value={bbox[3]}
                onChange={this.handleChange(3)}
                margin="normal"
                />
            </div>
            <div style={{display:'flex', justifyContent: 'flex-end'}}>
                <Button color='secondary' onClick={this.calculateBbox}>Calculate bbox from geometry</Button>
            </div>

        </div>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(BboxTextField);