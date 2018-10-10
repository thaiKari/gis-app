import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Dialog,
        DialogTitle,
        DialogContent,
        Typography
        } from '@material-ui/core'

import SubmitOrCancelAction from './DialogActions/SubmitOrCancelAction';
import OkAction from './DialogActions/OkAction';
import LayersSelect from './LayersSelect';


const styles = theme => ({
  dialog: {

  }
});

class AddLayerDialog extends React.Component {
  state = {
    scroll: 'paper',
  };


  componentWillUnmount = () => {
    // dialog has a side-effect if this not checked
    document.body.style.overflow = 'auto';
  } 

  componentDidMount  = () => {
    // dialog has a side-effect if this not checked
    document.body.style.overflow = 'auto';
  } 

  submitChanges = () => {
    console.log('submitChanges');
    //const {closeDialog, addLayers} = this.props
    //submitChanges(layers);
    //closeDialog();
  };

  handleClose = () => {
    console.log('handleClose');
    const {closeDialog} = this.props;
    closeDialog();

  };

  getContent() {
    const {layers, currLayer} = this.props;

    return(
      <DialogContent>
        <LayersSelect layers={layers} currLayer={currLayer} />        
      </DialogContent>
    );
  }

  render() {
    const {open, layers, classes} = this.props;

    let content = layers.length > 0 ?
      this.getContent()
      : 
      <DialogContent>
        <Typography>Add some layers first</Typography>         
      </DialogContent>

    let actions = layers.length > 0 ?
      <SubmitOrCancelAction submit={this.submitChanges} cancel={this.handleClose}/>
      : 
      <OkAction ok={this.handleClose}/>

    return (
      <div>

        <Dialog
          fullWidth={true}
          open={open}
          onClose={this.handleClose}
          scroll={'paper'}
          aria-labelledby="scroll-dialog-title"
        >
            <DialogTitle id="scroll-dialog-title">Edit Layers</DialogTitle>
              {content}
              {actions}

        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AddLayerDialog);