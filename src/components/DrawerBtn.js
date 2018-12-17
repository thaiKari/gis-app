import React from 'react';
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
        
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
      },
      smallDrawerButton: {
        backgroundColor: theme.palette.action.hover,
        width: 10,
      },
      bigDrawerButton: {
        backgroundColor: theme.palette.grey[700],
        width: 40,
        borderRadius: 4,
        marginLeft: -10,
        paddingLeft: 15,
        zIndex: 1
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
        top: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        //zIndex: 10000,
      },
      openDiv:{
        width: 10,
        backgroundColor: theme.palette.grey[700],
        height: '100%',
      },
      closeDiv: {
        width: 'auto'
      },
      smoothTransition: {
        transition: theme.transitions.create('left', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        })
      },
      dragListenDiv: {
        position:'absolute', left:0, top: 0, width:'100vw', height: '100vh', zIndex: 10000
      }
});


class DrawerBtn extends React.Component {
  state = {
    width: 240,
    isDragging: false
  };

  
  handleResize = (event) => {

  }

  startResize = (event, index) => {
    this.setState({
      isDragging: true,
    })
  }

  stopResize = () => {
    
    if (this.state.isDragging) {
      this.setState(() => ({
        isDragging: false,
      }))
    }
  }

  resizePanel = (event) => {
    const{changeDrawerWidth} = this.props;
    if (this.state.isDragging) {
      changeDrawerWidth(event.clientX);
      this.setState({
        width: event.clientX
      })
    }
  }

  render() {
    const { classes, drawerOpen } = this.props;
    const {width, isDragging} = this.state;

    var leftPos = drawerOpen? width : 0;
    var buttonIcon = drawerOpen? <ChevronLeftIcon  color='action'/> : <ChevronRightIcon color='action'/>  

    let mainDiv = <div style={{left:leftPos}}
    className={classNames(classes.buttonDiv,
                          classes.openDiv,
                          {[classes.smoothTransition]: !isDragging},
                          classes.resize)}
    onMouseDown ={this.startResize}>

  

    <button 
      className={classNames(classes.drawerButton, classes.smallDrawerButton, classes.resize, {[classes.wideButton]: !drawerOpen},)}          
      onMouseDown ={this.startResize}
      >
      <DragIndicator  color='action'/>
    </button >

    <button 
      className={classNames(classes.drawerButton, classes.smallDrawerButton, classes.close)}
      onClick={this.props.handleDrawerToggle} >
      {buttonIcon}
    </button >

    <button 
      className={classNames(classes.drawerButton, classes.smallDrawerButton, classes.resize)}
      onMouseDown ={this.startResize}>
      <DragIndicator  color='action'/>
    </button >

  
</div>

    return (
    <div className={classNames({[classes.dragListenDiv]: isDragging} ) }
    onMouseMove ={this.resizePanel}
    onMouseUp ={this.stopResize}>

    {drawerOpen? mainDiv : 
      <div className={classNames(classes.buttonDiv)}>
      {mainDiv}
        <button className={classNames(classes.drawerButton, classes.bigDrawerButton)}
            onClick={this.props.handleDrawerToggle}>
            {buttonIcon}
        </button>
      </div>}
    </div>
    );

  }
}

export default withStyles(styles, { withTheme: true })(DrawerBtn);