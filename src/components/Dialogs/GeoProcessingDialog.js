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
import bufferFunction from '../../utils/geoprocessing/bufferFunction'

import Loadable from 'react-loadable'
import LoadingCircular from '../../utils/Loading/LoadingCirular';

const BufferContent = Loadable({
  loader: () => import('../DialogContent/BufferContent'),
  delay: 300, // 0.3 seconds
  loading: LoadingCircular,
});

const LayerLayerGeoprocessingContent = Loadable({
  loader: () => import('../DialogContent/LayerLayerGeoprocessingContent'),
  delay: 300, // 0.3 seconds
  loading: LoadingCircular,
});

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
        layerIds: ['', ''], //Ids of the selectedLayers
        outputName:'',
        errorMessage:'',
    }

    componentDidMount() {
        const {type} = this.props;
        this.setProcessingFunction(type);
        this.setState({outputName: type,});
    }

    setLayerIds = (layerIds) => {
      this.setState({layerIds: layerIds})
    }

    setSingleLayerId = (layerId) => {
      let {layerIds} = this.state;
      layerIds[0] = layerId;
      this.setState({layerIds: layerIds})
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
          case 'buffer':
            func = bufferFunction;
            break;
          default:
            break;
        }
        this.setState({processingFunction: func});
      }

    calculate = () => {
    const {closeDialog, layers, receiveNewJson, type} = this.props;
    const {processingFunction, layerIds, outputName, distance} = this.state;

    let l1 = layers.find( l => l.id === layerIds[0] );
    let l2 = layers.find( l => l.id === layerIds[1] );
    let data1, data2;

      if (l1) {
        data1 = l1.data;
      } if (l2) {
        data2 = l2.data;
      } 

      let newJson;

      if(type === 'buffer') {
        newJson = processingFunction(data1, distance);
      } else { //intersect, union or distance
        newJson = processingFunction(data1, data2);
      }

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

    changeDistance = (value) => {
      this.setState({distance: value});
    }
    

    getContent = type => {
      const {layers} = this.props;
      const {outputName, errorMessage, distance, layerIds} = this.state;
      
      if(type === 'intersect' || type === 'difference' || type === 'union'){

        return (
          <LayerLayerGeoprocessingContent
              errorMessage={errorMessage}
              layers={layers}
              layerIds={layerIds}
              setLayerIds={this.setLayerIds.bind(this)}
              outputName={outputName}
              setName={this.setName.bind(this)}
              type={type}
          /> );
        };

        if (type === 'buffer') {
          return (
            <BufferContent
              errorMessage={errorMessage}
              layers={layers}
              changeLayer={this.setSingleLayerId.bind(this)}
              distance={distance}
              changeDistance={this.changeDistance.bind(this)}
              outputName={outputName}
              setName={this.setName.bind(this)}
            />
             );

        }

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