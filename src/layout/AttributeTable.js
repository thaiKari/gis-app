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
        zIndex: 20000
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
    constructor(props) {
      super(props)
      const {layers, layerId} = props;

      let layer = layers.find(l => l.id === layerId);        
      let data = layer ? this.getRowHeadersAndData(layer): '';

      this.state = {
          data: data ? data.data: '',
          rowHeaders:  data ? data.rowHeaders: '',
          selected: [],
        };
    }

    componentDidUpdate(prevProps) {
      if(prevProps.layerId !== this.props.layerId) {
        const {layers, layerId} = this.props;
        let layer = layers.find(l => l.id === layerId);        
        let data = layer ? this.getRowHeadersAndData(layer): '' ;
        this.setState({
          data: data ? data.data: '',
          rowHeaders:  data ? data.rowHeaders: '',
          layer: layer});
      }
    }

    getRowHeadersAndData = (layer) => {
      let data = [];
      let rowHeaderSet = new Set([]);

       layer.data.features.forEach((feature, index) => {
          let dataObj = {'id': index}
          Object.assign(dataObj, feature.properties);
          data.push(dataObj);
          Object.keys(feature.properties).forEach(key => {
               rowHeaderSet.add(key + ' ' + typeof feature.properties[key]);
          })
      });

      let rowHeaders = [...rowHeaderSet].map((header) => {
          let headerSplit = header.split(' ');
          return {label: headerSplit[0], numeric: headerSplit[1] === 'number' };
      });

      return {
        data: data,
        rowHeaders: rowHeaders
      }
    }

    handleSelectAllClick = event => {
      if (event.target.checked) {
        this.setState(state => ({ selected: state.data.map(n => n.id) }));
        return;
      }
      this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
      const { selected } = this.state;
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
  
      this.setState({ selected: newSelected });
    };
    
    render() {
      const { classes,open, closeAttribTable, layerId, layers,} = this.props;
      const { data, selected, rowHeaders } = this.state;

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
                    <AttributeTableTable
                      layerId={layerId}
                      layers={layers}
                      data={data}
                      rowHeaders={rowHeaders}
                      selected={selected}
                      handleSelectAllClick={this.handleSelectAllClick.bind(this)}
                      handleClick={this.handleClick.bind(this)}
                      />
                </div>
            </div>
            :null}


          
        </Drawer>
        </div>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(AttributeTable);