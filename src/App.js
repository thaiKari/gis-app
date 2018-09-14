import React, { Component } from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {withStyles} from '@material-ui/core/styles';
import './App.css';
import LayerBar from './layout/LayerBar';
import ToolkitBar from './layout/ToolkitBar';
import TopBar from './layout/TopBar';
import Map from './map/Map';

const theme = createMuiTheme({
  palette: {
      //primary: indigo,
      //secondary: red,
      type: 'dark'
  },
  drawerWidth: 240,
  appBarHeight: 60,
  typography: {
      fontFamily: 'Gamja+Flower'
    }
  });

  const styles = ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
    },
    appFrame: {
      height: '100vh',
      zIndex: 1,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      width: '100%',
    },
  });
  
  class App extends Component {
  state = {
    drawerOpen: true,
    toolDrawerOpen: false,
  };

  handleDrawerToggle = () => {
    let drawerOpen= !this.state.drawerOpen;
    this.setState({ drawerOpen: drawerOpen });
  }

  toggleToolDrawer = () => {
    let toolDrawerOpen= !this.state.toolDrawerOpen;
    this.setState({ toolDrawerOpen: toolDrawerOpen });
  }

  render() {

    const { classes } = this.props;
    const { drawerOpen, toolDrawerOpen } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <TopBar 
            handleDrawerToggle={this.handleDrawerToggle.bind(this)}
            toggleToolDrawer={this.toggleToolDrawer.bind(this)}/>
          <LayerBar
            drawerOpen={drawerOpen}/>
          <ToolkitBar
            toolDrawerOpen={toolDrawerOpen}/>

          <main className={classes.content}>          
               <Map/>                  
          </main>

        </div>
      </div>
      </MuiThemeProvider>
    );


  }
}

export default withStyles(styles, { withTheme: true })(App);
