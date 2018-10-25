//NOT IN USE
import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { DialogContent}  from '@material-ui/core'
import LayersSelect from '../LayersSelectSimple';

const styles = theme => ({
    spaced: {
      marginBottom: 50,
      width:'100%'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width:'100%'
      },
  });

  class SaveSingleLayer extends Component {
    state = {
        layerIndex: null,
        layerName: '',
      };

    changeLayer = (layerIndex) => {
    const{layers} = this.props;
    let layerName = layers[layerIndex] ? layers[layerIndex].displayName : '';

    this.setState({
        layerIndex: layerIndex,
        layerName: layerName
    });
    }

    render() {
        const {layers, classes} = this.props
        const {layerIndex} = this.state;

      return (

          <DialogContent>
            <form className={classes.container}>
 
            <LayersSelect
                className={classes.spaced}
                layers={layers}
                layerIndex={layerIndex}
                changeLayer={this.changeLayer.bind(this)} />  

            </form>
               

          </DialogContent>
  

      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(SaveSingleLayer);