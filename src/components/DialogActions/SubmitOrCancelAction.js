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

    componentDidMount() {
      document.addEventListener('keyup',this.keyupHandler.bind(this));
    }
    componentWillUnmount(){
      document.removeEventListener('keyup',this.keyupHandler.bind(this));
    }

    keyupHandler(e){
      const {submit} = this.props;
      if(e.keyCode === 13) {
        submit();
      }
    }
    
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