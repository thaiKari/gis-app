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
        super(props);
        const {layers, layerId} = props;
        let layer = layers.find(l => l.id === layerId);   

        this.state = {
            order: 'asc',
            orderBy: 'id',
            page: 0,
            rowsPerPage: 5,
            layer: layer
          };
      }
    
    handleChangePage = (event, page) => {
    this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
    };

      handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';
    
        if (this.state.orderBy === property && this.state.order === 'desc') {
          order = 'asc';
        }
    
        this.setState({ order, orderBy });
      };

    isSelected = id => this.props.selected.indexOf(id) !== -1;
    
    getCells = (row) => {
        return this.props.rowHeaders.map((header, index) => {
            return <TableCell key={index} numeric={header.numeric} >{row[header.label]}</TableCell>
        });
    }
    
    render() {
      const { classes, data, selected, rowHeaders, handleSelectAllClick, handleClick } = this.props;
      const { order, orderBy, rowsPerPage, page, layer } = this.state;
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
  
      return (
        <div>
          <SecondaryTableToolbar numSelected={selected.length} layer={layer} />
            <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
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
                      onClick={event => handleClick(event, n.id)}
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