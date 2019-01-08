import React, {Component} from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import {getSetting} from 'config';
import bbox from '@turf/bbox';

/**
 * The map.
 */

const styles = theme => ({
    map: {
      height: `100vh`,
      width: '100vw'

    },
    noneShiftContent: {
      marginLeft: -theme.drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClosed: {
      marginLeft: 0,
    }
  });


class Map extends Component {

  constructor(props) {
    super ();
    mapboxgl.accessToken = getSetting('REACT_APP_MAPBOX_ACCESTOKEN');
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

  shouldComponentUpdate(nextProps) {
    return true;
  }

componentDidUpdate(prevProps) {
  if(prevProps.dataChange !== this.props.dataChange){
    let layerId = this.props.dataChangeId;
    this._map.removeLayer(layerId);
    this._map.removeSource(layerId);
    this.updateLayerVisibility();
  }
  else if (prevProps.moveLayerUnder !== this.props.moveLayerUnder) {
    let moveLayerUnder = this.props.moveLayerUnder;
    let layerId = moveLayerUnder[0];
    let layerAbove = moveLayerUnder[1];
    this._map.moveLayer(layerId, layerAbove);
    if (this._map.getSource(layerId +'_outline')) {
      this._map.moveLayer(layerId +'_outline', layerAbove);
    }
  }
  else if (prevProps.deletedLayers !== this.props.deletedLayers){
    this.removeMapLayers(this.props.deletedLayers);
  } else if (prevProps.colorChange !== this.props.colorChange){
    this.changeColor(this.props.colorChange);
  } else if (prevProps.zoomTo != this.props.zoomTo) {
    if(this.props.zoomTo) {
      this.zoomToLayer(this.props.zoomTo);
    }
  }
  else {
    // Assume layer visibility toggled or layer added
    this.updateLayerVisibility();
  }
}

zoomToLayer(layerId) {
  const {layers, zoomToReset, drawerWidth, drawerOpen} = this.props;
  let layer  = layers.find( l => l.id === layerId);
  let leftPadding = drawerOpen ? drawerWidth + 10 : 10; 

  if(layer) {
    let minXminYmaxXmaxY = bbox(layer.data);
    this._map.fitBounds([
      [minXminYmaxXmaxY[0], minXminYmaxXmaxY[1]],
      [minXminYmaxXmaxY[2], minXminYmaxXmaxY[3]]
    ], {padding: {top: 10, bottom:10, left: leftPadding, right: 10}});
   zoomToReset('');
  }

}

removeMapLayers(layerIds) {
  for (let i in layerIds) {
    let layerId = layerIds[i];
    if(this._map.getSource(layerId)){
      this._map.removeLayer(layerId);
      this._map.removeSource(layerId);
      if(this._map.getSource(layerId+'_outline')){
        this._map.removeLayer(layerId+'_outline');
        this._map.removeSource(layerId+'_outline');
      }
    }
  }
}

changeColor(colorChange) {
  const {layers} = this.props;
  let layerId = colorChange.layerId;
  let color = colorChange.color;
  let opacity = colorChange.opacity > 1 ? 1 : colorChange.opacity;

  let layer = layers.find(l => l.id === layerId);
  let map = this._map;

  switch (layer.type) {
    case 'Polygon':
    case 'MultiPolygon':
        map.setPaintProperty(layerId, 'fill-color', color);
        map.setPaintProperty(layerId, 'fill-opacity', opacity);
        if(map.getSource(layerId +'_outline')) {
          map.setPaintProperty(layerId +'_outline', 'line-color', colorChange.strokeColor );
          map.setPaintProperty(layerId +'_outline', 'line-opacity', colorChange.strokeOpacity );
        }
      
      break;
    case 'LineString':
    case 'MultiLineString':
        map.setPaintProperty(layerId, 'line-color', color);
        map.setPaintProperty(layerId, 'line-opacity', opacity);
      break;
    case 'Point':
        map.setPaintProperty(layerId, 'circle-color', color);
        map.setPaintProperty(layerId, 'circle-opacity', opacity);
        map.setPaintProperty(layerId, 'circle-radius',parseInt(colorChange.radius, 10) );
      break;
    default:
      console.log('unidentified layer type', layer.type);
  }
}

    updateLayerVisibility() {
      
        let layers = this.props.layers;
    
        layers.forEach( (layer, i) => {
            this.handleSingleLayerVisibility(layer, i);  
        });
    }

    handleSingleLayerVisibility(layer, i) {
      const {layers} = this.props;

      if (!this._map.isStyleLoaded()) {
         this.waitForSomething(this._map.isStyleLoaded(), this.handleSingleLayerVisibility.bind(this), layer, i);
      } else if ( i > 0 && !this._map.getSource(layers[i-1].id)) {
        this.waitForSomething(this._map.getSource(layers[i-1].id), this.handleSingleLayerVisibility.bind(this), layer, i)
      }

      else {
        if( !this._map.getSource(layer.id) ) {
          switch (layer.type) {
            case 'Polygon':
              this.addPolygonLayer(layer, i);
              break;
            case 'MultiPolygon':
              this.addPolygonLayer(layer, i);
              break;
            case 'LineString':
            case 'MultiLineString':
              this.addLineLayer(layer, i);
              break;
            case 'Point':
              this.addPointLayer(layer, i);
              break;
            default:
              console.log('unidentified layer type', layer.type);
              const {removeLayer} = this.props;
              removeLayer(layer.id);
          }
          
        } else {
          if ( layer.visible ) {
            this._map.setLayoutProperty(layer.id, 'visibility', 'visible');
            if (this._map.getSource(layer.id +'_outline')) {
              this._map.setLayoutProperty(layer.id +'_outline', 'visibility', 'visible');
            }
          }
          else {
            this._map.setLayoutProperty(layer.id, 'visibility', 'none');
            if (this._map.getSource(layer.id +'_outline')) {
              this._map.setLayoutProperty(layer.id +'_outline', 'visibility', 'none');
            }
          }
        }

      }
    }

    waitForSomething(toWaitFor, callback, layer, i) {
      if (!toWaitFor) {
        setTimeout(() => {
          callback(layer, i);
        }, 300);
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
          'circle-radius': layer.data.radius,
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

      let strokeOpacity = layer.data.strokeOpacity ? layer.data.strokeOpacity : 1;
      strokeOpacity = strokeOpacity > 1? strokeOpacity : 1;
      let strokeColor = layer.data.strokeColor ? layer.data.strokeColor: layer.data.color;

      map.addLayer({
        'id': layer.id + '_outline',
        'type': 'line',
        'source': {
          'type': 'geojson',
          'data': layer.data
        },
        'layout': {'visibility': visibility },
        'paint': {
          'line-color': strokeColor,
          'line-opacity': strokeOpacity ,
          'line-width': 3
        }
      }, layerAbove);

    }

    render() {
        const {classes, drawerOpen, drawerWidth, theme} = this.props;

        let mapControllerDivStyle =
            {position: 'absolute',
            top: 75,
            padding: theme.spacing.unit * 3,
            zIndex: 10000,
            marginLeft: drawerWidth,
            /*backgroundColor: 'pink',
            width: 100,
            height: 100*/
          }

        if(!drawerOpen){
          mapControllerDivStyle.marginLeft = 0
        }

        return (
          <div>
            <div style={{marginLeft: 0}}>
            <div ref={el => this._mapContainer = el} className={classes.map} id='map'/>
            </div>            
         
            <div style = {mapControllerDivStyle}
             id='mapControllers' className={classNames(classes.contentShift, {
              [classes.drawerClosed]: !drawerOpen,
            })}></div>
         
          </div>);
        }
  }

  export default withStyles(styles, { withTheme: true })(Map);
  