import React, {Component} from 'react';
import {
    DialogActions,
    Button} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      position: 'unset'
    }
  });

  class SubmitOrCancelAction extends Component {
    
    render() {

      const { classes, submit, submitText , cancel, cancelText, submitDisabled } = this.props;

      let submitBtnTxt = submitText ? submitText: 'Submit';
      let cancelBtnTxt = cancelText ? cancelText: 'Cancel';
      let disabled = submitDisabled ? true: false;
  
      return (
        <DialogActions>
            <Button
            classes={{ root: classes.root }}
            variant='contained'
            disabled={disabled}
            onClick={submit}
             color="primary">
              {submitBtnTxt}
            </Button>
            <Button
              classes={{ root: classes.root }}
              onClick={cancel}
              color="primary">
              {cancelBtnTxt}
            </Button>
      </DialogActions>   
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(SubmitOrCancelAction);