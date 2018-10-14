import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Dialog,
        DialogTitle,
        DialogContent,
        Typography
        } from '@material-ui/core'

import SubmitOrCancelAction from './DialogActions/SubmitOrCancelAction';
import OkAction from './DialogActions/OkAction';
import LayersSelect from './LayersSelect';
import ColorPickerExpansionPanel from './ColorPickerExpansionPanel'
import ColorPicker from './ColorPicker';
import rgbCss2Obj from '../utils/rgbCss2Obj';
import rgbObj2Css from '../utils/rgbObj2Css';


const styles = theme => ({
  dialogPaper: {
    minHeight: '50vh',
  },
  spaced: {
    marginBottom: 50,
  },
});

class AddLayerDialog extends React.Component {
  state = {
    scroll: 'paper',
    color: null,
  };


  componentWillUnmount = () => {
    // dialog has a side-effect if this not checked
    document.body.style.overflow = 'auto';
  } 

  componentDidMount  = () => {
    // dialog has a side-effect if this not checked
    document.body.style.overflow = 'auto';
    if (this.props.currLayer) {
      this.setCurLayer();
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.currLayer !== this.props.currLayer) {
      this.setCurLayer();
    }
  }

  submitChanges = () => {
    const {color, layer} = this.state;
    const {submitChanges, closeDialog} = this.props;
    let colorString = rgbObj2Css(color);

    submitChanges(layer.id, colorString, color.a );
    closeDialog();
  };

  handleClose = () => {
    const {closeDialog} = this.props;
    this.setCurLayer();
    closeDialog();
  };

  changeLayer = (layerId) => {
    const {layers} = this.props;
    let layer = layers.find(l => l.id == layerId);

    this.setState({layer: layer});
    this.setColorObj(layer);
  }

  setColorObj = (layer) => {

    if(layer) {
      let colorString = layer.data.color;
      let color =  rgbCss2Obj(colorString, layer.data.opacity);
  
      this.setState({
        color: color
      });
    }

  }

  setCurLayer = () => {
    const {layers, currLayer} = this.props;
    let layer = layers.find(l => l.id ==currLayer);

    this.setColorObj(layer);

    this.setState({
      layer: layer,
    });
  }

  getContent = () => {
    let {layer, color} = this.state;
    const {layers, classes} = this.props;

    let colorPicker = layer ? <ColorPicker
    setColor={this.setColor.bind(this)}
    setOpacity={this.setOpacity.bind(this)}
    color={color}
    /> : null;

    return(
      <DialogContent>
        <LayersSelect
            className={classes.spaced}
            layers={layers}
            currLayer={layer}
            changeLayer={this.changeLayer.bind(this)} />        
            {colorPicker}
      </DialogContent>
    );
  }

  setColor = (newColor) => {
    let {color} = this.state;
    color.r = newColor.r,
    color.g = newColor.g,
    color.b = newColor.b

    this.setState({color: color})
  }

  setOpacity = (opactity) => {
    let {color} = this.state;
    color.a = opactity

    this.setState({color: color})
  } 

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

export default withStyles(styles, { withTheme: true })(AddLayerDialog);