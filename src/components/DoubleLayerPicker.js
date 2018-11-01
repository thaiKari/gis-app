import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import LayersSelect from './LayersSelectSimple2';

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
      layerIds: ['', '']
    };

    changeLayer1 = (layerId) => {
      let {layerIds} = this.state;
      let {setLayerIds} = this.props;

      layerIds[0] = layerId;
      setLayerIds(layerIds);
 
      this.setState({
        layerIds: layerIds,
      });
    }

    changeLayer2 = (layerId) => {
      let {layerIds} = this.state;
      let {setLayerIds} = this.props;

      layerIds[1] = layerId;
      setLayerIds(layerIds);
 
      this.setState({
        layerIds: layerIds,
      });
    }
    
    render() {

      const { classes,  prompt1, prompt2, layers } = this.props;
      const {layerIds} = this.state;
  
      return (
        <div>
        <form className={classes.container}>
        <LayersSelect
            className={classes.spaced}
            layers={layers}
            layerId={layerIds[0]}
            changeLayer={this.changeLayer1.bind(this)}
            promt={prompt1} />
          <LayersSelect
            className={classes.spaced}
            layers={layers}
            layerId={layerIds[1]}
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