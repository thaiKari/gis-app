import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';

const styles = theme => ({
  
  });

  class SnackbarQuer extends Component {

    state = {
        lastMessage: ''
    }

    componentDidUpdate() {
        const {messages, enqueueSnackbar} = this.props;
        let {lastMessage} = this.state;

        if (messages && messages.message !==  lastMessage) {
            if (messages.options) {
                enqueueSnackbar(messages.message, messages.options);
            } else {
                enqueueSnackbar(messages.message, { variant: 'info' });
            }
            this.setState({lastMessage: messages.message});
        }
    }
    
    render() {
  
      return (
        <div></div>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(withSnackbar(SnackbarQuer));