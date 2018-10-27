import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Typography, SwipeableDrawer, Divider } from '@material-ui/core';

const styles = theme => ({
    toolbarDrawerPaper: {
        //backgroundColor: theme.palette.primary.dark,
        width: theme.spacing.unit * 7,
        height: 'auto', 
        //marginTop: 70,
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
            onClose={()=>{}}
            onOpen={()=>{}}              
            classes={{
                paper: classNames(classes.toolbarDrawerPaper),
            }}
        >
        <div style={{height: 75}}></div>
        <Divider/>
        <Typography>Stuff</Typography>
        <Divider/>
        <Typography>Stuff</Typography>
  
      </SwipeableDrawer>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(ToolkitBar);