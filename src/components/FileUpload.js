import React, {Component}  from 'react';
import Dropzone from 'react-dropzone'
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';

const styles = theme => ({
  
  });

  class FileUpload extends Component {
    constructor() {
        super()
        this.state = {

         };
      }

    setupReader(file, cb) {
        var {receiveNewJson} = this.props;
        const { enqueueSnackbar } = this.props; 

        var reader = new FileReader();

        if( file.type ==="application/json") {
            var json;

            // Closure to capture the file information.
            reader.onload = (function (file) {
                return function (e) {
                    try {
                        json = JSON.parse(e.target.result);
                        var name = file.name.replace('.json', '');

                        receiveNewJson(json, name);
                        file.valid = true;
                        

                    } catch (ex) {
                        enqueueSnackbar('something went wrong while reading ' + file.name, {variant: 'error'});
                    }
                }
            })(file);

            reader.onloadstart= () => {
                //console.log('start Loading!')
            }

            reader.onloadend = () => {
                //console.log('done Loading!')
                cb(); 
            }

            reader.readAsText(file);
                    
        } else {
            file.valid = false;
            enqueueSnackbar(file.name +  ': type ' + file.type + ' is not supported' , {variant: 'error'});
            cb();
        }

        

    }

    readFiles(files){
        const { enqueueSnackbar } = this.props;
        enqueueSnackbar('processing ' + files.length + ' files',  {variant: 'info'});

        let requests = files.map((file) => {
            return new Promise((resolve) => {
                this.setupReader(file, resolve);
            });
        })
        
        Promise.all(requests).then(() => enqueueSnackbar('Done reading files', {variant: 'success'}));        
    }
    
    render() {

      const { children, disableClick } = this.props;
  
      return (
        <Dropzone className="ignore" onDrop={(files) => this.readFiles(files)} disableClick={disableClick}>
            {children}
        </Dropzone>
      );
  
  
    }
  }

export default withStyles(styles, { withTheme: true })(withSnackbar(FileUpload));