import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  
  });

  class DoubleLayerPicker extends Component {
    
    render() {

      const { classes } = this.props;
  
      return (
        <div>DoubleLayerPicker</div>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(DoubleLayerPicker);