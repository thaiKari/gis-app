import React from 'react'
import {SliderPicker, AlphaPicker, ChromePicker  } from 'react-color';
import { withStyles } from '@material-ui/core/styles';
import rgbObj2Css from '../utils/rgbObj2Css';
import ColorForm from './ColorForm';
import {Typography} from '@material-ui/core';
import classNames from 'classnames';

const styles = theme => ({
    color: {
      width: '100%',
      height: '100%',
      borderRadius: '2px',
    },
    swatch: {
      height: 40,
      width: '100%',   
      borderRadius: '5px',
      boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
      display: 'inline-block',
      cursor: 'pointer',
      //marginBottom: theme.spacing.unit * 3
    },
    picker: {
      touchAction: 'none',
      position: 'absolute',
    },
    bottomZero: {
      bottom:0
    },
    AlphaPicker: {
      marginTop: theme.spacing.unit * 3
    },
    cover: {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    }
  });

class ColorPicker extends React.Component {
  state = {
    displayColorPicker: false,
  };

  handleClick = () => {
    this.setState({ displayColorPicker: true });
    const {setPickerOpen} = this.props;
    if(setPickerOpen) {
      setPickerOpen(true);
    }
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
    const {setPickerOpen} = this.props;
    if(setPickerOpen) {
      setPickerOpen(false);
    }
  };

  handleColorChange = (color) => {
    const {setColor} = this.props;
    setColor(color.rgb);
  };

  handleAlphaChange = (color) => {
    let {setOpacity} = this.props;
    setOpacity(color.rgb.a);
  };


  render() {
    let {color, classes, theme, setColor, setOpacity, colorChanged} = this.props;

    let colorString = rgbObj2Css(color);
    let swatchDiv = document.getElementById('swatch');
    let pickerDivOverflow = false;
    if (swatchDiv) {
      let swatchRect = swatchDiv.getBoundingClientRect()
      if ( (window.innerHeight - swatchRect.bottom - 250) < 0 ) {
        pickerDivOverflow = true;
      }
    }
    
    var pickerClasses = classNames({
      [classes.picker]: true,
      [classes.bottomZero]: pickerDivOverflow
    });
    

    return (
      <div>
        <div id = 'swatch' className={ classes.swatch } onClick={ this.handleClick }>
          <div className={ classes.color} 
              style={{backgroundColor: `${colorString}`,
                    opacity: `${color.a}`}} />
        </div>
        { this.state.displayColorPicker ?
        <div>
          <div className = {classes.cover} onClick={ this.handleClose }/>
          <div id={'picker'} className = {pickerClasses}>
            <ChromePicker />
          </div>
        </div>
        : null }

      </div>
    )
  }
}

export default  withStyles(styles, { withTheme: true })(ColorPicker);