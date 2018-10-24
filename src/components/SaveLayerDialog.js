//TODO: DELETE. this is not actually needed

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Dialog,
        AppBar,
        Tabs,
        Tab,
        DialogTitle,
    Typography} from '@material-ui/core'

import SingleIcon from '@material-ui/icons/CropOriginal';
import MultipleIcon from '@material-ui/icons/Filter';
import SubmitOrCancelAction from './DialogActions/SubmitOrCancelAction';
import LoadingFullpageCirular from '../utils/Loading/LoadingFullpageCirular';
import Loadable from 'react-loadable';

const SaveSingleLayer = Loadable({
    loader: () => import('./DialogContent/SaveSingleLayer'),
    loading: LoadingFullpageCirular,
  });

  const styles = theme => ({
    dialogPaper: {
      minHeight: '70vh',
    }
  });

class SaveLayerDialog extends React.Component {
  state = {
    open: false,

    uploadTypeIndex: 0,
    layers: []
  };

  componentWillUnmount = () => {
    // dialog has a side-effect if this not checked
    document.body.style.overflow = 'auto';
    this.setState({layers: []});
  } 

  componentDidMount  = () => {
    // dialog has a side-effect if this not checked
    document.body.style.overflow = 'auto';
    this.setState({layers: []});
  } 

  downloadFile = () => {
    const {closeDialog} = this.props
    console.log('DOWNLOAD');
    closeDialog();
  };

  handleClose = () => {
    const {closeDialog} = this.props;
    this.setState({
      layers: [],
      uploadTypeIndex: 0});
    closeDialog();
  };

  handleTabChange = (event, uploadTypeIndex) => {
    this.setState({ uploadTypeIndex });
  };
  
  getDialogContent() {
    const {layers} = this.props;
    const {uploadTypeIndex} = this.state;

    switch(uploadTypeIndex) {
      case 0:
          return <SaveSingleLayer layers={layers}/>
      case 1:
          return <Typography> Save Multiple Layers</Typography>
      default:
        return null
  }

  }

  render() {
    const {uploadTypeIndex} = this.state;
    const { open, classes} = this.props;

    let dialogContent = this.getDialogContent();
    

    return (
      <div>

        <Dialog
          fullWidth={true}
          classes={{ paper: classes.dialogPaper }}
          open={open}
          onClose={this.handleClose}
        >

          <AppBar position="static" color="default" >
              <Tabs value={uploadTypeIndex} onChange={this.handleTabChange} scrollButtons="off">
                <Tab icon={<SingleIcon />} label='SINGLE'/>
                <Tab icon={<MultipleIcon />} label='MULTIPLE'/>

              </Tabs>
            </AppBar>
            <DialogTitle id="scroll-dialog-title">Save Layers</DialogTitle>

            {dialogContent}

            <SubmitOrCancelAction submitText={'Save'} submit={this.downloadFile} cancel={this.handleClose}/>

        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SaveLayerDialog);