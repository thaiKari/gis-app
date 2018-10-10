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
import ColorPickerExpansionPanel from './ColorPickerExpansionPanel'


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

  componentDidUpdate = (prevProps) => {
    if (prevProps.currLayer !== this.props.currLayer) {
      this.setCurLayer();
    }
  }

  submitChanges = () => {
    console.log('submitChanges');
    //const {closeDialog, addLayers} = this.props
    //submitChanges(layers);
    //closeDialog();
  };

  handleClose = () => {
    const {closeDialog} = this.props;
    this.setCurLayer();
    closeDialog();
  };

  changeLayer = (layerId) => {
    const {layers} = this.props;
    let layer = layers.find(l => l.id == layerId);
    this.setState({layer: layer});
  }

  setCurLayer = () => {
    const {layers, currLayer} = this.props;
    let layer = layers.find(l => l.id ==currLayer);

    this.setState({
      layer: layer});
  }

  getContent = () => {
    let {layer} = this.state;
    const {layers} = this.props;

    return(
      <DialogContent>
        <LayersSelect layers={layers} currLayer={layer} changeLayer={this.changeLayer.bind(this)} />        
        <ColorPickerExpansionPanel/>
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