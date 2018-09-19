import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import FileUpload from './FileUpload';
import { Typography } from '../../node_modules/@material-ui/core';
import classNames from 'classnames';

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
    },
    dropBoxActive: {
      backgroundColor: theme.palette.action.hover
  }
  
  });

  class DragNDropBox extends Component {
    state = {
      dropBoxActivated: false
    };
    
    render() {

      const { classes, receiveNewJson} = this.props;
      const { dropBoxActivated } = this.state;

      var liClasses = classNames({
        [classes.dropBox]: true,
        [classes.dropBoxActive]: dropBoxActivated
      });
  
      return (
        <FileUpload receiveNewJson={receiveNewJson} disableClick>
            <div className={liClasses}
                onDragOver={()=> this.setState({dropBoxActivated: true})}
                onDragLeave={()=> this.setState({dropBoxActivated: false})}
                onDrop={()=> this.setState({dropBoxActivated: false})}>
                
                <Typography> Drag and drop a geojson file here</Typography>
            </div>
        </FileUpload>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(DragNDropBox);