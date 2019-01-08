import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {  Typography  } from '@material-ui/core';
  import ColorPicker from '../ColorPicker';

  /**
   * Options for polygon layers in the EditLayerDialog
   */
const styles = theme => ({
  
  });

  class EditPolygonOptions extends Component {
    
    render() {

      const { theme, setColor, color, colorChanged, setPickerOpen, setstrokeColor, strokeColor } = this.props;
  
      return (
        <div  style={{display: 'flex',
          flexWrap: 'wrap',
          justifyContent: "space-between",
          margin: theme.spacing.unit * 2,
          marginLeft: 0,
          width:'100%'}}>
        <div style={{width: '40%'}}>
        <Typography variant="caption" gutterBottom>Fill Color</Typography>
        <ColorPicker
          setColor={setColor}
          color={color}
          colorChanged={colorChanged}
          setPickerOpen={setPickerOpen}/>
        </div>
        <div style={{width: '40%'}}>
        <Typography variant="caption" gutterBottom>Outline Color</Typography>
        <ColorPicker
          setColor={setstrokeColor}
          color={strokeColor}
          colorChanged={colorChanged}
          setPickerOpen={setPickerOpen}/>
          </div>
        </div>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(EditPolygonOptions);