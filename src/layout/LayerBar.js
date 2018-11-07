import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, Toolbar, Typography, Divider } from '@material-ui/core';
import findIndexWithAttribute from '../utils/findIndexWithAttribute'
import DragNDropBox from '../components/DragNDropBox';
import LayersToolbar from '../components/LayersToolbar';
import Loading from '../utils/Loading/Loading';
import LoadingFullpageCirular from '../utils/Loading/LoadingFullpageCirular';
import { withSnackbar } from 'notistack';
import RightClickMenu from '../components/RightClickMenu'

import Loadable from 'react-loadable'


const DeleteLayerDialog = Loadable({
  loader: () => import('../components/Dialogs/DeleteLayerDialog'),
  delay: 300,
  loading: LoadingFullpageCirular,
});

const EditLayerDialog = Loadable({
  loader: () => import('../components/Dialogs/EditLayerDialog'),
  delay: 300,
  loading: LoadingFullpageCirular,
});

const LayerList = Loadable({
  loader: () => import('../components/LayerList'),
  delay: 300,
  loading: Loading,
});
 
const styles = theme => ({

      drawerHeader: {
        //height: theme.appBarHeight,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 3,
      },
      drawerPaper: {
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflowX: 'hidden'
      }
  });

  class LayerBar extends Component {
    constructor() {
      super()
      this.state = { 
        files: [],
        selectedLayers: {},
        ctrlPressed: false,
        shiftPressed: false,
        deleteLayersDialogOpen: false,
        editLayersDialogOpen: false,
        RightClickMenuOpen: false
      }
        this.onDragEnd = this.onDragEnd.bind(this);
    }
  
    onDrop(files) {
      this.setState({
        files
      });
    }

    onDragEnd(result) {
      if (!result.destination) {
        return;
      }

      const { reorderLayersList } = this.props;
      reorderLayersList( result.source.index, result.destination.index);
  
    }

    componentDidMount() {
      this.layersChange();
      document.addEventListener('keydown',this.keydownHandler.bind(this));
      document.addEventListener('keyup',this.keyupHandler.bind(this));
    }
    componentWillUnmount(){
      document.removeEventListener('keydown',this.keydownHandler.bind(this));
      document.removeEventListener('keyup',this.keyupHandler.bind(this));
    }

    keydownHandler(e){
      if(e.key === 'Control'){
        this.setState({ctrlPressed: true});
      }
      if(e.key === 'Shift'){
        this.setState({shiftPressed: true});
      }
    }

    keyupHandler(e){
      if(e.key === 'Control'){
        this.setState({ctrlPressed: false});
      }
      if(e.key === 'Shift'){
        this.setState({shiftPressed: false});
      }
    }


    componentDidUpdate = (prevProps) => {

      if(prevProps.layersChange !== this.props.layersChange){
        this.layersChange();
      }
        
    }

    layersChange = () => {
      let {selectedLayers} = this.state;
      let {layers} = this.props;

      let newSelectedLayers = layers.reduce(
        (selected, layer) => {

          if(! selected[layer.id] ) {
            selected[layer.id] = false;
          }

          return selected
        },
        selectedLayers
      );

      this.setState({selectedLayers: newSelectedLayers});
    }

    selectLayersBetween(lastClickedLayer, layerId, selectedLayers) {
      const {layers} = this.props;
      var fromIndex, toIndex;
      let i1 = findIndexWithAttribute(layers, 'id', lastClickedLayer);
      let i2 = findIndexWithAttribute(layers, 'id', layerId);

      if (i1 < i2 ) {
        fromIndex = i1;
        toIndex = i2;
      } else {
        fromIndex = i2;
        toIndex = i1;
      }

      for (var i = fromIndex; i <= toIndex; i++) {
      
        var id = layers[i].id;
        selectedLayers[id] = true;
      }

      return selectedLayers;

    }

    

    handleListItemRightClick = (layerId, anchorEl) => {
      this.handleListItemClick(layerId);
      this.setState({RightClickMenuOpen: true,
                      anchorEl: anchorEl});
      return false;
    }

    closeRightClickMenu = () => {
      this.setState({RightClickMenuOpen: false});
    } 

    handleListItemClick = (layerId) => {
      
        let {selectedLayers, ctrlPressed, shiftPressed, lastClickedLayer} = this.state;
        const {layers} = this.props;

        if (ctrlPressed) {
          selectedLayers[layerId] = !selectedLayers[layerId] 
        }
        else if (shiftPressed) {
          if (lastClickedLayer) {
            selectedLayers = this.selectLayersBetween(lastClickedLayer, layerId, selectedLayers)
          } else {
            selectedLayers = this.selectLayersBetween(layers[0].id, layerId, selectedLayers)
          }
         
        }
        else {
          Object.keys(selectedLayers).forEach(key => {
            selectedLayers[key] = key === layerId ?
            ! selectedLayers[key] : false;
          });
        }

        this.setState({ 
          selectedLayers: selectedLayers,
          lastClickedLayer: layerId  });
    };

    openDeleteLayersDialog() {
      this.setState({deleteLayersDialogOpen: true});
    }

    closeDeleteLayersDialog() {
      this.setState({deleteLayersDialogOpen: false});
    }

    openEditLayersDialog() {
      this.setState({editLayersDialogOpen: true});
    }

    closeEditLayersDialog() {
      this.setState({editLayersDialogOpen: false});
    }

    deleteLayers() {
      const {selectedLayers} = this.state;
      const {deleteLayers} = this.props

      let layersToDelete = [];

      for(var key in selectedLayers){
        if(selectedLayers[key]){
          layersToDelete.push(key);
        }
      }
    
      this.setState({selectedLayers:{} });
      this.layersChange();
      deleteLayers(layersToDelete);
      this.closeDeleteLayersDialog();

    }
    
    
    render() {

      const {addLayers,
        reorderLayersList,
        layers,
        classes,
        drawerOpen,
        receiveNewJson,
        toggleVisibility,
        checkLayerName,
        submitChanges,
        drawerWidth,
        acceptedTypes,
        zoomTo} = this.props;
      const {selectedLayers,
        deleteLayersDialogOpen,
        editLayersDialogOpen,
        lastClickedLayer,
        RightClickMenuOpen,
        anchorEl
        } = this.state;

        let hasLayers = layers.length > 0;
      return (
        <div style={{
          position: 'absolute',
          width: drawerWidth,
          height: '100%'
          }}>
        <Drawer
        variant="persistent"
        anchor={'left'}
        open={drawerOpen}
        scroll={'paper'}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
      <div className={classes.drawerHeader}>
        <Toolbar variant="dense">
          <Typography color='primary' variant="h4" gutterBottom style={{flex: 1}}>
              MapitApp
          </Typography>  
        </Toolbar>
            
        </div>

        <RightClickMenu
          open={RightClickMenuOpen}
          anchorEl={anchorEl}
          closeRightClickMenu={this.closeRightClickMenu.bind(this)}
          drawerWidth={drawerWidth}
          layerId={lastClickedLayer}
          zoomTo={zoomTo}/>
        
        {deleteLayersDialogOpen ?
        <DeleteLayerDialog closeDialog={this.closeDeleteLayersDialog.bind(this)}
                            open={deleteLayersDialogOpen}
                            selectedLayers={selectedLayers}
                            layers={layers}
                            deleteLayers={this.deleteLayers.bind(this)}
                           />
        : null}
        {editLayersDialogOpen ?
        <EditLayerDialog open={editLayersDialogOpen}
                          closeDialog={this.closeEditLayersDialog.bind(this)}
                          layers={layers}
                          currLayer={lastClickedLayer}
                          submitChanges={submitChanges}
                          />
        : null}

        <Divider/>        

        <LayersToolbar openDeleteLayersDialog={this.openDeleteLayersDialog.bind(this)}
        openEditLayersDialog={this.openEditLayersDialog.bind(this)}
        addLayers={addLayers}
        hasLayers={hasLayers}
        checkLayerName={checkLayerName}
        layers={layers}
        acceptedTypes={acceptedTypes}/>
  
        <div className={classes.content}>

        {hasLayers ?
          <LayerList reorderLayersList={reorderLayersList}
                    layers={layers}
                    toggleVisibility={toggleVisibility}
                    handleListItemClick={this.handleListItemClick.bind(this)}
                    onDragEnd={this.onDragEnd.bind(this)}
                    selectedLayers={selectedLayers}
                    handleListItemRightClick={this.handleListItemRightClick.bind(this)}/>
          : null}
          <DragNDropBox receiveNewJson={receiveNewJson}/>
        </div>

      </Drawer>
      </div>

      );
  
    }

  }

export default withStyles(styles, { withTheme: true })(withSnackbar(LayerBar));

/**
 * OLD HEADER
*         <div className={classes.drawerHeader}>
        <Toolbar variant="dense">
          <Typography variant='title' style={{flex: 1}}>
              Layers
          </Typography>  
          <IconButton>
            <ChevronLeft onClick={handleDrawerToggle} />
          </IconButton>
        </Toolbar>
            
        </div>
 */