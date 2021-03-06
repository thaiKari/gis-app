import React from 'react';
import { List, Dialog,  Typography, DialogContent, DialogTitle } from '@material-ui/core';
import SubmitOrCancelAction from '../DialogActions/SubmitOrCancelAction';
import OkAction from '../DialogActions/OkAction';

class DeleteLayerDialog extends React.Component {


  render() {

    const { open, selectedLayers, layers, closeDialog, deleteLayers } = this.props

    let hasSelection = false;
    let deleteList = Object.keys(selectedLayers).map( (key) => {
        if(selectedLayers[key]) {
            let layer = layers.find((l)  => {
                return l.id === key
              });
              if(layer) {
                hasSelection = true;
                return (
                    <Typography key={key}>{'- ' + layer.displayName}</Typography>
                );
              }            
        }
        return null;
    });

    let message = hasSelection === false ?
    <Typography>click on the layers in the sidebar that you want to delete</Typography>
    : null

    let actionButtons = hasSelection ?

    <SubmitOrCancelAction submitText={'Agree'} submit={deleteLayers} cancel={closeDialog}/>
    :
    <OkAction ok={this.props.closeDialog}/>



    return (
      <div>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete Layers?"}</DialogTitle>
          <DialogContent>

              {message}
              <List>
                {deleteList}
              </List>

          </DialogContent>
            {actionButtons}
        </Dialog>
      </div>
    );
  }
}

export default DeleteLayerDialog;