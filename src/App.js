import React, { Component } from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {withStyles} from '@material-ui/core/styles';
import './App.css';
import LayerBar from './layout/LayerBar';
//import ToolkitBar from './layout/ToolkitBar';
import TopBar from './layout/TopBar';
import Map from './map/Map';
import reorder from './utils/reorderList'
import {teal, amber} from '@material-ui/core/colors';
import createJsonLayer from './utils/createJsonLayer';
import findIndexWithAttribute from './utils/findIndexWithAttribute';
import Loading from './components/Loading';
import Loadable from 'react-loadable'

const ToolkitBar = Loadable({
  loader: () => import('./layout/ToolkitBar'),
  loading: Loading,
});


const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: amber,
    type: 'dark',
  },
  drawerWidth: 240,
  appBarHeight: 60,
  typography: {
      fontFamily: 'Gamja+Flower'
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
  });
  
  class App extends Component {
  state = {
    drawerOpen: true,
    toolDrawerOpen: false,
    layers: [],
    layersChange: false, //needed to recognise change in layers
    moveLayerUnder: [], //Array with values [layerID, layerAboveID]. Change in state prompts map
    deletedLayers:[]
  };


  handleDrawerToggle = () => {
    let drawerOpen= !this.state.drawerOpen;
    this.setState({ drawerOpen: drawerOpen });
  }

  toggleToolDrawer = () => {
    let toolDrawerOpen= !this.state.toolDrawerOpen;
    this.setState({ toolDrawerOpen: toolDrawerOpen });
  }

  receiveNewJson = (json, name) => {
    let {layers, layersChange} = this.state;
    var layer = createJsonLayer(json, name, layers.length -1)

    layers.push(layer);
    layersChange = !layersChange;
    this.setState({
      layers: layers,
      layersChange: layersChange });
  }

  addLayers = (newLayers) => {
    let {layers, layersChange} = this.state;
    

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
      deletedLayers: layerIds });
  }

  submitChanges = (layerId, color, opacity, layerName) => {
    let {layers} = this.state;

    let layer = layers.find(l => l.id === layerId);

    layer.data.color= color;
    layer.data.opacity = opacity;
    layer.displayName = layerName;

    this.setState({
      layers: layers,
      colorChange: {layerId: layerId, color: color, opacity: opacity}
    });
  }

  render() {

    const { classes } = this.props;
    const { colorChange,
      deletedLayers,
      moveLayerUnder,
      drawerOpen,
      toolDrawerOpen,
      layers,
      layersChange } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <TopBar
            handleDrawerToggle={this.handleDrawerToggle.bind(this)}
            toggleToolDrawer={this.toggleToolDrawer.bind(this)}/>
          <LayerBar
            handleDrawerToggle={this.handleDrawerToggle.bind(this)}
            drawerOpen={drawerOpen}
            receiveNewJson={this.receiveNewJson.bind(this)}
            layers={layers}
            layersChange={layersChange}
            toggleVisibility={this.toggleVisibility.bind(this)}
            reorderLayersList={this.reorderLayersList.bind(this)}
            addLayers={this.addLayers.bind(this)}
            deleteLayers={this.deleteLayers.bind(this)}
            submitChanges={this.submitChanges.bind(this)}/>
          {toolDrawerOpen ?
          <ToolkitBar
            toolDrawerOpen={toolDrawerOpen}/>
          : null}

          <main className={classes.content}>          
               <Map 
               layers={layers}
               moveLayerUnder={moveLayerUnder}
               deletedLayers={deletedLayers}
               colorChange={colorChange}/>                  
          </main>

        </div>
      </div>
      </MuiThemeProvider>
    );


  }
}

export default withStyles(styles, { withTheme: true })(App);
