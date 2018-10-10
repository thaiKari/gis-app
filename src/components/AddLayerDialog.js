import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Dialog,
        AppBar,
        Tabs,
        Tab,
        DialogActions,
        DialogTitle,
        Button} from '@material-ui/core'

import UploadIcon from '@material-ui/icons/CloudUpload';
import MapIcon from '@material-ui/icons/Map';
import CreateIcon from '@material-ui/icons/Create';
import DC_Upload from './DialogContent/DC_Upload';
import createJsonLayer from '../utils/createJsonLayer';


const styles = theme => ({

});

class AddLayerDialog extends React.Component {
  state = {
    open: false,
    scroll: 'paper',
    uploadTypeIndex: 0,
    layers: []
  };

  handleFile(json, name) {
    let {layers} = this.state;

    let layer =  createJsonLayer(json, name, layers.length);
    layers.push(layer);

    this.setState({layers: layers});
  }

  deleteLayer(index) {
    const {layers} = this.state;
    layers.splice(index, 1);

    this.setState({layers: layers});
  }

  componentWillUnmount = () => {
    // dialog has a side-effect if this not checked
    document.body.style.overflow = 'auto';
    this.setState({layers: []});
  } 

  componentDidMount  = () => {
    // dialog has a side-effect if this not checked
    document.body.style.overflow = 'auto';
    this.setState({layers: []});
  } 

  submitJsonLayers = () => {
    const {layers} = this.state;
    const {closeDialog, addLayers} = this.props
    addLayers(layers);
    closeDialog();
  };

  handleClose = () => {
    const {closeDialog} = this.props;
    this.setState({
      layers: [],
      uploadTypeIndex: 0});
    closeDialog();
  };

  handleTabChange = (event, uploadTypeIndex) => {
    this.setState({ uploadTypeIndex });
  };
  
  getDialogContent() {
    const {uploadTypeIndex, layers} = this.state;

    switch(uploadTypeIndex) {
      case 0:
          return <DC_Upload handleFile={this.handleFile.bind(this)}
                  deleteLayer={this.deleteLayer.bind(this)}
                  layers={layers}/>
      case 1:
          return null
      default:
        return null
  }

  }

  render() {
    const {uploadTypeIndex} = this.state;
    const { open} = this.props;

    let dialogContent = this.getDialogContent();
    

    return (
      <div>

        <Dialog
          open={open}
          onClose={this.handleClose}
          scroll={'paper'}
          aria-labelledby="scroll-dialog-title"
        >

          <AppBar position="static" color="default" style={{width: 500}}>
              <Tabs value={uploadTypeIndex} onChange={this.handleTabChange} scrollable scrollButtons="off">
                <Tab icon={<UploadIcon />} label='UPLOAD'/>
                <Tab icon={<MapIcon />} label='WMS'/>
                <Tab icon={<CreateIcon />} label='CREATE'/>

              </Tabs>
            </AppBar>
            <DialogTitle id="scroll-dialog-title">Upload Layers</DialogTitle>

            {dialogContent}

            <DialogActions>
            <Button onClick={this.submitJsonLayers}  color="primary">
              Submit
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>   

        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AddLayerDialog);