import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import LayerListItem from './LayerListItem';
import {List}  from '@material-ui/core'


const styles = theme => ({
  
  });

  class SimpleLayerList extends Component {
    constructor(props) {
        super(props)


        this.state = {
            
         };
      }


    handleListItemClick = (layerId) => { 
        //do smth?
    };

    
    render() {

      const { layers, canDelete, deleteLayer } = this.props;
      let layersList = layers.map((layer, index) => {
          return(
            <LayerListItem 
            key={layer.id}
            layer={layer}
            index={index}
            layerSelected={null}
            handleListItemClick={this.handleListItemClick.bind(this)}
            toggleVisibility={null}
            canDelete={canDelete}
            deleteLayer={deleteLayer}/>
          );
      });
  
      return (
        <List>
            {layersList}
        </List>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(SimpleLayerList);