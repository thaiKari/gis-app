import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Typography, TextField, MenuItem, Chip, Paper, NoSsr  } from '@material-ui/core';
import Select from 'react-select';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

/**
 * Select that allows user to select multiple layers
 */

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing.unit
      },
      input: {
        display: 'flex',
        padding: 0,
      },
      valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
      },
      chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
      },
      chipFocused: {
        backgroundColor: emphasize(
          theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
          0.08,
        ),
      },
      noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
      },
      singleValue: {
        fontSize: 16,
      },
      placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16,
      },
      paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
      },
      divider: {
        height: theme.spacing.unit * 2,
      },
  });

  function NoOptionsMessage(props) {
    return (
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.noOptionsMessage}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    );
  }
  
  function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
  }
  
  function Control(props) {
    return (
      <TextField
        fullWidth
        InputProps={{
          inputComponent,
          inputProps: {
            className: props.selectProps.classes.input,
            inputRef: props.innerRef,
            children: props.children,
            ...props.innerProps,
          },
        }}
        {...props.selectProps.textFieldProps}
      />
    );
  }
  
  function Option(props) {
    return (
      <MenuItem
        buttonRef={props.innerRef}
        selected={props.isFocused}
        component="div"
        style={{
          fontWeight: props.isSelected ? 500 : 400,
        }}
        {...props.innerProps}
      >
        {props.children}
      </MenuItem>
    );
  }
  
  function Placeholder(props) {
    return (
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.placeholder}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    );
  }
  
  function SingleValue(props) {
    return (
      <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
        {props.children}
      </Typography>
    );
  }
  
  function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
  }
  
  function MultiValue(props) {
    return (
      <Chip
        tabIndex={-1}
        label={props.children}
        className={classNames(props.selectProps.classes.chip, {
          [props.selectProps.classes.chipFocused]: props.isFocused,
        })}
        onDelete={props.removeProps.onClick}
        deleteIcon={<CancelIcon {...props.removeProps} />}
      />
    );
  }
  
  function Menu(props) {
    return (
      <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
        {props.children}
      </Paper>
    );
  }
  
  const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
  };
  
  

  class MultiLayerSelect extends Component {

    state = {
        suggestions: [],
        selectedItems: []
    }

    componentDidMount() {
        const {layers} = this.props;

        let suggestions = layers.map(layer => ({
            value: layer.id,
            label: layer.displayName,
          }));
        
        this.setState({suggestions: suggestions});
    }

    handleChange = value => {
        let {setLayerIds} = this.props;
        let selectedIds = value.map( obj => obj.value );
        
        setLayerIds(selectedIds)

        this.setState({
          multi: value,
        });

      };
    
    render() {

        const { classes, theme, promt } = this.props;
        const { suggestions } = this.state;

        const selectStyles = {
          input: base => ({
            ...base,
            color: theme.palette.text.primary,
            '& input': {
              font: 'inherit',
            },
          }),
        };

        let label = promt ? promt :'choose layers *';
  
      return (
        <div className={classes.root}>
            <NoSsr>
                <Select
                classes={classes}
                styles={selectStyles}
                textFieldProps={{
                label: label,
                InputLabelProps: {
                    shrink: true,
                },
                }}
                options={suggestions}
                components={components}
                value={this.state.multi}
                onChange={this.handleChange}
                placeholder="Select one or more layers"
                isMulti
            />
            </NoSsr>
        </div>
      );
    }

  }

export default withStyles(styles, { withTheme: true })(MultiLayerSelect);