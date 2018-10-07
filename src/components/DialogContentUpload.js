import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {DialogContentText, DialogContent,  Typography, DialogTitle, DialogActions, Button}  from '@material-ui/core'
import DragNDropBox from './DragNDropBox';
import SimpleLayerList from './SimpleLayerList';

const styles = theme => ({

  });

  class DialogContentUpload extends Component {
    state = {
      layers: []
    };


    /*handleFile(json, name) {
      let {layers} = this.state;

      //let layer =  createJsonLayer(json, name, layers.length);
      layers.push(layer);

      this.setState({layers: layers});
    } */

    submitLayers = () => {
      const {layers} = this.state;
      const {submitLayers} = this.props;

      submitLayers(layers);
    }


    
    render() {

      const { classes, handleFile, deleteLayer, layers } = this.props;
      //const {layers} = this.state;

      let uploadList = layers.length > 0 ?
                      <div style = {{padding: 20}}>
                        <Typography color='primary'> Add the Following Layers to map:</Typography>
                        <SimpleLayerList 
                          canDelete={true}
                          layers={layers}
                          deleteLayer={deleteLayer}/>
                      </div>
                      : null ;

      return (

          <DialogContent className={classes.dialog}>
                  
          <DragNDropBox modalDisp={true} receiveNewJson={handleFile}/>
          {uploadList}

          </DialogContent>
  

      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(DialogContentUpload);