const findLayerById = (layerId, layers) => {
        return layers.find( l => l.id === layerId );
    };
  
  export default findLayerById
  
  