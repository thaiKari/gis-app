import React, {Component} from 'react';
import {
    DialogActions,
    Button} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  
  });

  class DA_SubmitOrCancel extends Component {
    
    render() {

      const { submit, submitText , cancel, cancelText } = this.props;

      let submitBtnTxt = submitText ? submitText: 'Submit'
      let cancelBtnTxt = cancelText ? cancelText: 'Cancel'
  
      return (
        <DialogActions>
            <Button onClick={submit}  color="primary">
              {submitBtnTxt}
            </Button>
            <Button onClick={cancel} color="primary">
              {cancelBtnTxt}
            </Button>
      </DialogActions>   
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(DA_SubmitOrCancel);