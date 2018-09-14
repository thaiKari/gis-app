import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Typography, SwipeableDrawer } from '@material-ui/core';

const styles = theme => ({
    toolbarDrawerPaper: {
        //backgroundColor: theme.palette.primary.dark,
        width: theme.spacing.unit * 7,
        height: 'auto', 
        marginTop: theme.appBarHeight,
        overflowX: 'hidden',
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing.unit * 9,
        },
        grow: {
          flexGrow: 1,
        },
      }
  });

  class ToolkitBar extends Component {
    
    render() {

      const { classes, toolDrawerOpen } = this.props;
  
      return (
        <SwipeableDrawer
            variant="persistent"
            open={toolDrawerOpen}
            anchor={'right'}
            classes={{
                paper: classNames(classes.toolbarDrawerPaper),
            }}
        >
            <Typography>Stuff</Typography>
  
      </SwipeableDrawer>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(ToolkitBar);