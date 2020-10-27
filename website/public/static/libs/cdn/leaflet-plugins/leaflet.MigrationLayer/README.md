# leaflet.migrationLayer
leafet.migrationLayer is used to show migration data such as population,flight,vehicle,traffic and so on.Data visualization on map.
<div style="text-align:center" align="center">
  <img src="https://sylvenas.github.io/leaflet.migrationLayer/demo.gif" />
</div>

## Supported Browsers   
Internet Explorer 10+     
Google Chrome     
Safari    
Firefox        

## Demo online   
A demo is available on the Github Pages webpage for leaflet.migrationLayer [Check out demo!](https://sylvenas.github.io/leaflet.migrationLayer/).

## Usage     
1.Include the JavaScript files located in ```\dist``` directory.
```html
<script src="./dist/leaflet.migrationLayer.js"></script>
```    
2.Create a new migrationLayer
```js
var migrationLayer = new L.migrationLayer({
    map: map,
    data: data
})
```     
3.update or set data to migrationLayer
```js
migrationLayer.setData(newData);
```   
4.hide migrationLayer       
```js
migrationLayer.hide();
```   
5.show migrationLayer       
```js
migrationLayer.show();
```   
6.pause migrationLayer animation  
```js
migrationLayer.pause();
```   
7.play migrationLayer animation
```js
migrationLayer.play();
```   
8.destroy migrationLayer     
```js
migrationLayer.destroy();
```   

## API(options)   

| option          | Description            | Default Value    | Possible  values         | Required       |
| --------------- | ---------------------- | -----------------| ------------------------ | -------------- | 
| map             | the map obj            | null             | Map                      | yes            |
| data            | data for migrationLayer| null             | Json                     | yes            | 
| pulseRadius     | the pulse radius       | 25               | any number>0             | no             |
| pulseBorderWidth| pulse border width     | 3                | any number>0             | no             |
| arcWidth        | arc width              | 1                | any number>0             | no             |
| arcLabel        | show from and to label | true             | Bool                     | no             |
| arcLabelFont    | label font and size    | '15px sans-serif'| 'size font'              | no             |   

## Leaflet Version     
Requires Leaflet 1.0.2 or newer   

## License   
MIT.    
