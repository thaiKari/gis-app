
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, MenuItem, Select}  from '@material-ui/core'


const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    width: '100%',
  },
  Select:{
    width: '100%',
  }
});



class LayersSelect extends React.Component {
  state = {
    curValue: '',
  };

  handleChange = name => event => {
    const {changeLayer} = this.props
    changeLayer(event.target.value)
    this.setState({ [name]: Number(event.target.value) });
  };

  componentDidMount() {
    this.setCurLayer();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.layerIndex !== this.props.layerIndex) {
      this.setCurLayer();
    }
  }

  setCurLayer = () => {
    const {layerIndex, layers} = this.props;
    
    let curValue = layerIndex < layers.length 
                && layerIndex >= 0
                && layerIndex !== null ? 
                Number(layerIndex) : '';

                console.log(curValue)
    this.setState({curValue: curValue});
  }

  render() {
    const { layers, classes, promt } = this.props;
    let options = layers.map((layer, index) => {

      return <MenuItem key={index} value={index}>{layer.displayName}</MenuItem >

    }); 

    let promtText = promt ? promt : 'Choose a Layer';

    return (

    <FormControl fullWidth={true} className={classes.formControl}>
      <InputLabel htmlFor="age-simple">{promtText}</InputLabel>
      <Select
        value={this.state.curValue}
        onChange={this.handleChange('curValue')}
        placeholder="Choose a Layer to edit"
      >
        {options}
      </Select>
    </FormControl>
    );
  }
}

export default withStyles(styles, { withTheme: true })(LayersSelect);