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
The Application supports upploading of geojson files. To use the application simply drag and drop your geojson files onto the space indicated. The map is sentered in Trondheim, however you can easily find your data anywhere in the world by using the 'zoomTo' function. Some sample data and an example exercise can be found in the data.zip folder. 

Note that:
* The filename extension must be '.json' and not '.geojson'. Simply renaming the file will make it work. 
* Supported Coordinate system is 
        Projection: latlnt
        Datum: WGS 84
        EPSG: 4326

## Further Development
Due to time restrictions on the project, there are still several things that can be improved in the application. Further testing and data validation is needed to make sure that the application does not fail with improper use. One bug that still remains is that layers do not always render in the correct order when several layers are uploaded at the same time.

Features that I would have liked to develop but didnt have time are:
* Ability to style layers based on properties (categorical or choropleth).
* Ability to add a data-driven height component to the data set (3d geojson extrusion layer).
* Ability to add wms layers.
* Ability to draw new features on the map with a draw tool.
* Support more file types.
* Support more coordinate systems.

## Acknowledgments
In addition to the main COTS mention in the Buildt With section above, the application also makes use of various libraries and external components. These include:
* [file-saver](https://github.com/eligrey/) - For saving files
* [jszip](https://github.com/Stuk/jszip) - For creating zip files
* [notistack](https://github.com/iamhosseindhv/notistack) - For displaying highly customisable 'Snackbars' 
* [react-beautiful-dnd](https://github.com/eligrey/) - For drag n drop reorder functionality of layers list
* [react-color](https://casesandberg.github.io/react-color/) - Color picker to edit the layer colors
* [react-dropzone](https://react-dropzone.netlify.com/) - For creating a dropzone to upload files
* [react-loadable](https://github.com/jamiebuilds/react-loadable) - For creating loadable components and thus speeding up the runtime of the app. 




