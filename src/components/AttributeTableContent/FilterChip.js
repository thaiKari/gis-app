import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {ListItemText, ListItemSecondaryAction, ListItem, IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
    mainDiv: {
        borderRadius: 2,
        margin: theme.spacing.unit,
        listStyle: 'none',
        backgroundColor: theme.palette.action.hover
    }
  });

  class FilterChip extends Component {
    
    render() {

      const { classes, sentence, index, deleteSentence } = this.props;
  
      return (
        <div className={classes.mainDiv}>
            <ListItem button style={{padding:5}}>
                <ListItemText secondary={sentence}/>
                <ListItemSecondaryAction>
                      <IconButton aria-label="Delete" onClick={() => deleteSentence(index)}>
                        <DeleteIcon/>
                      </IconButton>
                    </ListItemSecondaryAction>
            </ListItem>
        </div>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(FilterChip);