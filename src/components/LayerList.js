import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import LayerListItem from './LayerListItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import findIndexWithAttribute from '../utils/findIndexWithAttribute'

const styles = theme => ({
  
  });

const getItemStyle = (theme, isDragging, draggableStyle ) => ({
  userSelect: 'none',
  background: isDragging ? theme.palette.primary.main : 'None',
  ...draggableStyle,
  });

  class LayerList extends Component {
    constructor(props) {
        super(props)


        this.state = {
            selectedLayers: {},
            ctrlPressed: false,
            shiftPressed: false,
         };
         this.onDragEnd = this.onDragEnd.bind(this);
      }

      onDragEnd(result) {
        if (!result.destination) {
          return;
        }

        const { reorderLayersList } = this.props;
        reorderLayersList( result.source.index, result.destination.index);
    
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
      if(e.key === 'Control'){
        this.setState({ctrlPressed: true});
      }
      if(e.key === 'Shift'){
        this.setState({shiftPressed: true});
      }
    }

    keyupHandler(e){
      if(e.key === 'Control'){
        this.setState({ctrlPressed: false});
      }
      if(e.key === 'Shift'){
        this.setState({shiftPressed: false});
      }
    }


    componentDidUpdate = (prevProps) => {

      if(prevProps.layersChange !== this.props.layersChange){
        this.layersChange();
      }
        
    }

    layersChange = () => {
      let {selectedLayers} = this.state;
      let {layers} = this.props;

      let newSelectedLayers = layers.reduce(
        (selected, layer) => {

          if(! selected[layer.id] ) {
            selected[layer.id] = false;
          }

          return selected
        },
        selectedLayers
      );

      this.setState({selectedLayers: newSelectedLayers});
    }

    selectLayersBetween(lastClickedLayer, layerId, selectedLayers) {
      const {layers} = this.props;
      var fromIndex, toIndex;
      let i1 = findIndexWithAttribute(layers, 'id', lastClickedLayer);
      let i2 = findIndexWithAttribute(layers, 'id', layerId);

      if (i1 < i2 ) {
        fromIndex = i1;
        toIndex = i2;
      } else {
        fromIndex = i2;
        toIndex = i1;
      }

      for (var i = fromIndex; i <= toIndex; i++) {
      
        var id = layers[i].id;
        selectedLayers[id] = true;
      }

      return selectedLayers;

    }

    handleListItemClick = (layerId) => {
      
        let {selectedLayers, ctrlPressed, shiftPressed, lastClickedLayer} = this.state;
        const {layers} = this.props;

        if (ctrlPressed) {
          selectedLayers[layerId] = !selectedLayers[layerId] 
        }
        else if (shiftPressed) {
          if (lastClickedLayer) {
            selectedLayers = this.selectLayersBetween(lastClickedLayer, layerId, selectedLayers)
          } else {
            selectedLayers = this.selectLayersBetween(layers[0].id, layerId, selectedLayers)
          }
         
        }
        else {
          Object.keys(selectedLayers).forEach(key => {
            selectedLayers[key] = key === layerId ?
            ! selectedLayers[key] : false;
          });
        }

        this.setState({ 
          selectedLayers: selectedLayers,
          lastClickedLayer: layerId  });
    };
    
    render() {

      const { layers, toggleVisibility, theme } = this.props;
      const { selectedLayers } = this.state;

  
      return (
        <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} >
              {layers.map((layer, index) => (
                <Draggable key={layer.id} draggableId={layer.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        theme,
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >

                    <LayerListItem 
                      key={layer.id}
                      layer={layer}
                      index={index}
                      layerSelected={selectedLayers[layer.id]}
                      handleListItemClick={this.handleListItemClick.bind(this)}
                      toggleVisibility={toggleVisibility}/>
                      
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(LayerList);

/**
         <List>
            {layersList}
        </List> 
 
 */