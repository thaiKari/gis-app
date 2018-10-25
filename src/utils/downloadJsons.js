import JSZip from  'jszip';
import saveAs from 'file-saver';

const downloadJsons = (layers ) => {
    var zip = new JSZip();
    //Keep track of the names that have already been used so files dont get overwritten
    let usedNames = {};
    
    layers.forEach(layer => {
        console.log(usedNames);
        let filename = layer.displayName;
        let i = 1;
        
        while(usedNames[filename]){
            filename = layer.displayName + '_' + i;
            i += 1;
        }

        zip.file(filename + ".json",JSON.stringify(layer.data));
        usedNames[filename] = true;
    });

    zip.generateAsync({type:"blob"})
    .then(function(content) {
        saveAs(content, "layers.zip");
    });
  };

export default downloadJsons