import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Divider, Tooltip, IconButton, Toolbar } from '@material-ui/core';
import { InsertDriveFile, Edit, Delete } from '@material-ui/icons'
import FileUpload from './FileUpload';


const styles = theme => ({
    layersToolbar: {
      paddingTop: 0,
      paddingBottom: 0,
      minHeight: 0
    },
  });

  class LayersToolbar extends Component {
    
    render() {

      const { classes, receiveNewJson } = this.props;
  
      return (
        <div>
        <Divider />
        <Toolbar className={classes.layersToolbar} disableGutters={true}>
          <FileUpload receiveNewJson={receiveNewJson}>
            <Tooltip title="New Layer">
              <IconButton>
                <InsertDriveFile/>
              </IconButton>
            </Tooltip>
          </FileUpload>
          
          <div style={{flex: 1}}></div>

          <Tooltip title="Edit Layer">
            <IconButton>
              <Edit/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Layer">
            <IconButton>
              <Delete/>
            </IconButton>
          </Tooltip>
        </Toolbar>
        <Divider />
        </div>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(LayersToolbar);