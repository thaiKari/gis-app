import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const styles = theme => ({
  
  });

  class FilterChipContainer extends Component {
    
    render() {

      const { classes } = this.props;
  
      return (
        <Paper>
            
        </Paper>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(FilterChipContainer);