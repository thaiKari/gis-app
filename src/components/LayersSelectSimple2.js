
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, MenuItem, Select}  from '@material-ui/core'

//This is prefered over the original. Uses ids over indices.

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
    this.setState({ [name]: event.target.value });
  };

  componentDidMount() {
    this.setCurLayer();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.layerId !== this.props.layerId) {
      this.setCurLayer();
    }
  }

  setCurLayer = () => {
    const {layerId} = this.props;

    if( layerId ) {
      this.setState({curValue: layerId});
    }

    
  }

  render() {
    const { layers, classes, promt } = this.props;
    let options = layers.map((layer) => {

      return <MenuItem key={layer.id} value={layer.id}>{layer.displayName}</MenuItem >

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