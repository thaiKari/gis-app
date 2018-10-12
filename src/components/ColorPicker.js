import React from 'react'
import reactCSS from 'reactcss'
import {SliderPicker, AlphaPicker ,  SketchPicker, ChromePicker } from 'react-color';
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
    }
  });

class ColorPicker extends React.Component {
  state = {
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleColorChange = (color) => {
    console.log(color.hex, color.rgb.a, this.props.data.color);
    let {data, setData} = this.props;
    data.color = color.hex;
    setData(data);

    this.setState({ color: color.rgb });
  };

  render() {
    let {data, classes, theme} = this.props;

    return (
      <div>
        <div className={ classes.swatch } onClick={ this.handleClick }>
          <div className={ classes.color} 
              style={{backgroundColor: `${ data.color}`,
                    opacity: `${data.opacity}`}} />
        </div>
        { this.state.displayColorPicker ?
        <div style = {{padding:  theme.spacing.unit}}>
        <SliderPicker  color={data.color} onChange={this.handleColorChange } />
        <AlphaPicker width={'100%'} color={data.color} onChange={this.handleAlphaChange }  />
        </div>
        : null }

      </div>
    )
  }
}

export default  withStyles(styles, { withTheme: true })(ColorPicker);