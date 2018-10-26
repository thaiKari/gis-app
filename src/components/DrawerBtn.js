import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {DragIndicator} from '@material-ui/icons'
import classNames from 'classnames';

const styles = theme => ({
    drawerButton: {
        margin: 0,
        padding: 0,
        border: 'none',
        outline: 'none',
        height: 50,
        width: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.action.hover,
      },
      resize: {
          cursor: 'col-resize'
      },
      close:  {
        cursor: 'pointer'
      },
      'buttonDiv': {
        position: 'absolute',
        height: '100%',
        width: 10,
        top: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        zIndex: 10000,
        transition: theme.transitions.create('left', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: theme.palette.grey[700]
      }
});


class DrawerBtn extends React.Component {

  render() {
    const { classes, drawerOpen, theme } = this.props;

    var leftPos = drawerOpen? theme.drawerWidth : 0;
    var buttonIcon = drawerOpen? <ChevronLeftIcon  color='action'/> : <ChevronRightIcon color='action'/>  
    
    console.log(theme.palette)

    return (
    
    <div style={{left:leftPos}} className={classNames(classes.buttonDiv) } >
        <button 
          className={classNames(classes.drawerButton)}
          onClick={this.props.handleDrawerToggle} >
          <DragIndicator  color='action'/>
        </button >

        <button 
          className={classNames(classes.drawerButton)}
          onClick={this.props.handleDrawerToggle} >
          {buttonIcon}
        </button >

        <button 
          className={classNames(classes.drawerButton)}
          onClick={this.props.handleDrawerToggle} >
          <DragIndicator  color='action'/>
        </button >
    </div>
    );

  }
}

export default withStyles(styles, { withTheme: true })(DrawerBtn);