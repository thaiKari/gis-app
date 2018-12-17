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
        maxWidth: 1500,
        minWidth: 500,
        height: 500
      }
  });

  class AttributeTable extends Component {

    constructor(props) {
        super(props)
        const {layerId, layers} = props;
        let layer = this.getLayerWithId(layerId, layers);

        this.state = {
            layer: layer ? layer: ''
         };  
      }
    
    componentDidUpdate(prevProps) {
        if(prevProps.layerId !== this.props.layerId) {
            this.setNewLayer();
        }
    }

    setNewLayer = () => {
        const {layerId, layers} = this.props;
        let layer = this.getLayerWithId(layerId, layers);
        this.setState({
            layer: layer ? layer: ''
        });
    }

    getLayerWithId(layerId, layers) {
        return layers.find(l => l.id === layerId)
    }
    
    render() {
      const { classes,open, closeAttribTable, layers } = this.props;
      const { layer } = this.state;

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

          {layer ? 
            <div className={classes.tableRoot}>
                <div className={classes.tableContent}>
                    <AttributeTableTable layer={layer}/>
                </div>
            </div>
            :null}


          
        </Drawer>
        </div>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(AttributeTable);