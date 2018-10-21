import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearLoader from '../../components/LoadingTypes/LinearLoader';

const styles = {
};

function Loading(props) {

  if (props.isLoading) {
    if (props.timedOut) {
      return <div>Loader timed out!</div>;
    } else if (props.pastDelay) {
          return <LinearLoader />;
    } else {
      return null;
    }
  } else if (props.error) {
    return <div>Error! Component failed to load</div>;
  } else {
    return null;
  }
}

export default withStyles(styles)(Loading);