import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Tooltip, IconButton, Toolbar} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'
//import AddIcon from '@material-ui/icons/Add';
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
      },
      button: {
        margin: theme.spacing.unit,
        minWidth: 0
      }
  });

  class FilterChipContainer extends Component {
    constructor(props) {
        super(props)
  
        this.state = {
           // wipSentences: [''],
          };
      }

    //   submitFilter = (filter) => {
    //       const {addNewFilter} = this.props;
    //       console.log('submit', filter);
    //       //let {wipSentences} = this.state;
    //       //wipSentences.splice(filter.index, 1);
    //       addNewFilter(filter);
    
    //   }
    
    render() {

      const { classes, filterSentences, addNewFilter, deleteFilterSentence, removeAllFilters, rowHeaders  } = this.props;

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
                    <IconButton aria-label="Close" onClick={removeAllFilters}>
                        <CloseIcon />
                    </IconButton>
                </Tooltip>
            </div>
            </Toolbar>
            
            <FilterChip
                label={'wip'}
                submitFilter={addNewFilter}
                rowHeaders={rowHeaders}
            />
   

            {
                filterSentences.map( (filter, i) => {                    
                    let s = filter.attrib + ' ' + filter.operator + ' ' + filter.val;
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

/**
 *             <Tooltip title="Add Filter">
                <Button 
                    variant="fab"
                    size="small"
                    color="primary"
                    className={classes.button}
                    onClick={()=> console.log('add')}>
                    <AddIcon />
                </Button>
            </Tooltip>
 */