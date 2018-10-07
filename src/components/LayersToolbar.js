import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Divider, Tooltip, IconButton, Toolbar } from '@material-ui/core';
import { InsertDriveFile, Edit, Delete } from '@material-ui/icons'
import AddLayerDialog from './AddLayerDialog';


const styles = theme => ({
    layersToolbar: {
      paddingTop: 0,
      paddingBottom: 0,
      minHeight: 0
    },
  });

  class LayersToolbar extends Component {
    state = {
      addLayerDialogOpen: false,
    };

    closeLayerDialog() {
      this.setState({addLayerDialogOpen: false});
    }
    
    render() {

      const {addLayerDialogOpen} = this.state;
      const { classes, addLayers, openDeleteLayersDialog } = this.props;
  
      return (
        <div>

        <AddLayerDialog addLayers={addLayers} open={addLayerDialogOpen} closeDialog={this.closeLayerDialog.bind(this)}/>
        <Divider />
        <Toolbar className={classes.layersToolbar} disableGutters={true}>

            <Tooltip title="New Layer">
              <IconButton onClick={ () => this.setState({addLayerDialogOpen: true})}>
                <InsertDriveFile/>
              </IconButton>
            </Tooltip>

          
          <div style={{flex: 1}}></div>

          <Tooltip title="Edit Layer">
            <IconButton>
              <Edit/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Layer">
            <IconButton onClick={openDeleteLayersDialog}>
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