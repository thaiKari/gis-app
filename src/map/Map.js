import React, {Component} from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import {getSetting} from 'config';
import {  } from '@material-ui/core';
//mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';


const styles = theme => ({
    map: {
      //height: `calc(100vh - ${theme.appBarHeight}px)`,
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
      this.updateLayerVisibility();
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
            this.waitForStyleLoad(this.handleSingleLayerVisibility.bind(this), layer);
          }
          else {
            this.handleSingleLayerVisibility(layer);
          }
  
        });
    }

    handleSingleLayerVisibility(layer) {
      if (!this._map.isStyleLoaded()) {
        this.waitForStyleLoad(this.handleSingleLayerVisibility.bind(this), layer);
      }

      else {
        if( !this._map.getSource(layer.id) ) {
          switch (layer.type) {
            case 'Polygon':
              this.addPolygonLayer(layer);
              break;
            case 'LineString':
              this.addLineLayer(layer);
              break;
            case 'Point':
              console.log('TODO: ADD Point TO MAP');
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

    waitForStyleLoad(callback, layer) {
      if (!this._map.isStyleLoaded()) {
        setTimeout(() => {
          callback(layer);
        }, 200);
      }
    }

    addLineLayer(layer) {
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
          'line-width': 6
        }
      });

    }

    //TODO: assure correct order also in relation to basemap
    addPolygonLayer(layer) {
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
          'fill-opacity': 0.8
        }
      });

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
  