import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {DialogContent,  Typography, DialogTitle, DialogActions, Button}  from '@material-ui/core'
import DragNDropBox from './DragNDropBox';
import createJsonLayer from '../utils/createJsonLayer';
import SimpleLayerList from './SimpleLayerList';

const styles = theme => ({
  
  });

  class DialogContentUpload extends Component {
    state = {
      layers: []
    };


    handleFile(json, name) {
      let {layers} = this.state;

      let layer =  createJsonLayer(json, name, layers.length);
      layers.push(layer);

      this.setState({layers: layers});
    }

    submitLayers = () => {
      const {layers} = this.state;
      const {submitLayers} = this.props;

      submitLayers(layers);
    }

    deleteLayer(index) {
      const {layers} = this.state;
      layers.splice(index, 1);

      this.setState({layers: layers});
    }
    
    render() {

      const { classes, receiveNewJson, theme } = this.props;
      const {layers} = this.state;

      return (
        <div>
          <DialogTitle id="scroll-dialog-title">Upload Layers</DialogTitle>
          <DialogContent className={classes.dialog}>
                  
          <DragNDropBox modalDisp={true} receiveNewJson={this.handleFile.bind(this)}/>
            <Typography> Add the Following Layers to map:</Typography>
            <SimpleLayerList 
              canDelete={true}
              layers={layers}
              deleteLayer={this.deleteLayer.bind(this)}/>
          
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.submitLayers} color="primary">
              Add Layers
            </Button>
          </DialogActions>
        </DialogContent>
      </div>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(DialogContentUpload);