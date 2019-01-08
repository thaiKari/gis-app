import React, {Component} from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Toolbar, Typography, Tooltip, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import NewLayerIcon from '@material-ui/icons/InsertDriveFile';
import FilterListIcon from '@material-ui/icons/FilterList';
import MeasureIcon from '@material-ui/icons/Straighten';
import { lighten } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
      },
      highlight:
        theme.palette.type === 'light'
          ? {
              color: theme.palette.secondary.main,
              backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
          : {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.secondary.dark,
            },
      spacer: {
        flex: '1 1 100%',
      },
      actions: {
        color: theme.palette.text.secondary,
      },
      title: {
        flex: '0 0 auto',
      },
      actionDiv: {
        display: 'inline-flex'
      }
  });

  /**
   * displayed above the table. gives user ability to press filter button. Or if some features are selected
   * it will show how many features are selected and give choices to delete selection or create a new layer 
   * from selection.
   */

  class SecondaryTableToolbar extends Component {
    
    render() {

        const { displayFilter, numSelected, classes, layer, addAreaColumn, handleDeleteSelected, handleNewLayerFromSelected } = this.props;
        return (
            <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
            >
            <div className={classes.title}>
                {numSelected > 0 ? (
                <Typography color="inherit" variant="subtitle1">
                    {numSelected} selected
                </Typography>
                ) : (
                <Typography variant="h6" id="tableTitle">
                    {layer.displayName}
                </Typography>
                )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 ? (
                <div className={classes.actionDiv}>
                <Tooltip title="New Layer From Selection">
                    <IconButton aria-label="New" onClick={handleNewLayerFromSelected}>
                        <NewLayerIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete Selection">
                    <IconButton aria-label="Delete" onClick={handleDeleteSelected}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                </div>
                ) : (
                <div className={classes.actionDiv}>
                {(layer.type === 'Polygon' || layer.type === 'MultiPolygon') ? 
                <Tooltip title="Calculate Area">
                    <IconButton aria-label="calculate" onClick={addAreaColumn}>
                        <MeasureIcon />
                    </IconButton>
                </Tooltip>
                : null
                }
                <Tooltip title="Filter list">
                    <IconButton aria-label="Filter list" onClick={displayFilter}>
                    <FilterListIcon />
                    </IconButton>
                </Tooltip>
                
                </div>
                )}
            </div>
            </Toolbar>
        ); 
    }
  }

export default withStyles(styles, { withTheme: true })(SecondaryTableToolbar);