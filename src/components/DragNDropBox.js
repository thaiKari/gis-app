import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import FileUpload from './FileUpload';
import { Typography } from '../../node_modules/@material-ui/core';

const styles = theme => ({
    dropBox: {
        border: '3px dashed white',
        borderRadius: 20,
        width: 'calc(100%-20px)',
        height:70,
        textAlign: 'center',
        verticalAlign: 'middle',
        padding: 20,
        paddingTop: 50
    }
  
  });

  class DragNDropBox extends Component {
    
    render() {

      const { classes, receiveNewJson, theme } = this.props;
  
      return (
        <FileUpload receiveNewJson={receiveNewJson} disableClick>
            <div className={classes.dropBox}
                onDragOver={(e)=> e.target.style.backgroundColor=theme.palette.action.hover}
                onDragLeave={(e)=> e.target.style.backgroundColor=theme.palette.background.paper}
                onDrop={(e)=> e.target.style.backgroundColor=theme.palette.background.paper}>
                
                <Typography> Drag and drop a geojson file here</Typography>
            </div>
        </FileUpload>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(DragNDropBox);