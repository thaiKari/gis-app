import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {MenuItem, Menu } from '@material-ui/core';
import classNames from 'classnames';

const styles = theme => ({
  menuAlign: {
    marginLeft: 200
  }
  
  });

  class RightClickMenu extends Component {

    zoomTo = () => {
        const {closeRightClickMenu, zoomTo, layerId} = this.props;
        zoomTo(layerId);
        closeRightClickMenu();
      };

    handleClose = () => {
      const {closeRightClickMenu} = this.props;
      closeRightClickMenu();
    }
    
    render() {

      const { classes, anchorEl, open, drawerWidth } = this.props;

        var menuClasess = classNames({
          [classes.menuAlign]: drawerWidth > 220,
        });

      return (
        <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={this.handleClose}
        classes={{paper : menuClasess}}
      >
        <MenuItem onClick={this.zoomTo}>Zoom To</MenuItem>

      </Menu>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(RightClickMenu);