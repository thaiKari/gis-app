import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography} from '@material-ui/core';

const styles = theme => ({
    feedbackDiv: {
       padding: theme.spacing.unit,
       borderRadius: 5,
       margin: theme.spacing.unit

    }
  });

  class DialogFeedback extends Component {
    
    render() {

      const { message, classes, variant } = this.props;

      let bgcolor = '#2979ff'

      switch (variant) {
          case 'error':
            bgcolor = 'red';
            break;              
      
          default:
              break;
      }
  
      return (
        <div className={classes.feedbackDiv} style={{backgroundColor: bgcolor}}>
            <Typography> {message}</Typography>
        </div>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(DialogFeedback);