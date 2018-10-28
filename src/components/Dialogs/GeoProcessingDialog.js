import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Dialog,
    Typography,
    DialogContent,
    DialogTitle,
    TextField} from '@material-ui/core';
import SubmitOrCancelAction from '../DialogActions/SubmitOrCancelAction';
import OkAction from '../DialogActions/OkAction'
import LayersSelect from '../LayersSelectSimple';
import checkIfLayerNameExists from '../../utils/checkIfLayerNameExists';
import intersectFunction from '../../utils/geoprocessing/intersectFunction';

const styles = theme => ({
    dialogPaper: {
        minHeight: '50vh',
        overflowX:'hidden'
      },
      spaced: {
        marginBottom: 50,
      },
      container: {
        display: 'flex',
        flexWrap: 'wrap',
        width:'100%'
      },
  });

  class GeoProcessingDialog extends Component {
    state = {
        processingFunction: null
    }

    componentDidMount() {
        const {type} = this.props;
        this.setProcessingFunction(type);
    }

    setProcessingFunction = (type) => {
        let func = null;
  
        switch (type) {
          case 'intersect':
            func = intersectFunction;
            break;
        
          default:
            break;
        }
        this.setState({processingFunction: func});
      }

    calculate = () => {
    const {closeDialog} = this.props;
    const {processingFunction} = this.state;
        processingFunction();
        closeDialog();
    };

    handleClose = () => {
        const {closeDialog} = this.props;
        closeDialog();
      };

    getContent = type => {    
    return (
    <DialogContent>
        <Typography>{type}</Typography>            
    </DialogContent> );
      
      };
    
    render() {

      const {open, layers, type, classes} = this.props;
     
      let content = layers.length > 0 ?
      this.getContent(type)
      : 
      <DialogContent>
        <Typography>Add some layers first</Typography>         
      </DialogContent>

        let actions = layers.length > 0 ?
        <SubmitOrCancelAction submitText='Calculate' submit={this.calculate} cancel={this.handleClose}/>
        : 
        <OkAction ok={this.handleClose}/>
  
      return (
        <Dialog
        fullWidth={true}
        open={open}
        onClose={this.handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        classes={{ paper: classes.dialogPaper }}
        
      >
          <DialogTitle id="scroll-dialog-title">Edit Layers</DialogTitle>
            {content}
            {actions}
      </Dialog>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(GeoProcessingDialog);