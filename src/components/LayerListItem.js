import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, ListItem,  ListItemIcon, ListItemText, Typography, ListItemSecondaryAction} from '@material-ui/core';
import VisibleIcon from '@material-ui/icons/Visibility';
import NotVisibleIcon from '@material-ui/icons/VisibilityOff';
import LayerIcon from './LayerIcon';
import DeleteIcon from '@material-ui/icons/Delete';
import classNames from 'classnames';

const styles = theme => ({
    hoverBox: {
     
    },
    hoverBoxActive: {
      backgroundColor: theme.palette.action.hover
    },
    layerDisabled: {
      backgroundColor: theme.palette.action.hover
    }
  
  });



  class LayerListItem extends Component {
    state = {
      hoverVisible: false
    };


    render() {
    
      const {hoverVisible} = this.state;
      const {deleteLayer,
        classes,
        theme,
        layer,
        index,
        layerSelected,
        handleListItemClick,
        toggleVisibility,
        handleListItemRightClick } = this.props;
      var textColor = layer.visible ? 'textPrimary' : 'textSecondary'
      var visibleIcon = layer.visible ? <VisibleIcon/> : <NotVisibleIcon style={{color: theme.palette.text.disabled}} />
  
      var visibleDivStyle = classNames({
        [classes.hoverBox]: true,
        [classes.hoverBoxActive]: hoverVisible
      });

      let visibilityIcon = toggleVisibility ?
          <ListItemIcon onClick={event => toggleVisibility(layer.id)}
          className={visibleDivStyle}
          onMouseOver={()=> this.setState({hoverVisible: true})}
          onMouseOut={()=> this.setState({hoverVisible: false})}>
            {visibleIcon}
          </ListItemIcon>
          : null
      
      let deleteButton = this.props.canDelete ?
        <ListItemSecondaryAction>
            <IconButton onClick={() => deleteLayer(index)} aria-label="Delet">
                <DeleteIcon />
            </IconButton>
        </ListItemSecondaryAction>
        : null

      return (
        <div >
          <ListItem
          button
          style={{padding:5, overflow:'hidden'}}
          selected={layerSelected}
          onClick={event => handleListItemClick(layer.id)}
          onContextMenu={event => {handleListItemRightClick(layer.id, event.currentTarget); event.preventDefault();}}>

          {visibilityIcon}

          <ListItemIcon>
            <LayerIcon
              layer={layer}
              index={index}/>
          </ListItemIcon>
          <ListItemText disableTypography secondary={<Typography color={textColor} noWrap={true}>{layer.displayName}</Typography>} />
          {deleteButton}
        </ListItem>
      </div>

      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(LayerListItem);