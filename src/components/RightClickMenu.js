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

    openAtributeTable = () => {
        const {closeRightClickMenu, openAttribTable, layerId} = this.props;
        openAttribTable(layerId);
        closeRightClickMenu();
      };

    handleClose = () => {
      const {closeRightClickMenu} = this.props;
      closeRightClickMenu();
    }

    openEditLayersDialog = () => {
      const {closeRightClickMenu, openEditLayersDialog} = this.props;
      openEditLayersDialog();
      closeRightClickMenu();
    }

    openDeleteLayersDialog = () => {
      const {closeRightClickMenu, openDeleteLayersDialog} = this.props;
      openDeleteLayersDialog();
      closeRightClickMenu();
    }

    
    render() {

      const { classes, anchorEl, open, drawerWidth} = this.props;

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
        <MenuItem onClick={this.openAtributeTable}>Attribute Table</MenuItem>
        <MenuItem onClick={this.openEditLayersDialog}>Edit Layer</MenuItem>
        <MenuItem onClick={this.openDeleteLayersDialog}>Delete Layers</MenuItem>

      </Menu>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(RightClickMenu);