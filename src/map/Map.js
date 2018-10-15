import React, {Component} from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import {getSetting} from 'config';
import {  } from '@material-ui/core';

const styles = theme => ({
    map: {
      height: `100vh`,
      width: '100vw'

    },
    noneShiftContent: {
      marginLeft: -theme.drawerWidth,
    },
    shiftContent: {
      position: 'absolute',
      top: theme.appBarHeight,
      padding: theme.spacing.unit * 3,
      zIndex: 1000
    },
    'content-left': {
      marginLeft: `calc( 0px - ${theme.drawerWidth}px)`,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    'contentShift-left': {
      marginLeft: 0,
    }
  });


class Map extends Component {

  constructor(props) {
    super ();
    mapboxgl.accessToken = getSetting('REACT_APP_MAPBOX_ACCESTOKEN');
    this.state = {
      
    };
  }

    shouldComponentUpdate(nextProps) {
        return true;
      }

    componentDidUpdate(prevProps) {
      if (prevProps.moveLayerUnder !== this.props.moveLayerUnder) {
        let moveLayerUnder = this.props.moveLayerUnder;
        let layerId = moveLayerUnder[0];
        let layerAbove = moveLayerUnder[1];
        this._map.moveLayer(layerId, layerAbove);
      }
      else if (prevProps.deletedLayers !== this.props.deletedLayers){
        this.removeMapLayers(this.props.deletedLayers);
      }else if (prevProps.colorChange !== this.props.colorChange){
        this.changeColor(this.props.colorChange);
      }
      else {
        // Assume layer visibility toggled or layer added
        this.updateLayerVisibility();
      }
    }

    removeMapLayers(layerIds) {
      for (let i in layerIds) {
        let layerId = layerIds[i];
        if(this._map.getSource(layerId)){
          this._map.removeLayer(layerId);
          this._map.removeSource(layerId);
        }
      }
    }

    changeColor(colorChange) {
      const {layers} = this.props;
      let layerId = colorChange.layerId;
      let color = colorChange.color;
      let opacity = colorChange.opacity;

      let layer = layers.find(l => l.id === layerId);
      let map = this._map;

      switch (layer.type) {
        case 'Polygon':
            map.setPaintProperty(layerId, 'fill-color', color);
            map.setPaintProperty(layerId, 'fill-opacity', opacity);
          break;
        case 'LineString':
            map.setPaintProperty(layerId, 'line-color', color);
            map.setPaintProperty(layerId, 'line-opacity', opacity);
          break;
        case 'Point':
            map.setPaintProperty(layerId, 'circle-color', color);
            map.setPaintProperty(layerId, 'circle-opacity', opacity);
          break;
        default:
          console.log('unidentified layer type', layer.type);
      }
    }

    componentDidMount() {
      var zoomLevel = 13;
      var centerCoords = [ 10.397, 63.428,];

      var styleUrl = getSetting('REACT_APP_STYLE_URL');
  
      this._map = new mapboxgl.Map({
        container: this._mapContainer,
        style: styleUrl,
        center: centerCoords,
        zoom: zoomLevel
    });
  }

    updateLayerVisibility() {
      
        let layers = this.props.layers;
    
        layers.forEach( (layer, i) => {
          if (!this._map.isStyleLoaded()) {
            this.waitForStyleLoad(this.handleSingleLayerVisibility.bind(this), layer, i);
          }
          else {
            this.handleSingleLayerVisibility(layer, i);
          }
  
        });
    }

    handleSingleLayerVisibility(layer, i) {
      if (!this._map.isStyleLoaded()) {
        this.waitForStyleLoad(this.handleSingleLayerVisibility.bind(this), layer, i);
      }

      else {
        if( !this._map.getSource(layer.id) ) {
          switch (layer.type) {
            case 'Polygon':
              this.addPolygonLayer(layer, i);
              break;
            case 'LineString':
              this.addLineLayer(layer, i);
              break;
            case 'Point':
              this.addPointLayer(layer, i);
              break;
            default:
              console.log('unidentified layer type', layer.type);
          }
          
        }
        if ( layer.visible ) {
          this._map.setLayoutProperty(layer.id, 'visibility', 'visible');
        }
        else {
          this._map.setLayoutProperty(layer.id, 'visibility', 'none');
        }
      }
    }

    waitForStyleLoad(callback, layer, i) {
      if (!this._map.isStyleLoaded()) {
        setTimeout(() => {
          callback(layer, i);
        }, 200);
      }
    }

    addPointLayer(layer, i) {
      const {layers} = this.props;
      var layerAbove = i === 0 ? null : layers[i-1].id; //Assures that layer gets rendered in correct order
      let map = this._map;
      var visibility = layer.visible ? 'visible': 'none';

      map.addLayer({
        'id': layer.id,
        'type': 'circle',
        'source': {
          'type': 'geojson',
          'data': layer.data
        },
        'layout': {'visibility': visibility },
        'paint': {
          'circle-radius': 4,
          'circle-color': layer.data.color,
          'circle-opacity': layer.data.opacity
        }
      }, layerAbove);
    }

    addLineLayer(layer, i) {
      const {layers} = this.props;
      var layerAbove = i === 0 ? null : layers[i-1].id; //Assures that layer gets rendered in correct order

      let map = this._map;
      var visibility = layer.visible ? 'visible': 'none';

      map.addLayer({
        'id': layer.id,
        'type': 'line',
        'source': {
          'type': 'geojson',
          'data': layer.data
        },
        'layout': {'visibility': visibility },
        'paint': {
          'line-color': layer.data.color,
          'line-opacity': layer.data.opacity,
          'line-width': 6
        }
      }, layerAbove);

    }

    addPolygonLayer(layer, i) {
      const {layers} = this.props;
      var layerAbove = i === 0 ? null : layers[i-1].id; //Assures that layer gets rendered in correct order
      let map = this._map;
      var visibility = layer.visible ? 'visible': 'none';

      map.addLayer({
        'id': layer.id,
        'type': 'fill',
        'source': {
          'type': 'geojson',
          'data': layer.data
        },
        'layout': {'visibility': visibility },
        'paint': {
          'fill-color': layer.data.color,
          'fill-opacity': layer.data.opacity
        }
      },layerAbove);

    }

    render() {
        const {classes, open} = this.props;
        return (
          <div>
            <div className={classes.noneShiftContent}>
            <div ref={el => this._mapContainer = el} className={classes.map} id='map'/>
            </div>            
         
            <div id='mapControllers' className={classNames(classes.shiftContent, classes[`content-left`], {
              [classes.contentShift]: open,
              [classes[`contentShift-left`]]: open,
            })}></div>
         
          </div>);
        }
  }

  export default withStyles(styles, { withTheme: true })(Map);
  