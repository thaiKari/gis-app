import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, Checkbox, TableRow, TablePagination } from '@material-ui/core';
import EnhancedTableHead from './EnhancedTableHead';
import SecondaryTableToolbar from './SecondaryTableToolbar';


const styles = theme => ({
  
  });

  function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }
  
  function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
  }

  class AttributeTableTable extends Component {
    
    constructor(props) {
        super(props)
        const {layers, layerId} = props;

        let layer = layers.find(l => l.id === layerId);        
        let data = layer ? this.getRowHeadersAndData(layer): '';

        this.state = {
            order: 'asc',
            orderBy: 'id',
            selected: [],
            data: data ? data.data: '',
            rowHeaders:  data ? data.rowHeaders: '',
            page: 0,
            rowsPerPage: 5,
            layer: layer
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
    
    handleChangePage = (event, page) => {
    this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
    };

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

      handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';
    
        if (this.state.orderBy === property && this.state.order === 'desc') {
          order = 'asc';
        }
    
        this.setState({ order, orderBy });
      };

    isSelected = id => this.state.selected.indexOf(id) !== -1;
    
    getCells = (row) => {
        return this.state.rowHeaders.map((header, index) => {
            return <TableCell key={index} numeric={header.numeric} >{row[header.label]}</TableCell>
        });
    }
    
    render() {
      const { classes } = this.props;
      const { data, order, orderBy, selected, rowsPerPage, page, rowHeaders, layer } = this.state;
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
  
      return (
        <div>
          <SecondaryTableToolbar numSelected={selected.length} layer={layer} />
            <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
              rowHeaders={rowHeaders}
            />

              <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      {this.getCells(n)}
 
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        </div>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(AttributeTableTable);