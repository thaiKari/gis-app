import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 100,
      },
  });

  class BboxTextField extends Component {
    state = {
        bbox:[0,0,0,0]
    }

    handleChange = index => event => {
        let {bbox} = this.state;
        bbox[index] = event.target.value;

        this.setState({
            bbox: bbox
        });
      };
    
    render() {
    const { bbox } = this.state
      const { classes } = this.props;
      // minX, minY, maxX, maxY]
  
      return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
            <TextField
                label="minX"
                className={classes.textField}
                value={bbox[0]}
                onChange={this.handleChange(0)}
                margin="normal"
                />
            <TextField
                label="miny"
                className={classes.textField}
                value={bbox[1]}
                onChange={this.handleChange(1)}
                margin="normal"
                />
            <TextField
                label="maxX"
                className={classes.textField}
                value={bbox[2]}
                onChange={this.handleChange(2)}
                margin="normal"
                />
            <TextField
                label="maxY"
                className={classes.textField}
                value={bbox[3]}
                onChange={this.handleChange(3)}
                margin="normal"
                />
            </div>

        </div>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(BboxTextField);