import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, Divider } from '@material-ui/core';
import AttributeTableToolbar from '../components/AttributeTableContent/AttributeTableToolbar'

const styles = theme => ({
    drawer: {
        width: '100%',
        flexShrink: 0,
      },
      drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      },
      drawerPaper: {
        width: '100%',
      },
  });

  class AttributeTable extends Component {
    
    render() {
    console.log(this.props)
      const { classes,open, closeAttribTable } = this.props;
  
      return (
        <div>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="bottom"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <AttributeTableToolbar closeAttribTable={closeAttribTable}/>
          <Divider />
          content
        </Drawer>
        </div>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(AttributeTable);