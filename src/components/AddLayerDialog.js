import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Dialog,
        AppBar,
        Tabs,
        Tab} from '@material-ui/core'

import UploadIcon from '@material-ui/icons/CloudUpload';
import MapIcon from '@material-ui/icons/Map';
import CreateIcon from '@material-ui/icons/Create';
import DialogContentUpload from './DialogContentUpload'


const styles = theme => ({
  dialog: {
    width: 500,
    minWidth: 500
  },
});

class AddLayerDialog extends React.Component {
  state = {
    open: false,
    scroll: 'paper',
    uploadTypeIndex: 0,
  };

  submitJsonLayers = (json, name, id) => {
    const {closeDialog} = this.props
    //TODO
    closeDialog();
  };

  receiveLayers(newLayers) {
    console.log('newLayers', newLayers)
  }

  handleClose = () => {
    const {closeDialog} = this.props
    closeDialog();
  };

  handleTabChange = (event, uploadTypeIndex) => {
    this.setState({ uploadTypeIndex });
  };
  
  getDialogContent() {
    const {uploadTypeIndex} = this.state;
    const {receiveNewJson} = this.props;

    switch(uploadTypeIndex) {
      case 0:
          return <DialogContentUpload submitLayers={this.receiveLayers.bind(this)}/>
      case 1:
          return null
      default:
        return null
  }

  }

  render() {
    const {uploadTypeIndex} = this.state;
    const {classes, open} = this.props;

    let dialogContent = this.getDialogContent();

    return (
      <div>

        <Dialog
          open={open}
          onClose={this.handleClose}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
        >

          <AppBar position="static" color="default" style={{width: 500}}>
              <Tabs value={uploadTypeIndex} onChange={this.handleTabChange} scrollable scrollButtons="off">
                <Tab icon={<UploadIcon />} label='UPLOAD'/>
                <Tab icon={<MapIcon />} label='WMS'/>
                <Tab icon={<CreateIcon />} label='CREATE'/>

              </Tabs>
            </AppBar>

            {dialogContent}

        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AddLayerDialog);