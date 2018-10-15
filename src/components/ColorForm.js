import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import rgb2Hex from '../utils/rgb2Hex';
import hex2Rgb from '../utils/hex2Rgb'

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 75,
  }
  });

  class ColorForm extends Component {

    state = {
      hex: '',
      hexError: false
    };

    componentDidMount = () => {
      let {color} = this.props;
      let hexForm = document.getElementById('hex');

      hexForm.addEventListener("focus", ( event ) => {
        this.setState({hexFocus: true});
      }, true);

      hexForm.addEventListener("blur", ( event ) => {
        this.sendNewHexColor(this.state.hex);
        this.setState({hexFocus: false});
      }, true);

      if(color) {
        let hex = rgb2Hex(color.r, color.g, color.b);
        this.setState({hex: hex});
      }
    }

    componentDidUpdate = (prevProps) => {
      const {colorChanged, color} = this.props;
      const {hexFocus} = this.state;

      if( colorChanged !== prevProps.colorChanged){
        try {
          if(!hexFocus) {
            let newHex = rgb2Hex(color.r, color.g, color.b);
            this.setState({hex: newHex});
          }    
        } catch (error) {          
        }
        
      }
    }

    handleChange = name => event => {
      const {color, setColor, setOpacity } = this.props;
      this.setState({ hexError: false });

      if( name === ''){
        setOpacity(event.target.value);
      }else if(name === 'hex') {
        this.setState({
          [name]: event.target.value,
        });

        try {
          if (!hex2Rgb(event.target.value)){
            this.setState({ hexError: true });
          } else {
            this.sendNewHexColor(event.target.value);
          }        
        } catch (error) {
          this.setState({ hexError: true });
        }

      } else {
        let newColor = {
          r: color.r,
          g: color.g,
          b: color.b
        }
        newColor[name] = event.target.value;
        setColor(newColor);
      }
    };

    sendNewHexColor = (hex) => {
      const {setColor} = this.props;
      
      if(hex2Rgb(hex)) {
        setColor(hex2Rgb(hex));
        this.setState({ hexError: false });

      } else {
        this.setState({ hexError: true });
      }

    }
    
    render() {

      const { classes, color } = this.props;
      const { hex, hexError} = this.state;
  
      return (
        <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="hex"
          label="Hex"
          className={classes.textField}
          value={hex}
          helperText={hexError? 'invalid hex code': ''}
          error={hexError}
          onChange={this.handleChange('hex')}
          margin="normal"
        />
        <TextField
          id="standard-name"
          label="r"
          className={classes.textField}
          value={color.r}
          onChange={this.handleChange('r')}
          margin="normal"
        />
        <TextField
          id="standard-name"
          label="g"
          className={classes.textField}
          value={color.g}
          onChange={this.handleChange('g')}
          margin="normal"
        />
        <TextField
          id="standard-name"
          label="b"
          className={classes.textField}
          value={color.b}
          onChange={this.handleChange('b')}
          margin="normal"
        />
        <TextField
          id="standard-name"
          label="a"
          className={classes.textField}
          value={color.a}
          onChange={this.handleChange('a')}
          margin="normal"
        />

      </form>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(ColorForm);