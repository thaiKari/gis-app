import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { DialogContent, Typography}  from '@material-ui/core'
import DragNDropBox from '../DragNDropBox';
import SimpleLayerList from '../SimpleLayerList';

/**
 * Conent of NewLayer dialog Upload tab.
 */

const styles = theme => ({

  });

  class UploadContent extends Component {

    render() {

      const { classes, handleFile, deleteLayer, layers } = this.props;

      let uploadList = layers.length > 0 ?
                      <div style = {{padding: 20}}>
                        <Typography color='primary'> Add the Following Layers to map:</Typography>
                        <SimpleLayerList 
                          canDelete={true}
                          layers={layers}
                          deleteLayer={deleteLayer}/>
                      </div>
                      : null ;

      return (

          <DialogContent className={classes.dialog}>
                  
          <DragNDropBox modalDisp={true} receiveNewJson={handleFile}/>
          {uploadList}
          </DialogContent>
  

      );
  
  
    }

  }

export default withStyles(styles, { withTheme: true })(UploadContent);