import React, { Component } from 'react';
import {MuiThemeProvider, createMuiTheme, withStyles} from '@material-ui/core/styles';
import './App.css';
import reorder from './utils/reorderList'
import {teal, amber} from '@material-ui/core/colors';
import {IconButton} from '@material-ui/core';
import {Close} from '@material-ui/icons';
import createJsonLayer from './utils/createJsonLayer';
import findIndexWithAttribute from './utils/findIndexWithAttribute';
import Loadable from 'react-loadable'
import LoadingFullPage from './utils/Loading/LoadingFullpageCirular';
import checkIfLayerNameExists from './utils/checkIfLayerNameExists';
import { SnackbarProvider } from 'notistack';
import SnackbarQuer from './components/SnackbarQuer';


const ToolkitBar = Loadable({
  loader: () => import('./layout/ToolkitBar'),
  delay: 300, // 0.3 seconds
  loading: LoadingFullPage,
});

const Map = Loadable({
  loader: () => import('./map/Map'),
  delay: 300, // 0.3 seconds
  loading: LoadingFullPage
});

const LayerBar = Loadable({
  loader: () => import('./layout/LayerBar'),
  delay: 300, // 0.3 seconds
  loading: LoadingFullPage
});

const ToolbarIconButton = Loadable({
  loader: () => import('./layout/ToolbarIconButton'),
  delay: 300, // 0.3 seconds
  loading: LoadingFullPage
});

const DrawerBtn = Loadable({
  loader: () => import('./components/DrawerBtn'),
  delay: 300, // 0.3 seconds
  loading: LoadingFullPage
});

const AttributeTable = Loadable({
  loader: () => import('./layout/AttributeTable'),
  delay: 300, // 0.3 seconds
  loading: LoadingFullPage
});


const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: amber,
    type: 'dark',
  },
  appBarHeight: 60,
  typography: {
    useNextVariants: true,
  },
  overrides: {
    SnackbarItem: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: 'white', // Some CSS
      },
    },
  }
  });

  const styles = ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
    },
    appFrame: {
      height: '100vh',
      zIndex: 1,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      width: '100%',
    },
    snackbarMessage: {
      color:'white',
      overflowX: 'visible'
    },
    allowFullWidth: {
      maxWidth: '100%'
    }
  });
  
  class App extends Component {
  state = {
    drawerOpen: true,
    toolDrawerOpen: false,
    layers: [],
    layersChange: false, //needed to recognise change in layers
    moveLayerUnder: [], //Array with values [layerID, layerAboveID]. Change in state prompts map
    deletedLayers:[],
    drawerWidth: 240,
    acceptedTypes: ['Polygon', 'MultiPolygon', 'Point', 'LineString', 'MultiLineString' ],
    zoomTo: '',
    lastClickedLayer: '',
    AttributeTableOpen: false

  };
  
  changeDrawerWidth = (newWidth) => {
    this.setState({
      drawerOpen: true,
      drawerWidth: newWidth});
  }

  handleDrawerToggle = () => {
    let drawerOpen= !this.state.drawerOpen;
    this.setState({ drawerOpen: drawerOpen });
  }

  toggleToolDrawer = () => {
    let toolDrawerOpen= !this.state.toolDrawerOpen;
    this.setState({ toolDrawerOpen: toolDrawerOpen });
  }

  receiveNewJson = (json, name) => {
    let {layers, layersChange, acceptedTypes} = this.state;
    let newName = this.checkLayerName(name)
    var layer = createJsonLayer(json, newName, layers.length -1)
    

    if( !layer.type) {
      this.setState({ snackbarMessages: {message: layer, options: {variant: 'error'}}  });
    } else if ( !acceptedTypes.includes(layer.type) ) {
      this.setState({ snackbarMessages: {message: name + ': type ' + layer.type + ' is not supported', options: {variant: 'error'}}  });
    }
    
    else {
      layers.unshift(layer);
      layersChange = !layersChange;
      this.setState({
        layers: layers,
        layersChange: layersChange });
    }
  }

  addLayers = (newLayers) => {
    let {layers, layersChange, acceptedTypes} = this.state;
    newLayers = newLayers.filter(l => acceptedTypes.includes(l.type));
    

    layers.push.apply(layers, newLayers)
    this.setState({
      layers: layers,
      layersChange: !layersChange
    });
  }

  toggleVisibility(layerId) {
    let layers = this.state.layers;
    let layer = layers.find(l => l.id === layerId);
    layer.visible = !layer.visible;

    this.setState({layers: layers});
  }

  getLayer(layerId) {
    let layers = this.state.layers;
    return layers.find(l => l.id === layerId);
  }

  reorderLayersList(startIndex, endIndex) {

    let layers = this.state.layers;
    let layerId = layers[startIndex].id;

    layers = reorder(layers, startIndex, endIndex);

    let layerAboveId = endIndex === 0 ? null: layers[endIndex-1].id;

    this.setState({
      moveLayerUnder: [layerId, layerAboveId],
      layers: layers
    });
  }

  deleteLayers(layerIds) {
    let {layers, layersChange} = this.state;

    for (var i in layerIds) {
      let indexToDelete = findIndexWithAttribute(layers, 'id', layerIds[i]);
      if (indexToDelete > -1) {
        layers.splice(indexToDelete, 1);
      }
    }

    this.setState({
      layers: layers,
      layersChange: !layersChange,
      deletedLayers: layerIds,
     });
  }

  receiveNewData = (layerId) => {
    // Something ind the layer feature data json has been changed. Map needs to update.
    let {layers} = this.state;

    let layer = layers.find((l) => l.id === layerId);

    if(layer.data.features.length < 1 ){
      this.setState({ snackbarMessages: {message: 'No features remaining. Layer: ' + layer.displayName + ' will be deleted', options: {variant: 'info'}}  });
      this.deleteLayers([layerId]);
      this.closeAttribTable();      
    }
    else {
      this.setState({
        dataChange: !this.state.dataChange,
        dataChangeId: layerId
      });
    }

  }

  submitChanges = (layerId, color, opacity, layerName, strokeColor, strokeOpacity, radius) => {
    let {layers} = this.state;

    let layer = layers.find((l) => l.id === layerId);
    let index = findIndexWithAttribute(layers, 'id', layerId);

    layer.data.color= color;
    layer.data.opacity = opacity;
    layer.data.strokeColor = strokeColor;
    layer.data.strokeOpacity = strokeOpacity;
    layer.data.radius = radius;
    let i = 1;
    let newLayerName = layerName;
    while(checkIfLayerNameExists(newLayerName, layers, index)){
      newLayerName = layerName + '_' + i;
      i += 1;
    }
    layer.displayName = newLayerName
      

    this.setState({
      layers: layers,
      colorChange: {layerId: layerId, color: color, opacity: opacity, strokeColor:strokeColor, strokeOpacity:strokeOpacity, radius:radius}
    });
  }

  zoomTo = (layerId) => {
    this.setState({zoomTo: layerId})
  }

  openAttribTable = (layerId) => {
    this.setState({
      lastClickedLayer: layerId,
      AttributeTableOpen: true});
  }

  closeAttribTable = () => {
    this.setState({
      AttributeTableOpen: false});
  }

  checkLayerName = (name) => {
    let {layers} = this.state;
    let i = 1;
    let newName = name;
    let hasDuplicate = true;

    while(hasDuplicate){
      hasDuplicate = false;

      for(var j = 0 ; j < layers.length; j++) {
        if(newName === layers[j].displayName ){
          hasDuplicate = true;
          newName = name + '_' + i;
          i += 1;
        }
      }
    }

    return newName;
  }

  removeLayer = (layerId) => {
    let {layers} = this.state;

    layers = layers.filter(l => l.id !== layerId);
    this.setState({layers: layers})
  }

  render() {

    const { classes } = this.props;
    const { colorChange,
      deletedLayers,
      moveLayerUnder,
      drawerOpen,
      toolDrawerOpen,
      layers,
      layersChange,
      drawerWidth,
      snackbarMessages,
      acceptedTypes,
      zoomTo,
      AttributeTableOpen,
      lastClickedLayer,
      dataChange,
      dataChangeId } = this.state;

    return (

      <MuiThemeProvider theme={theme}>
        <SnackbarProvider
          classes={{
            message: classes.snackbarMessage, // class name, e.g. `classes-nesting-root-x`
            variantSuccess: classes.allowFullWidth,
            variantError: classes.allowFullWidth,
            variantWarning: classes.allowFullWidth,
            variantInfo: classes.allowFullWidth,
          }}
          maxSnack={4}
          action={[
            <IconButton key={1} size="small"><Close/></IconButton>
            ]}>

      <div className={classes.root}>
        <div className={classes.appFrame}>

          <SnackbarQuer messages={snackbarMessages}/>

          <ToolbarIconButton
            toolDrawerOpen={toolDrawerOpen}
            toggleToolDrawer={this.toggleToolDrawer.bind(this)} />

          <LayerBar
            handleDrawerToggle={this.handleDrawerToggle.bind(this)}
            drawerOpen={drawerOpen}
            drawerWidth = {drawerWidth}
            receiveNewJson={this.receiveNewJson.bind(this)}
            layers={layers}
            layersChange={layersChange}
            toggleVisibility={this.toggleVisibility.bind(this)}
            reorderLayersList={this.reorderLayersList.bind(this)}
            addLayers={this.addLayers.bind(this)}
            checkLayerName={this.checkLayerName.bind(this)}
            deleteLayers={this.deleteLayers.bind(this)}
            submitChanges={this.submitChanges.bind(this)}
            acceptedTypes={acceptedTypes}
            zoomTo = {this.zoomTo.bind(this)}
            openAttribTable={this.openAttribTable.bind(this)}/>
          {toolDrawerOpen ?
          <ToolkitBar
            toolDrawerOpen={toolDrawerOpen}
            layers={layers}
            receiveNewJson={this.receiveNewJson.bind(this)}/>
          : null}

          {AttributeTableOpen?
            <AttributeTable
            open={AttributeTableOpen}
            layerId={lastClickedLayer}
            layers={layers}
            closeAttribTable={this.closeAttribTable.bind(this)}
            receiveNewData={this.receiveNewData.bind(this)}
            receiveNewJson={this.receiveNewJson.bind(this)}/>          
          :null}


          <main className={classes.content}>      
               <Map
               layers={layers}
               moveLayerUnder={moveLayerUnder}
               deletedLayers={deletedLayers}
               colorChange={colorChange}
               drawerWidth={drawerWidth}
               drawerOpen={drawerOpen}
               zoomTo={zoomTo}
               zoomToReset={this.zoomTo.bind(this)}
               removeLayer={this.removeLayer.bind(this)}
               dataChange={dataChange}
               dataChangeId={dataChangeId}/>

              <DrawerBtn 
              handleDrawerToggle={this.handleDrawerToggle.bind(this)}
              drawerOpen={drawerOpen}
              drawerWidth = {drawerWidth}
              changeDrawerWidth = {this.changeDrawerWidth.bind(this)}/>                  
          </main>

        </div>
      </div>
      </SnackbarProvider>
      </MuiThemeProvider>
      
      
    );


  }
}

export default withStyles(styles, { withTheme: true })(App);

/**
 *           <TopBar
            handleDrawerToggle={this.handleDrawerToggle.bind(this)}
            toggleToolDrawer={this.toggleToolDrawer.bind(this)}/>
 */