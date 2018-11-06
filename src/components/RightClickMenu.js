import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {MenuItem, Menu } from '@material-ui/core';

const styles = theme => ({
  
  });

  class RightClickMenu extends Component {

    handleClose = () => {
        const {closeRightClickMenu} = this.props;
        closeRightClickMenu();
      };
    
    render() {

      const { classes, anchorEl, open } = this.props;
  
      return (
        <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={this.handleClose}
      >
        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleClose}>My account</MenuItem>
        <MenuItem onClick={this.handleClose}>Logout</MenuItem>
      </Menu>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(RightClickMenu);