import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Typography, SwipeableDrawer, Divider, IconButton, Paper, Button } from '@material-ui/core';
import difference from '../icons/difference_primary.png';
import union from '../icons/union_primary.png';
import intersect from '../icons/intersect_primary.png';

const styles = theme => ({
      toolbarDrawerPaper: {
        width: 80,
        height: 'auto', 
        overflowX: 'hidden',
        display: 'flex',
        justifyContent: 'center'
      },
      image: {
        width: 50,
        height: 50,
        display: 'flex',
        justifyContent: 'center'

      },
      button: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      },
      text: {
        fontSize: 11.5
      },
      divider: {
        marginTop: 5,
        marginBottom: 5,
        zIndex: 10000
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

        <Divider className={classes.divider} />
        <Button>
          <div className={classes.button}>
          <img  src={difference} alt="difference Icon" className={classes.image}/>
          <Typography gutterBottom  className={classes.text} variant='button'> difference</Typography>
          </div>
        </Button>
        <Divider className={classes.divider} />
        <Button>
          <div className={classes.button}>
          <img  src={intersect} alt="intersect Icon" className={classes.image}/>
          <Typography gutterBottom  className={classes.text} variant='button'> intersect</Typography>
          </div>
        </Button>
        <Divider className={classes.divider} />
        <Button>
          <div className={classes.button}>
          <img  src={union} alt="union Icon" className={classes.image}/>
          <Typography gutterBottom  className={classes.text} variant='button'> union</Typography>
          </div>
        </Button>
        <Divider className={classes.divider} />
  
      </SwipeableDrawer>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(ToolkitBar);