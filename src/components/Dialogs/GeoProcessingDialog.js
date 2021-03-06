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
import clipFunction from '../../utils/geoprocessing/clipFunction';
import Loadable from 'react-loadable'
import LoadingCircular from '../../utils/Loading/LoadingCirular';
import MultiLayerSelect from '../MultiLayerSelect';
import LayerNameTextField from '../LayerNameTextField';
import { withSnackbar } from 'notistack';
import roundToNdecimals from '../../utils/roundToNdecimals';
import DialogFeedback from '../DialogContent/DialogFeedback';
import BboxTextField from '../BboxTextField';
import findLayerById from '../../utils/findLayerById';
import LayersSelect from '../LayersSelect';

/**
 * Contains content of All geoprocessing.
 */


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
        bbox: ['','','',''],
        clipLayer: ''
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
          case 'clip':
            func = clipFunction;
            break;
          default:
            break;
        }
        this.setState({processingFunction: func});
      }

    calculate = () => {
    const {closeDialog, type, layers, enqueueSnackbar} = this.props;
    const {bbox, processingFunction, layerIds, outputName, distance, clipLayer} = this.state;
    
    let selectedLayersDataList = [];

    for (var i in layerIds ) {
      //let layer = layers.find( l => l.id === layerIds[i] );
      let layer = findLayerById(layerIds[i], layers);
      if( layer) {
        let data = layer ? layer.data : null;
        data.dispName = layer.displayName;
        selectedLayersDataList.push( data );
      }
       
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
        newJson = processingFunction(selectedLayersDataList, bbox);
        newJson.opacity = 0.5;
       }
      else if (type === 'clip') {
        let clipAreaLayer = layers.find( l => l.id === clipLayer);
        let errorMessage = '';
        
        if(clipAreaLayer && selectedLayersDataList.length > 0) {
         let clipArea = clipAreaLayer.data
        
        let newJsons = processingFunction(selectedLayersDataList, clipArea);
        
          if( newJson === 'Select layers to proceed') {
            errorMessage = newJson;
            this.setState({errorMessage: errorMessage});
          } else {
            newJsons.forEach(newJson => {
              if (typeof newJson === 'string') {
                enqueueSnackbar(newJson, {variant: 'error'});
              }
              else {
                let newName = newJson ? 'clip_' + newJson.dispName : ';';  
                this.submitNewLayer(newJson,'',newName, false);
              }
            });
          }
      } else if (!clipAreaLayer ) {
        errorMessage = 'select clip layer'
        this.setState({errorMessage: errorMessage});
      } else if ( selectedLayersDataList.length === 0) {
        errorMessage = 'Select layers to proceed';
        this.setState({errorMessage: errorMessage});
      }

        if(errorMessage.length === 0 ) {
          closeDialog();
        }
      }
      
      else if (type === 'intersect' || type === 'union'  || type === 'difference'){
        newJson = processingFunction(selectedLayersDataList[0], selectedLayersDataList[1]);
      }

      if(newJson) {
        this.submitNewLayer(newJson, feedbackText, outputName);
      }       
       
    };

    submitNewLayer = (newJson, feedbackText, outputName, closeAfter=true) => {
      const {receiveNewJson, type, enqueueSnackbar, closeDialog} = this.props;
      if(newJson.type === "FeatureCollection") {
        receiveNewJson(newJson, outputName);
        let succesMessage =  type + ' layer was successfully created';
        feedbackText = feedbackText ? feedbackText : succesMessage;
        try {
          enqueueSnackbar(feedbackText, {variant: 'success'});
        } catch (error) {
          console.log('error supressed')
        }
        if (closeAfter) {
          closeDialog();
        }
       } else {
         this.setState({errorMessage: newJson});
       }
    }

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

    setClipLayer = (layerId) => {
      this.setState({clipLayer: layerId});
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
                  optional={true}
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
        if (type === 'clip') {
          let polygonLayers = layers.filter(layer => layer.type === "Polygon" || layer.type === "MultiPolygon"  );
          let {clipLayer} = this.state;
          return (
            <DialogContent classes={{root: classes.dialogPaper}} >
            {errorMessage.length > 0 ?
                <DialogFeedback message={errorMessage} variant={'error'} />
                : null
              }   
                <div className={classes.spacedALittle}></div>
                <MultiLayerSelect
                className={classes.spacedALittle}
                layers={layers}
                setLayerIds={this.setLayerIds.bind(this)}
                promt={'Choose layers to clip'}
                />
               
                <div className={classes.spacedALittle}></div>
                <LayersSelect
                className={classes.spaced}
                layers={polygonLayers}
                layerId={clipLayer}
                changeLayer={this.setClipLayer.bind(this)}
                promt = {'Choose clip layer (polygon)'} />
                
                <div className={classes.spacedALittle}></div>
                <Typography>This operation will clip all selected layers to the area defined by the clip polygon.
                  Output layer names will by 'clip_' + layer name </Typography>

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