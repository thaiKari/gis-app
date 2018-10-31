import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Typography, SwipeableDrawer, Divider, Button } from '@material-ui/core';
import difference from '../icons/difference_primary.png';
import union from '../icons/union_primary.png';
import intersect from '../icons/intersect_primary.png';
import LoadingFullpageCirular from '../utils/Loading/LoadingFullpageCirular';
import Loadable from 'react-loadable'

const GeoProcessingDialog = Loadable({
  loader: () => import('../components/Dialogs/GeoProcessingDialog'),
  delay: 300,
  loading: LoadingFullpageCirular,
});

const buttons= [{
  type: 'difference',
  imgSource: difference
},
{
  type: 'intersect',
  imgSource: intersect
},
{
  type: 'union',
  imgSource: union
}
];

const buttonDim = 60;
const numCols = Math.ceil((window.screen.availHeight - 50) / (buttons.length * buttonDim))

const styles = theme => ({
      toolbarDrawerPaper: {
        width: 'auto',
        height: 'auto', 
        overflowX: 'hidden',
        display: 'flex',
        justifyContent: 'center'
      },
      image: {
        width: 30,
        height: 30,
        display: 'flex',
        justifyContent: 'center'

      },
      button: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: buttonDim,
        height: buttonDim
      },
      text: {
        fontSize: 11.5
      },
      divider: {
        marginTop: 5,
        marginBottom: 5,
        zIndex: 10000
      }
  });
  

  class ToolkitBar extends Component {
    state = {
      GeoProcessingDialogOpen: false,
    }

    closeGeoProcessingDialog = () =>  {
      this.setState({GeoProcessingDialogOpen: false});
    }

    openGeoProcessingDialog = (type) => {
      this.setState({
        GeoProcessingDialogOpen: true,
        type: type});
    }
    
    render() {

      const { classes, toolDrawerOpen, layers, receiveNewJson } = this.props;
      const {GeoProcessingDialogOpen, type} = this.state;

      let numCols = Math.ceil(((buttons.length + 1) * buttonDim) / (window.innerHeight - 60)  )

      return (
        <SwipeableDrawer
            variant="persistent"
            open={toolDrawerOpen}
            anchor={'right'}
            onClose={()=>{}}
            onOpen={()=>{}}              
            classes={{
                paper: classNames(classes.toolbarDrawerPaper),
            }}
        >
        

        <div style={{height:50}}></div>

        {GeoProcessingDialogOpen ?
        <GeoProcessingDialog open={GeoProcessingDialogOpen}
                          closeDialog={this.closeGeoProcessingDialog.bind(this)}
                          layers={layers}
                          type= {type}
                          receiveNewJson={receiveNewJson}
                          />
        : null}
          <div style={{width: 95* numCols}}>          

            {buttons.map( (b) => {
              return (
                <Button key={b.type} onClick={() => this.openGeoProcessingDialog(b.type)}>
                <div className={classes.button}>
                <img  src={b.imgSource} alt="difference Icon" className={classes.image}/>
                <Typography gutterBottom  className={classes.text} variant='button'> {b.type}</Typography>
                </div>
              </Button>
              );
            })}


        </div>
        
  
      </SwipeableDrawer>
      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(ToolkitBar);