Leaflet.OpacityControls
=======================

Simple Leaflet controls to adjust the opacity of a map.

Check out the demo here: http://lizardtechblog.github.io/Leaflet.OpacityControls/

There are three controls that you can add to a map: a control to increase opacity, a control to decrease opacity, and an interactive slider control. The main files for the controls are ````lib/opacity/Control.Opacity.js```` and ````lib/opacity/Control.Opacity.css````. Only the slider control uses the jquery-ui library.

To initialize the controls, add the following lines to the BODY of your HTML document:

    var higherOpacity = new L.Control.higherOpacity();
    map.addControl(higherOpacity);
    var lowerOpacity = new L.Control.lowerOpacity();
    map.addControl(lowerOpacity);
    var opacitySlider = new L.Control.opacitySlider();
    map.addControl(opacitySlider);
    
To specify the layer for which you want to modify the opacity, use the ````setOpacityLayer()```` method. For example, to set a layer called ````historic_seattle```` as the opacity layer, add the following line to the BODY of your HTML document:

    higherOpacity.setOpacityLayer(historic_seattle);
    
You only need to call the setOpacityLayer() method for one control. The method sets the opacity layer for the other controls automatically. This makes it possible for you to use controls individually. For example, if you only want to create the opacity slider control, you can add the following lines to the BODY of your HTML document:
    
    var opacitySlider = new L.Control.opacitySlider();
    map.addControl(opacitySlider);
    opacitySlider.setOpacityLayer(historic_seattle);
    
The controls make use of the Leaflet and jquery-ui libraries. Include the following lines of code in the HEAD of your HTML document:

    <link rel="stylesheet" href="lib/leaflet/leaflet.css" />
	  <!--[if lte IE 8]><link rel="stylesheet" href="libs/leaflet.ie.css" /><![endif]-->
    <script src="lib/leaflet/leaflet.js"></script>
    
    <link rel="stylesheet" href="lib/opacity/Control.Opacity.css" />
    <script src="lib/opacity/Control.Opacity.js"></script>
        
    
    <script src="lib/jquery/jquery-1.9.1.js"></script>
    <script src="lib/jquery/jquery-ui-1.10.3.custom.min.js"></script>
    <link rel="stylesheet" href="lib/jquery/jquery-ui-1.10.3.custom.min.css" />
