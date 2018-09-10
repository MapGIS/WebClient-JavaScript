function naviMain(){
  // document.getElementById("body-framework").innerHTML = '';
  // document.getElementById("body-framework").load("../ui/sidebar-leaflet.html");
  $("#body-framework").innerHTML = '';
  $("#body-framework").load("../ui/main.html");
  //$("#body-framework").load("../ui/sidebar-leaflet.html");
}

function naviLeaflet(){
  mapMode = MODE_LEAFLET;
  // document.getElementById("body-framework").innerHTML = '';
  // document.getElementById("body-framework").load("../ui/sidebar-leaflet.html");
  // $("#body-framework").innerHTML = '';
  // $("#body-framework").load("../ui/showcase-leaflet.html");
  //$("#body-framework").load("../ui/sidebar-leaflet.html");
}

function naviMapbox(){
  mapMode = MODE_MAPBOX;
}

function naviCesium(){
  mapMode = MODE_CESIUM;
  //$("#body-framework").innerHTML = '';
  //$("#body-framework").load("../ui/showcase-cesium.html");
  $(".body-sidebar").load("../ui/sidebar-cesium.html");

  //initCodeView();
}
