import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ListItem,  ListItemIcon, ListItemText, Typography} from '@material-ui/core';
import VisibleIcon from '@material-ui/icons/Visibility';
import NotVisibleIcon from '@material-ui/icons/VisibilityOff';
import LayerIcon from './LayerIcon';

const styles = theme => ({
  
  });

  class LayerListItem extends Component {
    
    render() {

      var { layer, index, layerSelected, handleListItemClick, setLayerColor } = this.props;
      var visibleIcon = layer.visible ? <VisibleIcon /> : <NotVisibleIcon />

      console.log('selected', layer.displayName, layerSelected);
  
      return (
        <ListItem
        button
        style={{padding:5, overflow:'hidden'}}
        selected={layerSelected}
        onClick={event => handleListItemClick(event, index)}
      >
        <ListItemIcon>
          {visibleIcon}
        </ListItemIcon>
        <ListItemIcon>
          <LayerIcon setLayerColor={setLayerColor} layer={layer} index={index}/>
        </ListItemIcon>
        <ListItemText disableTypography secondary={<Typography noWrap={true}>{layer.displayName}</Typography>} />
      </ListItem>

      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(LayerListItem);