import React, {Component}  from 'react';
import Dropzone from 'react-dropzone'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  
  });

  class FileUpload extends Component {
    constructor() {
        super()
        this.state = { };
      }

    readFiles(files){
        var {receiveNewJson} = this.props;

        for( var i in files) {
            
            var file = files[i];
            var reader = new FileReader();

            if( file.type ==="application/json") {
                var json;

                // Closure to capture the file information.
                reader.onload = (function (file) {
                    return function (e) {
                        //console.log('e readAsText = ', e);
                        //console.log('e readAsText target = ', e.target);
                        try {
                            json = JSON.parse(e.target.result);
                            var name = file.name.replace('.json', '');
                            var id = name + file.lastModified;
                            receiveNewJson(json, name, id);

                        } catch (ex) {
                            console.log('error parsing JSON', ex);
                        }
                    }
                })(file);

                reader.onloadstart= () => {
                    //console.log('start Loading!')
                }

                reader.onloadend = () => {
                    //console.log('done Loading!')
                }

                reader.readAsText(file);
                

            }
        }
        
    }
    
    render() {

      const { classes, children, disableClick } = this.props;
      var {reader} = this.state;
  
      return (
        <Dropzone className="ignore" onDrop={(files) => this.readFiles(files)} disableClick={disableClick}>
            {children}
        </Dropzone>
      );
  
  
    }
  }

export default withStyles(styles, { withTheme: true })(FileUpload);