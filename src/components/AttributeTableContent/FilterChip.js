import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {ListItemText,
  ListItemSecondaryAction,
  ListItem,
  IconButton,
  Select,
  Input,
  MenuItem,
  TextField
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';

const numericOperators = ['>', '>=', '<', '<=', '==', '!=']
const stringOperators = ['equals', 'includes', 'startsWith']

const styles = theme => ({
    mainDiv: {
        borderRadius: 2,
        margin: theme.spacing.unit,
        listStyle: 'none',
        backgroundColor: theme.palette.action.hover
    },
    select: {
      marginRight: theme.spacing.unit,
      marginTop: 0,
      marginBottom: 0,
      minWidth: 80
    }
  });

  class FilterChip extends Component {
    constructor(props) {
      super(props)

      this.keyupHandler = this.keyupHandler.bind(this);

      this.state = {
          attrib: '',
          operator: '',
          val: ''
        };
    }
  
    componentDidMount() {
      document.addEventListener('keyup', this.keyupHandler, false);
    }
    componentWillUnmount() {
      document.removeEventListener('keyup', this.keyupHandler, false);
    }

    keyupHandler(e) {
      const {submit} = this.props;
      if(e.keyCode === 13) {
        this.submitFilter();
      }
    }

    handleChange = name => event => {
      const {isNumeric} = this.state
      const {rowHeaders} = this.props;
      let value = event.target.value;
      
      if ( name === 'attrib') {
        this.setState({isNumeric: rowHeaders.find(rh => rh.label === value).numeric });
      }

      if (name === 'val') {
        
        if( isNumeric  ) {
          if (isNaN(Number(value))) {
            this.setState({TextFieldError: true});
          } else if (value !== '') {
            value = Number(value) ;
            this.setState({TextFieldError: false})
          }
        }
      }

      this.setState({ [name]: value});
    };

    submitFilter = () => {
      const { attrib, operator, val, isNumeric} = this.state;

      if( attrib && operator && val){
        this.setState({
          attrib: '',
          operator: '',
          val: ''
        });
        this.props.submitFilter({ attrib: attrib, operator:operator, val: val, isNumeric: isNumeric});
      }
      
    }
    
    render() {

      const { classes, sentence, index, deleteSentence, label, rowHeaders } = this.props;
      const {attrib, operator, val, isNumeric, TextFieldError} = this.state;

      let operatorList = isNumeric ? numericOperators : stringOperators;
      let errorText = TextFieldError ? 'Input must be a number': '';
      let hasError = TextFieldError || !attrib || !operator || val.length === 0
  
      return (
        <div className={classes.mainDiv}>
            { label ==='wip' ?
            <ListItem button style={{padding:5}}>
                <ListItemText>
                <Select
                  className={classes.select}
                  label="Attribute"
                  value={attrib}
                  placeholder="Attribute"
                  onChange={this.handleChange('attrib')}
                  input={<Input name="name" id="attrib-disabled" />}
                >

                {rowHeaders.map( (attrib, i) => {
                  return(<MenuItem key={i} value={attrib.label}>{attrib.label}</MenuItem>                
                  );
                })}
                </Select>
                <Select
                  className={classes.select}
                  disabled={attrib.length < 1}
                  value={operator}
                  placeholder="Operator"
                  onChange={this.handleChange('operator')}
                  input={<Input name="operator" id="operator" />}
                >

                {operatorList.map( (operator, i) => {
                  return(<MenuItem key={i} value={operator}>{operator}</MenuItem>                
                  );
                })}
                </Select>
                <TextField
                  className={classes.select}
                  value={val}
                  disabled={attrib.length < 1}
                  onChange={this.handleChange('val')}
                  margin="normal"
                  error={TextFieldError}
                  helperText={errorText}
                />

                </ListItemText>
                
                <ListItemSecondaryAction>
                      <IconButton aria-label="Add" disabled={hasError} onClick={() => this.submitFilter()}>
                        <DoneIcon color='primary'/>
                      </IconButton>
                  </ListItemSecondaryAction>
                  
            </ListItem>
            :
            <ListItem button style={{padding:5}}>
                <ListItemText secondary={sentence}/>
                <ListItemSecondaryAction>
                      <IconButton aria-label="Delete" onClick={() => deleteSentence(index)}>
                        <DeleteIcon/>
                      </IconButton>
                    </ListItemSecondaryAction>
            </ListItem>}
        </div>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(FilterChip);