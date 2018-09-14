import React, {Component} from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';

const styles = theme => ({
    map: {
      height: `calc(100vh - ${theme.appBarHeight}px)`,
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
    
    createMap(element) {
        var map = L.map(element,  {zoomControl: false, layers: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })});

        this.zoomControl = L.control.zoom({
              position:'topright'
        }).addTo(map);

        this.zoomControl._container.remove();
        document.getElementById('mapControllers').appendChild(this.zoomControl.onAdd(map));
    
        return map;
      }

    shouldComponentUpdate(nextProps) {
        return true;
      }

    componentDidMount() {
        this.map = this.createMap('map');
        this.map.setView([63.428, 10.397], 13);
    }

    render() {
        const {classes, open, theme} = this.props;
        return (
          

          <div>
            <div className={classes.noneShiftContent}>
              <div className={classes.map} id='map' ref={el => (this._mapContainer = el)} />
            </div>            
         
            <div id='mapControllers' className={classNames(classes.shiftContent, classes[`content-left`], {
              [classes.contentShift]: open,
              [classes[`contentShift-left`]]: open,
            })}></div>
         
          </div>);
        }
  }

  export default withStyles(styles, { withTheme: true })(Map);
  