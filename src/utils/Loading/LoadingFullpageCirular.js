import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularLoader from '../../components/LoadingTypes/CircularLoader';

const styles = {
};

function LoadingFullpageCirular(props) {

  if (props.isLoading) {
    if (props.timedOut) {
      return <div>Loader timed out!</div>;
    } else if (props.pastDelay) {
          return <CircularLoader fullpage={true} />;
    } else {
      return null;
    }
  } else if (props.error) {
    return <div>Error! Component failed to load</div>;
  } else {
    return null;
  }
}

export default withStyles(styles)(LoadingFullpageCirular);