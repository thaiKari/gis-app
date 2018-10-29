import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {TextField} from '@material-ui/core/';
import checkIfLayerNameExists from '../utils/checkIfLayerNameExists';

const styles = theme => ({
  
  });

  class LayerNameTextField extends Component {

    componentDidMount() {
        const {defaultName} = this.props;
        this.setState({layerName: defaultName})
    }

    nameChange = name => event => {
        const {setName} = this.props;
        setName(event.target.value);
      }
    
    render() {

      const { promt, layerName, layers, layerIndex} = this.props;

      let Nameerror = false;
      let errorText = '';
  
      if(layerName === '') {
        errorText ='layer name cannot be empty';
        Nameerror = true;
      } else if ( checkIfLayerNameExists(layerName, layers, layerIndex)) {
        // Name exists already and is not the same as this layers names
        errorText ='That name is already in use';
        Nameerror = true;
      }
      let promtText = promt? promt: "Layer Name";
  
      return (
        <form>
            <TextField
            id="outlined-full-width"
            label={promtText}
            value={layerName}
            fullWidth={true}
            error={Nameerror}
            onChange={this.nameChange('')}      
            margin="normal"
            variant="outlined"
            helperText={errorText}
            InputLabelProps={{
            shrink: true,
            }}
        />
      </form>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(LayerNameTextField);