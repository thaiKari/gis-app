import React from 'react';
import {Dialog,  Typography,DialogContent, DialogTitle } from '@material-ui/core';
import SubmitOrCancelAction from './DialogActions/SubmitOrCancelAction';
import OkAction from './DialogActions/OkAction'
import LayersSelect from './LayersSelect';
import findIndexWithAttribute from '../utils/findIndexWithAttribute';
import { withStyles } from '@material-ui/core/styles';
import rgbCss2Obj from '../utils/rgbCss2Obj';
import rgbObj2Css from '../utils/rgbObj2Css';
import ColorPicker from './ColorPicker';

const styles = theme => ({
  dialogPaper: {
    minHeight: '50vh',
  },
  spaced: {
    marginBottom: 50,
  },
});

class EditLayerDialog extends React.Component {

  state = {
    scroll: 'paper',
    color: {r:0, g: 0, b:0, a:0},
    layerIndex: null
  };

  submitChanges = () => {
    const {color, layerIndex } = this.state;
    const {submitChanges, closeDialog, layers} = this.props;
    if(color && layerIndex) {
      let colorString = rgbObj2Css(color);
      submitChanges(layers[layerIndex].id, colorString, color.a );
    }

    closeDialog();
  };

  setColorObj = (layerIndex) => {
    const {layers} = this.props;

    if(layerIndex) {
      const layer = layers[layerIndex];
      let colorString = layer.data.color;
      let color =  rgbCss2Obj(colorString, layer.data.opacity);
  
      this.setState({
        color: color
      });
    }
  }

  setColor = (newColor) => {
    let {color} = this.state;
    color.r = newColor.r;
    color.g = newColor.g;
    color.b = newColor.b;

    this.setState({color: color})
  }

  setOpacity = (opactity) => {
    let {color} = this.state;
    color.a = opactity

    this.setState({color: color})
  } 

  handleClose = () => {
    const {closeDialog} = this.props;
    closeDialog();
  };


  componentDidMount = () => {
    const{currLayer} = this.props;
    this.setLayerIndex(currLayer);
  }

  componentDidUpdate = (prevProps) => {
    const{currLayer} = this.props;
    if(prevProps.currLayer !== currLayer){
      this.setLayerIndex(currLayer);
    }
    
  }

  setLayerIndex = (layerId) => {
    const{layers} = this.props;

    if(layerId){
      let layerIndex = findIndexWithAttribute(layers, 'id', layerId);
      this.setState({layerIndex: layerIndex});
      this.setColorObj(layerIndex);
    }

  }

  changeLayer = (value) => {
    this.setState({layerIndex: value});
    this.setColorObj(value);
  }

  
  getContent = () => {
    let {layerIndex, color} = this.state;
    const {layers, classes} = this.props

    return (
    <DialogContent>
        <LayersSelect
          className={classes.spaced}
          layers={layers}
          layerIndex={layerIndex}
          changeLayer={this.changeLayer.bind(this)} />  
        {layerIndex >= 0 ? 
        <ColorPicker
          setColor={this.setColor.bind(this)}
          setOpacity={this.setOpacity.bind(this)}
          color={color}/> 
        : null}  
    </DialogContent> );

  
  };


  render() {
    const {open, layers, classes} = this.props;

    let content = layers.length > 0 ?
      this.getContent()
      : 
      <DialogContent>
        <Typography>Add some layers first</Typography>         
      </DialogContent>

    let actions = layers.length > 0 ?
      <SubmitOrCancelAction submit={this.submitChanges} cancel={this.handleClose}/>
      : 
      <OkAction ok={this.handleClose}/>

    return (
      <div>

        <Dialog
          fullWidth={true}
          open={open}
          onClose={this.handleClose}
          scroll={'paper'}
          aria-labelledby="scroll-dialog-title"
          classes={{ paper: classes.dialogPaper }}
          
        >
            <DialogTitle id="scroll-dialog-title">Edit Layers</DialogTitle>
              {content}
              {actions}
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(EditLayerDialog);