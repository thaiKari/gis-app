import React from 'react';
import {Dialog,
   Typography,
   DialogContent,
   DialogTitle,
   Divider,
   TextField
   } from '@material-ui/core';
import SubmitOrCancelAction from '../DialogActions/SubmitOrCancelAction';
import OkAction from '../DialogActions/OkAction'
import LayersSelect from '../LayersSelect';
import { withStyles } from '@material-ui/core/styles';
import rgbCss2Obj from '../../utils/rgbCss2Obj';
import rgbObj2Css from '../../utils/rgbObj2Css';
import ColorPicker from '../ColorPicker';
import LayerNameTextField from '../LayerNameTextField';
import classNames from 'classnames';
import EditPolygonOptions from '../DialogContent/EditPolygonOptions';

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
    strokeColor: {r:0, g: 0, b:0, a:0},
    radius: '',
    colorChanged: false,
    layerId: null,
    layerName: '',
    pickerOpen: false,
    hasError: false
  };

  setPickerOpen = (pickerOpen) => {
    this.setState({pickerOpen});
  }

  submitChanges = () => {
    const {color, strokeColor, layerId, layerName, radius } = this.state;
    const {submitChanges, closeDialog} = this.props;
    if(color && layerId) {
      let colorString = rgbObj2Css(color);
      let strokeColorString= strokeColor ? rgbObj2Css(strokeColor): '';
      let strokeOpacity = strokeColor ? strokeColor.a : ''
      submitChanges(layerId, colorString, color.a, layerName, strokeColorString, strokeOpacity, radius);
    }

    closeDialog();
  };

  setColorObj = (layerId) => {
    const {layers} = this.props;

    if(layerId) {
      const layer = layers.find( l => l.id === layerId);
      let colorString = layer.data.color;
      let color =  rgbCss2Obj(colorString, layer.data.opacity);
      let strokeColorString = layer.data.strokeColor;
      let radius = layer.data.radius ? layer.data.radius : '';
      if (radius) {
        this.setState({radius});
      }
      if (strokeColorString) {
        let strokeColor = rgbCss2Obj(strokeColorString, layer.data.strokeOpacity);
        this.setState({strokeColor: strokeColor});
      }
      
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

  setstrokeColor = (newColor) => {
    this.setState({
      strokeColor: newColor,
      colorChanged: !this.state.colorChanged})
  }

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
    this.setState({layerName: name,
    hasNameError: name.length===0});
  }

  setRadius = event => {
    let radius = event.target.value;
    if (isNaN(radius) || radius <= 0 ) {
      this.setState({hasRadiusError: true});
    } else {
      this.setState({hasRadiusError: false});
    }
    this.setState({radius});
  };
  
  getContent = () => {
    let {layerId, color, strokeColor, colorChanged, layerName, pickerOpen, radius, hasRadiusError} = this.state;
    const {layers, classes, theme} = this.props;

    var paperClasses = classNames({
      [classes.dialogPaper]: true,
      [classes.dialogPaperNoScroll]: pickerOpen
    });
    let styleContent= '';

    if (layerId ) {
      let layer = layers.find(l => l.id == layerId);
          
      switch (layer.type) {
        case 'Polygon':
        case 'MultiPolygon':
        styleContent =  <EditPolygonOptions
                        setColor={this.setColor.bind(this)}
                        color={color}
                        colorChanged={colorChanged}
                        setPickerOpen={this.setPickerOpen.bind(this)}
                        setstrokeColor={this.setstrokeColor.bind(this)}
                        strokeColor={strokeColor}
                        />      
          break;

          case 'Point':

          styleContent =          
          <div  style={{display: 'flex',
            flexWrap: 'wrap',
            justifyContent: "space-between",
            margin: theme.spacing.unit * 2,
            marginLeft: 0,
            width:'100%'}}>
          <div style={{width: '40%'}}>
          <Typography variant="caption" gutterBottom>Fill Color</Typography>
          <ColorPicker
            setColor={this.setColor.bind(this)}
            color={color}
            colorChanged={colorChanged}
            setPickerOpen={this.setPickerOpen.bind(this)}/>
          </div>
          <div style={{width: '40%'}}>

          <TextField
              error = {hasRadiusError}
              value={radius}
              label="Point Radius (px)"
              onChange={this.setRadius}
            />
            </div>
          </div>
            break;

        default:
          styleContent =          
          <div  style={{ margin: theme.spacing.unit * 2, marginLeft: 0, width:'100%'}}>
          <Typography variant="caption" gutterBottom>Color</Typography>
          <ColorPicker
            setColor={this.setColor.bind(this)}
            color={color}
            colorChanged={colorChanged}
            setPickerOpen={this.setPickerOpen.bind(this)}/>
          </div>

      }
    }


    

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

          {styleContent}

        </div>
        </div> : null}  
        
    </DialogContent> );

  
  };


  render() {
    const {open, layers, classes, theme} = this.props;
    const { pickerOpen, hasNameError, hasRadiusError} = this.state;
    
    let hasError = hasNameError || hasRadiusError;

    let content = layers.length > 0 ?
      this.getContent()
      : 
      <DialogContent classes={{root: classes.dialogPaper}}>
        <Typography>Add some layers first</Typography>         
      </DialogContent>

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