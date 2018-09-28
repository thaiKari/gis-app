import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ListItem,  ListItemIcon, ListItemText, Typography} from '@material-ui/core';
import VisibleIcon from '@material-ui/icons/Visibility';
import NotVisibleIcon from '@material-ui/icons/VisibilityOff';
import LayerIcon from './LayerIcon';
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
      const {classes, theme, layer, index, layerSelected, handleListItemClick, toggleVisibility } = this.props;
      var textColor = layer.visible ? 'textPrimary' : 'textSecondary'
      var visibleIcon = layer.visible ? <VisibleIcon/> : <NotVisibleIcon style={{color: theme.palette.text.disabled}} />
  
      var visibleDivStyle = classNames({
        [classes.hoverBox]: true,
        [classes.hoverBoxActive]: hoverVisible
      });

      return (
        <div >
          <ListItem
          button
          style={{padding:5, overflow:'hidden'}}
          selected={layerSelected}
          onClick={event => handleListItemClick(layer.id)}>

            <ListItemIcon onClick={event => toggleVisibility(layer.id)}
            className={visibleDivStyle}
            onMouseOver={()=> this.setState({hoverVisible: true})}
            onMouseOut={()=> this.setState({hoverVisible: false})}>
              {visibleIcon}
            </ListItemIcon>

          <ListItemIcon>
            <LayerIcon layer={layer} index={index}/>
          </ListItemIcon>
          <ListItemText disableTypography secondary={<Typography color={textColor} noWrap={true}>{layer.displayName}</Typography>} />
        </ListItem>
      </div>

      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(LayerListItem);