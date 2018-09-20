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

      var { layer, index, layerSelected, handleListItemClick, toggleVisibility } = this.props;
      var visibleIcon = layer.visible ? <VisibleIcon /> : <NotVisibleIcon />
  
      return (
        <ListItem
        button
        style={{padding:5, overflow:'hidden'}}
        selected={layerSelected}
        onClick={event => handleListItemClick(event, index)}
      >

          <ListItemIcon onClick={event => toggleVisibility(layer.id)}>
            {visibleIcon}
          </ListItemIcon>

        <ListItemIcon>
          <LayerIcon layer={layer} index={index}/>
        </ListItemIcon>
        <ListItemText disableTypography secondary={<Typography noWrap={true}>{layer.displayName}</Typography>} />
      </ListItem>

      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(LayerListItem);