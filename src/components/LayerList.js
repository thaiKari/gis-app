import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import LayerListItem from './LayerListItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
         };
         
      }


    render() {

      const {handleListItemClick,
        handleListItemRightClick,
        onDragEnd,
        layers,
        toggleVisibility,
        theme,
        selectedLayers } = this.props;
  
      return (
        <DragDropContext onDragEnd={onDragEnd}>
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
                      key={'lli'+ layer.id}
                      layer={layer}
                      index={index}
                      layerSelected={selectedLayers[layer.id]}
                      handleListItemClick={handleListItemClick}
                      handleListItemRightClick={handleListItemRightClick}
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