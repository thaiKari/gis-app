import React, { Component } from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {withStyles} from '@material-ui/core/styles';
import './App.css';
import LayerBar from './layout/LayerBar';
import ToolkitBar from './layout/ToolkitBar';
import TopBar from './layout/TopBar';
import Map from './map/Map';
import colorPalette from './globalConstants/colorPalette'

const theme = createMuiTheme({
  palette: {
      //primary: indigo,
      //secondary: red,
      type: 'dark'
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
    layers: []
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
    let layers = this.state.layers;
    var type = this.getJsonType(json);
    var id = this.generateUniqueID(name);
    json.color= this.getDefaultColor(layers.length)
    var layer = {
      id: id,
      type: type,
      displayName: name,
      visible: true,
      data: json 
    }

    layers.push(layer);
    this.setState({layers: layers});
  }

  getDefaultColor(index) {
    var colorChoices = Object.keys(colorPalette);
    var scaledIndex = index * 3;
    var colorIndex = (scaledIndex- Math.floor(scaledIndex /colorChoices.length)*colorChoices.length);
    console.log(colorIndex, colorChoices);
    return colorPalette[colorChoices[colorIndex]];
}

  generateUniqueID(name) {
    var d = new Date();
    var n = d.getTime();

    return name + n;
  }

  getJsonType(json) {
    var type;

    if (json.type === 'FeatureCollection'){
      type = json.features[0].geometry.type;
    } else {
      console.log('json type shoule be FeatureCollection');
      //TODO: support more types
    }

    return type;
  }

  setLayerColor(layerId, color){
    let layers = this.state.layers;
    var layer = layers.find(l => l.id == layerId);
    console.log('layer', layer.data.type);
    layer.data.color = color;
    //this.setState({layers: layers});
    console.log(this.state.layers);
  }

  render() {

    const { classes } = this.props;
    const { drawerOpen, toolDrawerOpen, layers } = this.state;

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
            setLayerColor={this.setLayerColor.bind(this)}/>
          <ToolkitBar
            toolDrawerOpen={toolDrawerOpen}/>

          <main className={classes.content}>          
               <Map/>                  
          </main>

        </div>
      </div>
      </MuiThemeProvider>
    );


  }
}

export default withStyles(styles, { withTheme: true })(App);
