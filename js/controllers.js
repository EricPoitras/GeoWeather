function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  console.log("Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude);
  refreshMap(position.coords.longitude,position.coords.latitude);
}

function refreshMap(lon,lat){
  main_router("map");
  map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([lon,lat ]),
      zoom: 10
    })
  });
    
//Adding a marker on the map
    
 var marker = new ol.Feature({
    geometry: new ol.geom.Point(
      ol.proj.fromLonLat([lon,lat])
    ),  // Cordinates of New York's Town Hall
 });
 
 var vectorSource = new ol.source.Vector({
    features: [marker]
 });

 var markerVectorLayer = new ol.layer.Vector({
    source: vectorSource,
 });
        
 map.addLayer(markerVectorLayer);
    
 refreshForecast(lon,lat); 

}

function refreshForecast(lon,lat){

var apiurl = 'https://api.weather.gov/points/'+lat+','+lon;
    
fetch(apiurl)
  .then(response => {
    return response.json()
  })
  .then(data => {
    // Work with JSON data here
    console.log(data);
    //console.log(data.properties.gridX);
    //console.log(data.properties.gridY);
    var url = data.properties.forecast;
    //console.log(url);

    fetch(url)
      .then(response => {
        return response.json()
      })
      .then(data => {
        // Work with JSON data here
        console.log(data);
        console.log(data.properties.periods[0]);
        temp_forecast.innerHTML = data.properties.periods[0].name+"<br>"+data.properties.periods[0].temperature+data.properties.periods[0].temperatureUnit;
        label_forecast.innerHTML = data.properties.periods[0].shortForecast;
        img_forecast.src = data.properties.periods[0].icon;
      })
      .catch(err => {
        // Do something for an error here
        console.log("Error in fetching forecast from API");
      }) 
  })
  .catch(err => {
    // Do something for an error here
    console.log("Error in fetching grid from coordinates from API");
  })
  
}