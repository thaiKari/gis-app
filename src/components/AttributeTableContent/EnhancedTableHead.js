import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TableHead, TableRow, TableCell, Checkbox, Tooltip, TableSortLabel, Divider } from "@material-ui/core";

const styles = theme => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    //opacity: 0.6
  }
  
});

class EnhancedTableHead extends React.Component {
  constructor(props) {
    super(props)     
  }

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, rowHeaders, classes } = this.props;
    console.log(this.props.theme.palette)

    return (
      <TableHead className={classes.head}>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rowHeaders.map(row => {
            return (
              <TableCell
                key={row.label}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.label ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.label}
                    direction={order}
                    onClick={this.createSortHandler(row.label)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

export default withStyles(styles, { withTheme: true })(EnhancedTableHead);