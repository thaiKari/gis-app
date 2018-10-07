import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { AppBar, Toolbar, IconButton, Tooltip } from '@material-ui/core';
import { Menu, Build } from '@material-ui/icons'

const styles = theme => ({
  appBar: {
    position: 'absolute',
    height: theme.appBarHeight,
    backgroundColor: theme.palette.background.default,
  },
  button: {
    marginLeft: 12,
    marginRight: 12,
  },
  });

  class TopBar extends Component {
    
    render() {

      const { classes, handleDrawerToggle, toggleToolDrawer } = this.props;
  
      return (
        <AppBar
        className={classes.appBar}
      >
        <Toolbar disableGutters={true}>
        <Tooltip title="Layers">
            <IconButton
              onClick={handleDrawerToggle}
              className={classNames(classes.button)}
            >
              <Menu />
            </IconButton>
          </Tooltip>

          <div style={{flex: 1}}></div>

          <Tooltip title="Tools">
            <IconButton
              className= {classes.button}
              onClick={toggleToolDrawer}
            >
              <Build />
            </IconButton>
          </Tooltip>

        </Toolbar>
      </AppBar>
      ); 
    }

  }

export default withStyles(styles, { withTheme: true })(TopBar);