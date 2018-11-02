import React from 'react';
import {Dialog,
   Typography,
   DialogContent,
   DialogTitle,
   } from '@material-ui/core';
import SubmitOrCancelAction from '../DialogActions/SubmitOrCancelAction';
import OkAction from '../DialogActions/OkAction'
import LayersSelect from '../LayersSelectSimple';
import findIndexWithAttribute from '../../utils/findIndexWithAttribute';
import { withStyles } from '@material-ui/core/styles';
import rgbCss2Obj from '../../utils/rgbCss2Obj';
import rgbObj2Css from '../../utils/rgbObj2Css';
import ColorPicker from '../ColorPicker';
import LayerNameTextField from '../LayerNameTextField';

const styles = theme => ({
  dialogPaper: {
    minHeight: '50vh',
    overflowX:'hidden'
  },
  spaced: {
    marginBottom: 50,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width:'100%'
  },
});

class EditLayerDialog extends React.Component {

  state = {
    scroll: 'paper',
    color: {r:0, g: 0, b:0, a:0},
    colorChanged: false,
    layerIndex: null,
    layerName: '',
  };

  submitChanges = () => {
    const {color, layerIndex, layerName } = this.state;
    const {submitChanges, closeDialog, layers} = this.props;
    if(color && layerIndex) {
      let colorString = rgbObj2Css(color);
      submitChanges(layers[layerIndex].id, colorString, color.a, layerName );
    }

    closeDialog();
  };

  setColorObj = (layerIndex) => {
    const {layers} = this.props;

    if(layerIndex >= 0) {
      const layer = layers[layerIndex];
      let colorString = layer.data.color;
      let color =  rgbCss2Obj(colorString, layer.data.opacity);
  
      this.setState({
        color: color,
        colorChanged: !this.state.colorChanged
      });
    }
  }

  setColor = (newColor) => {
    let {color} = this.state;
      color.r = newColor.r;
      color.g = newColor.g;
      color.b = newColor.b;

    this.setState({
      color: color,
      colorChanged: !this.state.colorChanged})
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
      let layerName = layers[layerIndex] ? layers[layerIndex].displayName: '';
      this.setState({
        layerIndex: layerIndex,
        layerName: layerName
      });
      this.setColorObj(layerIndex);
    }

  }

  changeLayer = (layerIndex) => {
    const{layers} = this.props;
    let layerName = layers[layerIndex] ? layers[layerIndex].displayName : '';

    this.setColorObj(layerIndex);
    this.setState({
      layerIndex: layerIndex,
      layerName: layerName
    });
  }

  setName  = (name) => {
    this.setState({layerName: name});
  }
  
  getContent = () => {
    let {layerIndex, color, colorChanged, layerName,} = this.state;
    const {layers, classes, theme} = this.props;
    

    return (
    <DialogContent>
      <form className={classes.container}>
        <LayersSelect
          className={classes.spaced}
          layers={layers}
          layerIndex={layerIndex}
          changeLayer={this.changeLayer.bind(this)} />  
        </form>
        {layerIndex >= 0 && layerIndex !== null ? 
        <div style={{ margin: theme.spacing.unit * 2}}>
        <LayerNameTextField layerName={layerName}
            setName={this.setName.bind(this)}
            defaultName={layerName}
            layers={layers}
            layerIndex={layerIndex} />

        <Typography  style={{ marginTop: theme.spacing.unit * 2}}  variant="caption" gutterBottom>Color</Typography>
        <ColorPicker
          setColor={this.setColor.bind(this)}
          setOpacity={this.setOpacity.bind(this)}
          color={color}
          colorChanged={colorChanged}/> 
        </div> : null}  
        
    </DialogContent> );

  
  };


  render() {
    const {open, layers, classes} = this.props;
    const {layerName} = this.state;

    let content = layers.length > 0 ?
      this.getContent()
      : 
      <DialogContent>
        <Typography>Add some layers first</Typography>         
      </DialogContent>

    let hasError= layerName.length===0;

    let actions = layers.length > 0 ?
      <SubmitOrCancelAction submitDisabled={hasError} submit={this.submitChanges} cancel={this.handleClose}/>
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