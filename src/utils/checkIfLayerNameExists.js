/**
 * Checks if there exists a layer with a different index than layerIndex
 * that has the same name
 */ 
const checkIfLayerNameExists = (name, layers, layerIndex) => {
    let haslayer = false

    layers.forEach((layer, index) => {
      if(index != layerIndex) {
        if(layer.displayName === name) {
          haslayer = true;
        }
      }
    });

    return haslayer;
  }

  export default checkIfLayerNameExists