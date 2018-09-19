import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import LayerListItem from './LayerListItem';
import {List} from '@material-ui/core';

const styles = theme => ({
  
  });

  class LayerList extends Component {
    constructor() {
        super()
        this.state = {
            selectedIndex: null
         };
      }

    handleListItemClick = (event, index) => {
        console.log('click', index);
        this.setState({ selectedIndex: index });
    };
    
    render() {

      const { classes, layers, setLayerColor } = this.props;
      const { selectedIndex } = this.state;

      var layersList = layers.map((layer, index) => {
        return <LayerListItem 
            key={layer.id}
            layer={layer}
            index={index}
            layerSelected={selectedIndex === index}
            handleListItemClick={this.handleListItemClick.bind(this)}
            setLayerColor={setLayerColor}/>
      })
  
      return (
        <List>
            {layersList}
        </List>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(LayerList);