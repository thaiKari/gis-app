import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Drawer, Divider, List, ListItem, ListItemText, IconButton, ListItemSecondaryAction, Toolbar } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons'

const styles = theme => ({
    drawerPaper: {
        position: 'relative',
        width: theme.drawerWidth,
        marginTop: theme.appBarHeight,
      },
      drawerHeader: {
        height: theme.appBarHeight,
      },
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

        <div className={classes.drawerHeader}>
        <Toolbar>
          <Typography variant='title' style={{flex: 1}}>
              Layers
          </Typography>  
          <IconButton>
            <ChevronLeft onClick={handleDrawerToggle} />
          </IconButton>
        </Toolbar>
            
        </div>
        <Divider />
        <Typography>sup</Typography>

      </Drawer>
      );
  
    }

  }

export default withStyles(styles, { withTheme: true })(LayerBar);