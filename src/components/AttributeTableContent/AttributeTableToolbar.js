import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Toolbar, Tooltip, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'

const styles = theme => ({
    content: {
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3
    }
  });

  class AttributeTableToolbar extends Component {
    
    render() {

      const { classes, closeAttribTable } = this.props;
      console.log(this.props)
  
      return (
        <Toolbar className={classes.content} disableGutters={true}>

            <Typography variant="h5"  noWrap>
              Attribute Table
            </Typography>
      
      <div style={{flex: 1}}></div>

      <Tooltip title="Close Atribute Table">
      <div>
        <IconButton onClick={closeAttribTable}>
          <CloseIcon/>
        </IconButton>
        </div>
      </Tooltip>
      
    </Toolbar>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(AttributeTableToolbar);