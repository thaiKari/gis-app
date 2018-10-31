import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Dialog,
    Typography,
    DialogContent,
    DialogTitle,
    } from '@material-ui/core';
import SubmitOrCancelAction from '../DialogActions/SubmitOrCancelAction';
import OkAction from '../DialogActions/OkAction'
import intersectFunction from '../../utils/geoprocessing/intersectFunction';
import differenceFunction from '../../utils/geoprocessing/differenceFunction';
import unionFunction from '../../utils/geoprocessing/unionFunction';
import DoubleLayerPicker from '../DoubleLayerPicker';
import LayerNameTextField from '../LayerNameTextField';
import DialogFeedback from '../DialogContent/DialogFeedback';


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

  class GeoProcessingDialog extends Component {
    state = {
        processingFunction: null,
        layerNums: [-1, -1], //Indices of the selectedLayers
        outputName:'',
        errorMessage:''
    }

    componentDidMount() {
        const {type} = this.props;
        this.setProcessingFunction(type);
        this.setState({outputName: type});
    }

    setLayerNums = (layerNums) => {
      this.setState({layerNums: layerNums})
    }

    setProcessingFunction = (type) => {
        let func = null;
  
        switch (type) {
          case 'intersect':
            func = intersectFunction;
            break;
          case 'union':
            func = unionFunction;
            break;
          case 'difference':
            func = differenceFunction;
            break;
        
          default:
            break;
        }
        this.setState({processingFunction: func});
      }

    calculate = () => {
    const {closeDialog, layers, receiveNewJson} = this.props;
    const {processingFunction, layerNums, outputName} = this.state;

      let l1, l2 

      if (layers[layerNums[0]]) {
        l1 = layers[layerNums[0]].data;
      } if( layers[layerNums[1]]) {
        l2 = layers[layerNums[1]].data;
      }

       let newJson = processingFunction(l1, l2);

       if(newJson.type === "FeatureCollection") {
        receiveNewJson(newJson, outputName)
        closeDialog();
       } else {
         this.setState({errorMessage: newJson});
       }
       
    };

    handleClose = () => {
        const {closeDialog} = this.props;
        closeDialog();
    };

    setName  = (name) => {
      this.setState({outputName: name});
    }

    getContent = type => {
      
      if(type === 'intersect' || type === 'difference' || type === 'union'){
        const {layers, theme} = this.props;
        const {outputName, errorMessage, layerNums} = this.state;
        let prompt1 = type === 'difference' ? 'Input Layer' : 'Layer 1'
        let prompt2 = type === 'difference' ? 'Difference Layer' : 'Layer 2'

        if(layerNums[0] >= 0 ) {
          let layer = layers[layerNums[0]];
          prompt1 += ' (Type: ' + layer.data.features[0].geometry.type  + ')'
        }
        if(layerNums[1] >= 0 ) {
          let layer = layers[layerNums[1]];
          prompt2 += ' (Type: ' + layer.data.features[0].geometry.type  + ')'
        }

        let layerOptions = layers;

        if (type === 'intersect' || type === 'difference' ) {
          layerOptions = layers.filter(layer => layer.type === 'Polygon' || layer.type === 'MultiPolygon' );
        }

        return (
            <DialogContent>
              {errorMessage.length > 0 ?
                <DialogFeedback message={errorMessage} variant={'error'} />
                : null
              }
              {type === 'intersect' || type === 'difference'  ?
                <DialogFeedback message={type + ' operation only accepts Polygons'}/>
                :
                null
              }
              
              <DoubleLayerPicker prompt1={prompt1}
                  prompt2={prompt2}
                  layers={layerOptions}
                  setLayerNums={this.setLayerNums.bind(this)}/>
                <div style={{margin: theme.spacing.unit}}>
                <LayerNameTextField
                  layerName={outputName}
                  setName={this.setName.bind(this)}
                  defaultName={outputName}
                  layers={layerOptions}
                  layerIndex={-1}
                  promt={'Output layer name'} />
                
                  </div>         
            </DialogContent> );
        };

        return (
            <DialogContent>
                <Typography>{type}</Typography>            
            </DialogContent> );
    }


    
    render() {

      const {open, layers, type, classes} = this.props;
     
      let content = layers.length > 0 ?
      this.getContent(type)
      : 
      <DialogContent>
        <Typography>Add some layers first</Typography>         
      </DialogContent>

        let actions = layers.length > 0 ?
        <SubmitOrCancelAction submitText='Calculate' submit={this.calculate} cancel={this.handleClose}/>
        : 
        <OkAction ok={this.handleClose}/>

        let diaglogTitle = type.charAt(0).toUpperCase() + type.slice(1);
  
      return (
        <Dialog
        fullWidth={true}
        open={open}
        onClose={this.handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        classes={{ paper: classes.dialogPaper }}
        
      >
          <DialogTitle id="scroll-dialog-title">{diaglogTitle}</DialogTitle>
            {content}
            {actions}
      </Dialog>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(GeoProcessingDialog);