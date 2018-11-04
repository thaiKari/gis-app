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
import bufferFunction from '../../utils/geoprocessing/bufferFunction';
import bboxFunction from '../../utils/geoprocessing/bboxFunction';
import voronoiFunction from '../../utils/geoprocessing/voronoiFunction';
import Loadable from 'react-loadable'
import LoadingCircular from '../../utils/Loading/LoadingCirular';
import MultiLayerSelect from '../MultiLayerSelect';
import LayerNameTextField from '../LayerNameTextField';
import { withSnackbar } from 'notistack';
import roundToNdecimals from '../../utils/roundToNdecimals';
import DialogFeedback from '../DialogContent/DialogFeedback';
import BboxTextField from '../BboxTextField';
import findLayerById from '../../utils/findLayerById';


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
        //overflowY: "visible",
        maxHeight: '100vh'
      },
      spaced: {
        marginBottom: 50,
      },
      spacedALittle: {
        marginTop: theme.spacing.unit *3
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
        layerIds: [], //Ids of the selectedLayers
        outputName:'',
        errorMessage:'',
        distance: '',
        bbox: ['','','','']
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
          case 'bbox':
            func = bboxFunction;
            break;
          case 'voronoi':
            func = voronoiFunction;
            break;
          default:
            break;
        }
        this.setState({processingFunction: func});
      }

    calculate = () => {
    const {closeDialog, receiveNewJson, type, enqueueSnackbar, layers} = this.props;
    const {bbox, processingFunction, layerIds, outputName, distance} = this.state;
    
    let selectedLayersDataList = [];

    for (var i in layerIds ) {
      //let layer = layers.find( l => l.id === layerIds[i] );
      let layer = findLayerById(layerIds[i], layers);
      let data = layer ? layer.data : null;
      selectedLayersDataList.push( data ) 
    }

      let newJson;
      let feedbackText = '';

      if (type === 'buffer') {       
        newJson = processingFunction(selectedLayersDataList[0], distance);       
      }
      
      else if (type === 'bbox') {
       let res = processingFunction(selectedLayersDataList)
        newJson = res.newJson;
        if(res.bbox) {
          feedbackText = 'bbox calculated. [minX, minY, maxX, maxY] = [ ' +  roundToNdecimals(res.bbox[0] ,4) + ', '  +  roundToNdecimals(res.bbox[1] ,4) + ', ' +  roundToNdecimals(res.bbox[2] ,4) + ', ' +  roundToNdecimals(res.bbox[3] ,4) + ' ]';
        }
      }
      else if (type === 'voronoi') {
        newJson = processingFunction(selectedLayersDataList, bbox)
       }
      
      else if (type === 'intersect' || type === 'union'  || type === 'difference'){
        newJson = processingFunction(selectedLayersDataList[0], selectedLayersDataList[1]);
      }

       if(newJson.type === "FeatureCollection") {
        receiveNewJson(newJson, outputName);
        let succesMessage =  type + ' layer was successfully created';
        feedbackText = feedbackText ? feedbackText : succesMessage;
        try {
          enqueueSnackbar(feedbackText, {variant: 'success'});
        } catch (error) {
          console.log('error supressed')
        }
        
        closeDialog();
       } else {
         this.setState({errorMessage: newJson});
       }
       
    };

    setError = (message) => {
      this.setState({errorMessage: message});
    }

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

    setBbox = (bbox) => {
      this.setState({bbox: bbox});
    }
    

    getContent = type => {
      const {layers, classes} = this.props;
      const {outputName, errorMessage, distance, layerIds, bbox} = this.state;
      
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
              layerId={layerIds[0]}
            />
             );
        }

        if (type === 'bbox') {
          return (
            <DialogContent classes={{root: classes.dialogPaper}} >
                <MultiLayerSelect
                layers={layers}
                setLayerIds={this.setLayerIds.bind(this)}
                />
                <LayerNameTextField
                  layerName={outputName}
                  setName={this.setName.bind(this)}
                  defaultName={outputName}
                  layers={layers}
                  layerIndex={-1}
                  promt={'Output layer name'} />          
            </DialogContent> );

        }
        if (type === 'voronoi') {
          let layerOptions = layers.filter(layer => layer.type === "Point");
          return (
            <DialogContent classes={{root: classes.dialogPaper}} >
            <DialogFeedback message={type + ' operation only accepts Point layers'}/>
            {errorMessage.length > 0 ?
                <DialogFeedback message={errorMessage} variant={'error'} />
                : null
              }   
                <div className={classes.spacedALittle}></div>
                <MultiLayerSelect
                className={classes.spacedALittle}
                layers={layerOptions}
                setLayerIds={this.setLayerIds.bind(this)}
                />
                <div className={classes.spacedALittle}></div>
                <BboxTextField
                  layers={layerOptions}
                  setBbox={this.setBbox.bind(this)}
                  bbox={bbox}
                  layerIds={layerIds}
                  setError={this.setError.bind(this)}/>
                <LayerNameTextField
                  layerName={outputName}
                  setName={this.setName.bind(this)}
                  defaultName={outputName}
                  layers={layers}
                  layerIndex={-1}
                  promt={'Output layer name'} /> 
            </DialogContent> );
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

export default withStyles(styles, { withTheme: true })(withSnackbar(GeoProcessingDialog));