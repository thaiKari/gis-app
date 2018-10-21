import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import classNames from 'classnames';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  fullPage: {
    position: 'fixed',
    top:0,
    bottom:0,
    left:0,
    right: 0,
    margin: 'auto',
    zIndex: 99999
  },
});

function CircularLoader(props) {
  const { classes, fullpage } = props;

  let size = fullpage ? '15vh' : 30;

  return (
    <div>
      <CircularProgress 
            className={classNames(classes.progress, {
                [classes.fullPage]: fullpage,
              })}
              size={size}
              thickness={3}
            />
    </div>
  );
}

export default withStyles(styles)(CircularLoader);