import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import LayerListItem from './LayerListItem';
import {List} from '@material-ui/core';

const styles = theme => ({
  
  });



  class LayerList extends Component {
    constructor(props) {
        super(props)


        this.state = {
            selectedLayers: {},
            selectedIndex: null,
            ctrlPressed: false,
            shiftPressed: false
         };
      }


    componentDidMount() {
      this.layersChange();
      document.addEventListener('keydown',this.keydownHandler.bind(this));
      document.addEventListener('keyup',this.keyupHandler.bind(this));
    }
    componentWillUnmount(){
      document.removeEventListener('keydown',this.keydownHandler.bind(this));
      document.removeEventListener('keyup',this.keyupHandler.bind(this));
    }

    keydownHandler(e){
      if(e.key == 'Control'){
        this.setState({ctrlPressed: true});
      }
      if(e.key == 'Shift'){
        this.setState({shiftPressed: true});
      }
    }

    keyupHandler(e){
      if(e.key == 'Control'){
        this.setState({ctrlPressed: false});
      }
      if(e.key == 'Shift'){
        this.setState({shiftPressed: false});
      }
    }


    componentDidUpdate = (prevProps) => {

      if(prevProps.layersChange != this.props.layersChange){
        this.layersChange();
      }
        
    }

    layersChange = () => {
      let {selectedLayers} = this.state;
      let {layers} = this.props;

      let newSelectedLayers = layers.reduce(
        (selected, layer, index) => {

          if(! selected[layer.id] ) {
            selected[layer.id] = false;
          }

          return selected
        },
        selectedLayers
      );

      this.setState({selectedLayers: newSelectedLayers});
    }

    handleListItemClick = (layerId) => {
      
        let {selectedLayers, ctrlPressed, shiftPressed} = this.state;
        if (ctrlPressed) {
          selectedLayers[layerId] = true
        }
        else if (shiftPressed) {
         
        }
        else {
          Object.keys(selectedLayers).forEach(key => {
            selectedLayers[key] = false
          });
          selectedLayers[layerId] = !selectedLayers[layerId];
        }

        this.setState({ selectedLayers: selectedLayers });
    };
    
    render() {
      console.log('ctrlKey', this.state.ctrlPressed)

      const { layers, toggleVisibility } = this.props;
      const { selectedIndex, selectedLayers } = this.state;

      var layersList = layers.map((layer, index) => {
        return <LayerListItem 
            key={layer.id}
            layer={layer}
            index={index}
            layerSelected={selectedLayers[layer.id]}
            handleListItemClick={this.handleListItemClick.bind(this)}
            toggleVisibility={toggleVisibility}/>
      })
  
      return (
        <List>
            {layersList}
        </List>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(LayerList);