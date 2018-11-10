import React from 'react';
import {Dialog,
   Typography,
   DialogContent,
   DialogTitle,
   Divider
   } from '@material-ui/core';
import SubmitOrCancelAction from '../DialogActions/SubmitOrCancelAction';
import OkAction from '../DialogActions/OkAction'
import LayersSelect from '../LayersSelectSimple2';
import findIndexWithAttribute from '../../utils/findIndexWithAttribute';
import { withStyles } from '@material-ui/core/styles';
import rgbCss2Obj from '../../utils/rgbCss2Obj';
import rgbObj2Css from '../../utils/rgbObj2Css';
import ColorPicker from '../ColorPicker';
import LayerNameTextField from '../LayerNameTextField';
import classNames from 'classnames';

const styles = theme => ({
  dialogPaper: {
    minHeight: '50vh',
    overflowX:'hidden',
    maxHeight: '100vh'
  },
  dialogPaperNoScroll: {
    overflowY: 'visible',
  },
  dialogPaperAbsPos: {
    position: 'unset',
  },
  spaced: {
    marginBottom: 50,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width:'100%'
  }
});

class EditLayerDialog extends React.Component {

  state = {
    scroll: 'paper',
    color: {r:0, g: 0, b:0, a:0},
    colorChanged: false,
    layerId: null,
    layerName: '',
    pickerOpen: false
  };

  setPickerOpen = (pickerOpen) => {
    this.setState({pickerOpen});
  }

  submitChanges = () => {
    const {color, layerId, layerName } = this.state;
    const {submitChanges, closeDialog, layers} = this.props;
    if(color && layerId) {
      let colorString = rgbObj2Css(color);
      submitChanges(layerId, colorString, color.a, layerName );
    }

    closeDialog();
  };

  setColorObj = (layerId) => {
    const {layers} = this.props;

    if(layerId) {
      const layer = layers.find( l => l.id === layerId);
      let colorString = layer.data.color;
      let color =  rgbCss2Obj(colorString, layer.data.opacity);
  
      this.setState({
        color: color,
        colorChanged: !this.state.colorChanged
      });
    }
  }

  setColor = (newColor) => {

    this.setState({
      color: newColor,
      colorChanged: !this.state.colorChanged})
  }

  /*setOpacity = (opactity) => {
    let {color} = this.state;
    color.a = opactity

    this.setState({color: color})
  } */

  handleClose = () => {
    const {closeDialog} = this.props;
    closeDialog();
  };


  componentDidMount = () => {
    const{currLayer} = this.props;
    this.setLayerId(currLayer);
  }

  componentDidUpdate = (prevProps) => {
    const{currLayer} = this.props;
    if(prevProps.currLayer !== currLayer){
      this.setLayerId(currLayer);
    }
    
  }

  setLayerId = (layerId) => {
    const{layers} = this.props;

    if(layerId){
      let layer = layers.find( l => l.id === layerId);
      let layerName = layer ? layer.displayName: '';
      this.setState({
        layerId: layerId,
        layerName: layerName
      });
      this.setColorObj(layerId);
    }

  }

  changeLayer = (layerId) => {
    const{layers} = this.props;
    let layer = layers.find( l => l.id === layerId);
    let layerName = layer ? layer.displayName : '';

    this.setColorObj(layerId);
    this.setState({
      layerId: layerId,
      layerName: layerName
    });
  }

  setName  = (name) => {
    this.setState({layerName: name});
  }
  
  getContent = () => {
    let {layerId, color, colorChanged, layerName, pickerOpen} = this.state;
    const {layers, classes, theme} = this.props;

    var paperClasses = classNames({
      [classes.dialogPaper]: true,
      [classes.dialogPaperNoScroll]: pickerOpen
    });
    

    return (
    <DialogContent className={paperClasses}>
      <form className={classes.container}>
        <LayersSelect
          className={classes.spaced}
          layers={layers}
          layerId={layerId}
          changeLayer={this.changeLayer.bind(this)} />  
        </form>
        {layerId ? 
        <div style={{ margin: theme.spacing.unit * 2}}>
        <LayerNameTextField layerName={layerName}
            setName={this.setName.bind(this)}
            defaultName={layerName}
            layers={layers}
            acceptedLayerId={layerId}
             />

        <div style={{display: 'flex',
                      flexWrap: 'wrap'}}>
          <div  style={{ margin: theme.spacing.unit * 2, marginLeft: 0, width:'100%'}}>
          <Typography variant="caption" gutterBottom>Color</Typography>
          <ColorPicker
            setColor={this.setColor.bind(this)}
            color={color}
            colorChanged={colorChanged}
            setPickerOpen={this.setPickerOpen.bind(this)}/>
          </div>

        </div>
        </div> : null}  
        
    </DialogContent> );

  
  };


  render() {
    const {open, layers, classes, theme} = this.props;
    const {layerName, pickerOpen} = this.state;
    

    let content = layers.length > 0 ?
      this.getContent()
      : 
      <DialogContent classes={{root: classes.dialogPaper}}>
        <Typography>Add some layers first</Typography>         
      </DialogContent>

    let hasError= layerName.length===0;

    let actions = layers.length > 0 ?
      <SubmitOrCancelAction submitDisabled={hasError} submit={this.submitChanges} cancel={this.handleClose}/>
      : 
      <OkAction ok={this.handleClose}/>

      var paperClasses = classNames({
        [classes.dialogPaper]: true,
        [classes.dialogPaperNoScroll]: pickerOpen,
        [classes.dialogPaperAbsPos]: pickerOpen
      });
       

    return (
      <div>

        <Dialog fullWidth={true} open={open} classes={{
            paper: paperClasses, // class name, e.g. `classes-nesting-root-x`
          }} >

            <DialogTitle id="scroll-dialog-title">Edit Layers</DialogTitle>
            <Divider style={{marginBottom: theme.spacing.unit}}/>

              {content}
              {actions}    
        </Dialog>


      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(EditLayerDialog);