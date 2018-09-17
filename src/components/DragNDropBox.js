import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import FileUpload from './FileUpload';

const styles = theme => ({
    dropBox: {
        border: '3px dashed white',
        borderRadius: 20,
        width: '100%',
        height:200
    }
  
  });

  class DragNDropBox extends Component {
    
    render() {

      const { classes, receiveNewJson } = this.props;
  
      return (
        <FileUpload receiveNewJson={receiveNewJson} disableClick>
            <div className={classes.dropBox} style={{}}>
            </div>
        </FileUpload>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(DragNDropBox);