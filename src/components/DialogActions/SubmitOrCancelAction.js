import React, {Component} from 'react';
import {
    DialogActions,
    Button} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  
  });

  class SubmitOrCancelAction extends Component {
    
    render() {

      const { submit, submitText , cancel, cancelText, submitDisabled } = this.props;

      let submitBtnTxt = submitText ? submitText: 'Submit';
      let cancelBtnTxt = cancelText ? cancelText: 'Cancel';
      let disabled = submitDisabled ? true: false;
  
      return (
        <DialogActions>
            <Button variant='contained' disabled={disabled} onClick={submit}  color="primary">
              {submitBtnTxt}
            </Button>
            <Button onClick={cancel} color="primary">
              {cancelBtnTxt}
            </Button>
      </DialogActions>   
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(SubmitOrCancelAction);