import JSZip from  'jszip';
import saveAs from 'file-saver';

const downloadJsons = (layers ) => {
    var zip = new JSZip();
    
    layers.forEach(layer => {
        zip.file(layer.displayName + ".json",JSON.stringify(layer.data));
    });

    zip.generateAsync({type:"blob"})
    .then(function(content) {
        saveAs(content, "layers.zip");
    });
  };

export default downloadJsons