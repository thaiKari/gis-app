import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, Divider } from '@material-ui/core';
import AttributeTableToolbar from '../components/AttributeTableContent/AttributeTableToolbar';
import AttributeTableTable from '../components/AttributeTableContent/AttributeTableTable';
import FilterChipContainer from '../components/AttributeTableContent/FilterChipContainer';


const styles = theme => ({
    drawer: {
        width: '100%',
        maxHeight: '70%',
        flexShrink: 0,
      },
      drawerPaper: {
        width: '100%',
        zIndex: 20000
      },
      tableRoot: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap:'wrap'
      },
      tableContent: {
        backgroundColor: theme.palette.action.hover,
        minWidth: 500,
        height: '100%',
        margin: theme.spacing.unit,
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
          filterSentences: [],
          showFilter: false
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
          feature.id = feature.id ? feature.id: index;
          let dataObj = {'id': feature.id}
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

    displayFilter = () => {
      this.setState({showFilter: true});
    }

    filterSelection = (filterSentences) => {
      const {data} = this.state;
      let selected = [];
      
      if(filterSentences.length > 0 ) {
        data.forEach((dataElem, index) => {
          let selectElem = true;
          filterSentences.forEach(filterElem => {
            //Must match all criteria
            let query = filterElem.isNumeric ?
                  dataElem[filterElem.attrib] + filterElem.operator + filterElem.val
                  : '"' + dataElem[filterElem.attrib] + '"' + '.' + filterElem.operator + '("' + filterElem.val.toString() + '")';
  
            if (filterElem.operator  === 'equals') {
              query =  '"' + dataElem[filterElem.attrib] + '"' + '===' +  '"' + filterElem.val.toString() + '"';
            }
  
            if(!eval( query)){
              selectElem = false;
            }
          })
  
          if(selectElem) {
            selected.push(dataElem.id);
          }
        });
      }


      this.setState({selected: selected});
    }

    addNewFilter = (filter) => {
      let {filterSentences} = this.state;
      filterSentences.push(filter);

      this.filterSelection(filterSentences)

      this.setState({
        filterSentences: filterSentences,
      });
    }

    removeAllFilters = () => {
      this.setState({
        filterSentences: [],
        showFilter: false
      })
    }

    deleteFilterSentence = (i) => {
      let {filterSentences} = this.state;
      filterSentences.splice(i, 1);
      this.filterSelection(filterSentences)
      this.setState(filterSentences);
    }

    handleSelectAllClick = event => {
      if (event.target.checked) {
        this.setState(state => ({ selected: state.data.map(n => n.id) }));
        return;
      }
      this.setState({ selected: [] });
    };

    handleDeleteSelected = () => {
      let {receiveNewData, layerId, layers} = this.props;
      let {selected} = this.state;

      let layer = layers.find(l => l.id === layerId);
      layer.data.features = layer.data.features.filter(feature => {
        return !selected.includes(feature.id)});
    
      let data = layer ? this.getRowHeadersAndData(layer): '' ;
      this.setState({
        data: data ? data.data: '',
        rowHeaders:  data ? data.rowHeaders: '',
        layer: layer,
        selected: []});

    receiveNewData(layerId);

    }

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
      const { classes, open, closeAttribTable, layerId, layers,} = this.props;
      const { data, selected, rowHeaders, filterSentences, showFilter } = this.state;

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
                {showFilter ?
                <div className={classes.tableContent}>
                  <FilterChipContainer
                    addNewFilter={this.addNewFilter.bind(this)}
                    filterSentences={filterSentences}
                    deleteFilterSentence={this.deleteFilterSentence.bind(this)}
                    removeAllFilters={this.removeAllFilters.bind(this)}
                    rowHeaders={rowHeaders}
                    />
                </div>
                : null}
                <div className={classes.tableContent}>
                    <AttributeTableTable
                      layerId={layerId}
                      layers={layers}
                      data={data}
                      rowHeaders={rowHeaders}
                      selected={selected}
                      handleSelectAllClick={this.handleSelectAllClick.bind(this)}
                      handleDeleteSelected={this.handleDeleteSelected.bind(this)}
                      handleClick={this.handleClick.bind(this)}
                      displayFilter={this.displayFilter.bind(this)}
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