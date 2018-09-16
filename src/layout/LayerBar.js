import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Drawer, Divider, Tooltip, List, ListItem, ListItemText, IconButton, ListItemSecondaryAction, Toolbar } from '@material-ui/core';
import { InsertDriveFile, Edit, Delete } from '@material-ui/icons'

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
        //height: 10,
        minHeight: 0
      }
  });

  class LayerBar extends Component {
    
    render() {

      const { classes, drawerOpen, handleDrawerToggle } = this.props;
  
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
          <Tooltip title="New Layer">
            <IconButton>
              <InsertDriveFile/>
            </IconButton>
          </Tooltip>
          
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
        <Typography>sup</Typography>

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