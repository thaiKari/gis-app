import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Tooltip, Button} from '@material-ui/core';
import {Build, ChevronRight} from '@material-ui/icons';

/**
 * Button in top right corner to open the geoprocessing toolbar
 */

const styles = theme => ({
    button: {
        position: 'absolute',
        top: 0,
        right: 0,
        margin: theme.spacing.unit,
        zIndex: 10000,
      }
  });

  class TopBar extends Component {
    
    render() {

      const { classes, toolDrawerOpen, toggleToolDrawer } = this.props;
  
      return (
        <div>
        {toolDrawerOpen ?
          <Button className={classes.button}
                  onClick={toggleToolDrawer}>
                  <ChevronRight />
          </Button>
          :
          <Tooltip title="Tools">
          <Button variant="fab"
                  color="primary"
                  className={classes.button}
                  onClick={toggleToolDrawer}>
            <Build />
          </Button>
          </Tooltip>}
        </div>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(TopBar);