import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Tooltip, IconButton, Toolbar} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'
import FilterChip from './FilterChip';

const styles = theme => ({
    spacer: {
        flex: '1 1 100%',
      },
      actions: {
        color: theme.palette.text.secondary,
      },
      title: {
        flex: '0 0 auto',
      },
      chip: {
        margin: theme.spacing.unit,
      }
  });

  class FilterChipContainer extends Component {
    
    render() {

      const { classes, filterSentences, addNewFilter, deleteFilterSentence  } = this.props;
  
      return (
        <div>
            <Toolbar className={classes.root}>
            <div className={classes.title}>
                <Typography variant="h6">
                    Filter Attributes
                </Typography>
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                <Tooltip title="Remove Filters">
                    <IconButton aria-label="Close">
                        <CloseIcon />
                    </IconButton>
                </Tooltip>
            </div>
            </Toolbar>

            {
                filterSentences.map( (s, i) => {
                    console.log('hi', s)
                    return (
                        <FilterChip
                        key={i}
                        label={s}
                        sentence={s}
                        index={i}
                        deleteSentence={deleteFilterSentence}
                    />
                    );      

                })
            }
        </div>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(FilterChipContainer);