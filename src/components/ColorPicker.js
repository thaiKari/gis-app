import React from 'react'
import reactCSS from 'reactcss'
import {SliderPicker, AlphaPicker } from 'react-color';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    color: {
      width: '100%',
      height: '100%',
      borderRadius: '2px',
    },
    swatch: {
      height: 40,
      width: '100%',
      background: '#fff',
      borderRadius: '5px',
      boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
      display: 'inline-block',
      cursor: 'pointer',
      marginBottom: theme.spacing.unit * 3
    },
    picker: {
      touchAction: 'none'
    },
    AlphaPicker: {
      marginTop: theme.spacing.unit * 3
    }
  });

class ColorPicker extends React.Component {
  state = {
    displayColorPicker: false,
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
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
    let {color, opacity, classes, theme} = this.props;

    let colorString = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')'
    console.log(color)

    return (
      <div>
        <div className={ classes.swatch } onClick={ this.handleClick }>
          <div className={ classes.color} 
              style={{backgroundColor: `${colorString}`,
                    opacity: `${color.a}`}} />
        </div>
        { this.state.displayColorPicker ?
        <div className = {classes.picker}>
        <SliderPicker  color={color} onChange={this.handleColorChange } />
        <div style={{marginTop: theme.spacing.unit * 2}}>
        <AlphaPicker width={'100%'} color={color} onChange={this.handleAlphaChange }  />
        </div>
        </div>
        : null }

      </div>
    )
  }
}

export default  withStyles(styles, { withTheme: true })(ColorPicker);