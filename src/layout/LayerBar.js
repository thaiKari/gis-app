import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, Divider, Tooltip, IconButton, Toolbar } from '@material-ui/core';
import { InsertDriveFile, Edit, Delete } from '@material-ui/icons'
import FileUpload from '../components/FileUpload';
import DragNDropBox from '../components/DragNDropBox';
import LayerList from '../components/LayerList';

const styles = theme => ({
    drawerPaper: {
        position: 'relative',
        width: theme.drawerWidth,
        marginTop: theme.appBarHeight,
      },
      drawerHeader: {
        height: theme.appBarHeight,
      },
      layersToolbar: {
        paddingTop: 0,
        paddingBottom: 0,
        minHeight: 0
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

        <Divider />
        <Toolbar className={classes.layersToolbar} disableGutters={true}>
          <FileUpload receiveNewJson={receiveNewJson}>
            <Tooltip title="New Layer">
              <IconButton>
                <InsertDriveFile/>
              </IconButton>
            </Tooltip>
          </FileUpload>
          
          <div style={{flex: 1}}></div>

          <Tooltip title="Edit Layer">
            <IconButton>
              <Edit/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Layer">
            <IconButton>
              <Delete/>
            </IconButton>
          </Tooltip>
        </Toolbar>
        <Divider />

        

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