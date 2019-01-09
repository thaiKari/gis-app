# gis-app
This is a project made as part of the course TBA4251 Programming in Geomatics at Norwegian University of Science and Technology (NTNU). The application is meant to be an introduction to geographic data processing. Users can upload data from geojsons and do simple geoprocessing on the data.

Features include: Difference, Intersect, Union, Bbox, clip, voronoi, filtering on attributes.
A live version can be found at: https://thaikari.github.io/gis-app/
Demo video of use: https://youtu.be/xOLmTdqVv5g

## Built With
* [React](https://reactjs.org//) - For Building user Interfaces
* [Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js/) - For rendering maps and vector layers.
* [Turf](http://turfjs.org/) - For geospatial analysis.
* [Material-UI](https://material-ui.com/) - For design of application components.

## Usage
The Application supports upploading of geojson files. To use the application simply drag and drop your geojson files onto the space indicated. 

Note that:
- The filename extension must be '.json' and not '.geojson'. Simply renaming the file will make it work. Some sample data and an example exercise can be found in the data.zip folder. 
- Supported Coordinate system is 
        Projection: latlnt
        Datum: WGS 84
        EPSG: 4326

## Acknowledgments
In addition to the main COTS mention in the Buildt With section above, the application also makes use of various libraries and external components. These include:
* [React](https://reactjs.org//) - For Building user Interfaces



