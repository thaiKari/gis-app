import React, {Component} from 'react';
import {
    DialogActions,
    Button} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

/**
 * Ok button. Used for information dialogs.
 */


const styles = theme => ({
  
  });

  class OkAction extends Component {
    
    render() {

      const { ok, okText } = this.props;

      let okBtnTxt = okText ? okText: 'OK'
  
      return (
        <DialogActions>
            <Button onClick={ok}  color="primary">
              {okBtnTxt}
            </Button>
      </DialogActions>   
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(OkAction);