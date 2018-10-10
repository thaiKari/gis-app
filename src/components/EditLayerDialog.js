import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Dialog,
        DialogTitle,
        DialogContent
        } from '@material-ui/core'

import SubmitOrCancelAction from './DialogActions/SubmitOrCancelAction';


const styles = theme => ({

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


  render() {
    const {open} = this.props;


    return (
      <div>

        <Dialog
          open={open}
          onClose={this.handleClose}
          scroll={'paper'}
          aria-labelledby="scroll-dialog-title"
        >
            <DialogTitle id="scroll-dialog-title">Edit Layers</DialogTitle>

                <DialogContent>
                  
                  Edit
        
                </DialogContent>

            <SubmitOrCancelAction submit={this.submitChanges} cancel={this.handleClose}/>

        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AddLayerDialog);