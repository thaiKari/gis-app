import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {IconButton, Tooltip, Button} from '@material-ui/core';
import {Build} from '@material-ui/icons';

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
          <IconButton className={classes.button}
                        onClick={toggleToolDrawer}>>
          </IconButton>
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