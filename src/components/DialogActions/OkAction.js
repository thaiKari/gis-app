import React, {Component} from 'react';
import {
    DialogActions,
    Button} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  
  });

  class OkAction extends Component {

    componentDidMount() {
      document.addEventListener('keyup',this.keyupHandler.bind(this));
    }
    componentWillUnmount(){
      document.removeEventListener('keyup',this.keyupHandler.bind(this));
    }

    keyupHandler(e){
      const {ok} = this.props;
      if(e.keyCode === 13) {
        ok();
      }
    }
    
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