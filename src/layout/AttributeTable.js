import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, Divider } from '@material-ui/core';
import AttributeTableToolbar from '../components/AttributeTableContent/AttributeTableToolbar';
import AttributeTableTable from '../components/AttributeTableContent/AttributeTableTable';

const styles = theme => ({
    drawer: {
        width: '100%',
        flexShrink: 0,
      },
      drawerPaper: {
        width: '100%',
      },
      tableRoot: {
        display: 'flex',
        justifyContent: 'center'
      },
      tableContent: {
        backgroundColor: theme.palette.action.hover,
        minWidth: 500,
        height: '100%'
      }
  });

  class AttributeTable extends Component {
    
    render() {
      const { classes,open, closeAttribTable, layerId, layers } = this.props;

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

          {layerId ? 
            <div className={classes.tableRoot}>
                <div className={classes.tableContent}>
                    <AttributeTableTable layerId={layerId} layers={layers}/>
                </div>
            </div>
            :null}


          
        </Drawer>
        </div>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(AttributeTable);