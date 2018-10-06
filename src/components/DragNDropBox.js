import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import FileUpload from './FileUpload';
import { Typography, Button } from '../../node_modules/@material-ui/core';
import classNames from 'classnames';

const styles = theme => ({
    dropBox: {
        border: '3px dashed ' + theme.palette.text.primary,
        borderRadius: 20,
        width: 'calc(100%-20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 30,
    },
    dropBoxActive: {
      backgroundColor: theme.palette.action.hover
    },  button: {
      margin: theme.spacing.unit,
      marginTop: 30
    }
  
  });

  class DragNDropBox extends Component {
    state = {
      dropBoxActivated: false,
    };
    
    render() {

      const { classes, receiveNewJson, modalDisp} = this.props;
      const { dropBoxActivated } = this.state;

      var liClasses = classNames({
        [classes.dropBox]: true,
        [classes.dropBoxActive]: dropBoxActivated
      });

      let boxContent = modalDisp ?
        <div>
          <FileUpload receiveNewJson={receiveNewJson}>
            <Button variant="contained" color="primary" className={classes.button}>
              Choose Files
            </Button>
          </FileUpload>
          <Typography> or drag and drop a geojson file here</Typography>          
        </div>
      :
        <Typography> Drag and drop a geojson file here</Typography>

  
      return (
        <FileUpload receiveNewJson={receiveNewJson} disableClick>
            <div className={liClasses}
                onDragOver={()=> this.setState({dropBoxActivated: true})}
                onDragLeave={()=> this.setState({dropBoxActivated: false})}
                onDrop={()=> this.setState({dropBoxActivated: false})}>                
                {boxContent}
            </div>
        </FileUpload>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(DragNDropBox);