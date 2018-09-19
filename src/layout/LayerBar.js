import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, Divider, Tooltip, IconButton, Toolbar } from '@material-ui/core';

import DragNDropBox from '../components/DragNDropBox';
import LayerList from '../components/LayerList';
import LayersToolbar from '../components/LayersToolbar';

const styles = theme => ({
    drawerPaper: {
        position: 'relative',
        width: theme.drawerWidth,
        marginTop: theme.appBarHeight,
      },
      drawerHeader: {
        height: theme.appBarHeight,
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 3,
      },
  });

  class LayerBar extends Component {
    constructor() {
      super()
      this.state = { files: [] }
    }
  
    onDrop(files) {
      this.setState({
        files
      });
    }
    
    render() {

      const { layers, classes, drawerOpen, receiveNewJson, setLayerColor} = this.props;
  
      return (

        <Drawer
        variant="persistent"
        anchor={'left'}
        open={drawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >

        <LayersToolbar receiveNewJson={receiveNewJson} />
  
        <div className={classes.content}>
          <LayerList layers={layers} setLayerColor={setLayerColor}/>
          <DragNDropBox receiveNewJson={receiveNewJson}/>
        </div>

      </Drawer>

      );
  
    }

  }

export default withStyles(styles, { withTheme: true })(LayerBar);

/**
 * OLD HEADER
 *         <div className={classes.drawerHeader}>
        <Toolbar variant="dense">
          <Typography variant='title' style={{flex: 1}}>
              Layers
          </Typography>  
          <IconButton>
            <ChevronLeft onClick={handleDrawerToggle} />
          </IconButton>
        </Toolbar>
            
        </div>
 */