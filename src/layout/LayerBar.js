import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Drawer, Divider } from '@material-ui/core';

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

      const { classes, drawerOpen } = this.props;
  
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
        <Typography variant='title'>
            Layers
        </Typography>  
            
        </div>
        <Divider />
        <Typography>sup</Typography>

      </Drawer>
      );
  
    }

  }

export default withStyles(styles, { withTheme: true })(LayerBar);