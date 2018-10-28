import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import LayersSelect from './LayersSelectSimple';

const styles = theme => ({
    spaced: {
      marginBottom: 50,
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width:'100%'
    },
  });

  class DoubleLayerPicker extends Component {
    state = {
      layerNums: [-1, -1]
    };

    changeLayer1 = (layerIndex) => {
      let {layerNums} = this.state;
      let {setLayerNums} = this.props;

      layerNums[0] = layerIndex;
      setLayerNums(layerNums);
 
      this.setState({
        layerNums: layerNums,
      });
    }

    changeLayer2 = (layerIndex) => {
      let {layerNums} = this.state;
      let {setLayerNums} = this.props;

      layerNums[1] = layerIndex;
      setLayerNums(layerNums);

      this.setState({
        layerNums: layerNums,
      });
    }
    
    render() {

      const { classes,  prompt1, prompt2, layers } = this.props;
      const {layerNums} = this.state;
  
      return (
        <div>
        <form className={classes.container}>
        <LayersSelect
            className={classes.spaced}
            layers={layers}
            layerIndex={layerNums[0]}
            changeLayer={this.changeLayer1.bind(this)}
            promt={prompt1} />
          <LayersSelect
            className={classes.spaced}
            layers={layers}
            layerIndex={layerNums[1]}
            changeLayer={this.changeLayer2.bind(this)}
            promt={prompt2} />
        </form>
        </div>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(DoubleLayerPicker);
         /* <LayersSelect
            className={classes.spaced}
            layers={layers}
            layerIndex={layerIndex}
            changeLayer={this.changeLayer(0).bind(this)} />
            <LayersSelect
            className={classes.spaced}
            layers={layers}
            layerIndex={layerIndex}
            changeLayer={this.changeLayer(2).bind(this)} />  */