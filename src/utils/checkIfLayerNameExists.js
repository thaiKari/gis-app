/**
 * Checks if there exists a layer with a different index
 * that has the same name
 */ 
const checkIfLayerNameExists = (name, layers, acceptedLayerId) => {
    let haslayer = false

    layers.forEach((layer, index) => {
      if(layer.id !== acceptedLayerId) {
        if(layer.displayName === name) {
          haslayer = true;
        }
      }
    });

    return haslayer;
  }

  export default checkIfLayerNameExists