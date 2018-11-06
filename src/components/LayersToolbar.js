import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Divider, Tooltip, IconButton, Toolbar } from '@material-ui/core';
import { InsertDriveFile, Edit, Delete, SaveAlt } from '@material-ui/icons'
import LoadingFullpageCirular from '../utils/Loading/LoadingFullpageCirular';
import Loadable from 'react-loadable'
import downloadJsons from '../utils/downloadJsons';


const AddLayerDialog = Loadable({
  loader: () => import('./Dialogs/AddLayerDialog'),
  loading: LoadingFullpageCirular,
});

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

    closeAddLayerDialog() {
      this.setState({addLayerDialogOpen: false});
    }
    
    
    render() {

      const {addLayerDialogOpen} = this.state;
      const { classes,
        layers,
        hasLayers,
        addLayers,
        openDeleteLayersDialog,
        openEditLayersDialog,
        checkLayerName,
        acceptedTypes } = this.props;
  
      return (
        <div>

        {addLayerDialogOpen ?
        <AddLayerDialog acceptedTypes={acceptedTypes} addLayers={addLayers} checkLayerName={checkLayerName} open={addLayerDialogOpen} closeDialog={this.closeAddLayerDialog.bind(this)}/>    
        : null}
        <Divider />
        <Toolbar className={classes.layersToolbar} disableGutters={true}>

            <Tooltip title="New Layer">
              <IconButton onClick={ () => this.setState({addLayerDialogOpen: true})}>
                <InsertDriveFile/>
              </IconButton>
            </Tooltip>
            <Tooltip title="Download files">
            <div>
            <IconButton disabled={!hasLayers} onClick={() => downloadJsons(layers)}>
              <SaveAlt/>
            </IconButton>
            </div>
          </Tooltip>

          
          <div style={{flex: 1}}></div>

          <Tooltip title="Edit Layer">
          <div>
            <IconButton disabled={!hasLayers} onClick={openEditLayersDialog}>
              <Edit/>
            </IconButton>
            </div>
          </Tooltip>
          <Tooltip title="Delete Layer">
          <div>
            <IconButton disabled={!hasLayers} onClick={openDeleteLayersDialog}>
              <Delete/>
            </IconButton>
            </div>
          </Tooltip>
        </Toolbar>
        <Divider />
        </div>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(LayersToolbar);