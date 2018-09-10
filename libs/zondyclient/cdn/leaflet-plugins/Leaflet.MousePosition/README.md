# Leaflet.MousePosition

Leaflet.MousePosition is a simple mouse position control that you can drop into your leaflet map. It displays geographic coordinates of the mouse pointer, as it is moved about the map.

## Using the Mouse Position Control

Insert the following line:

    ...
    L.control.mousePosition().addTo(map);
    ...

## Available Options:

These are the available options:

`position:` The standard Leaflet.Control position parameter. Defaults to 'bottomleft'

`separator:` To separate longitude\latitude values. Defaults to ' : '

`emptystring:` Initial text to display. Defaults to 'Unavailable'

`numDigits:` Number of digits. Defaults to 5

`lngFirst:` Weather to put the longitude first or not. Defaults to false

`lngFormatter:` Custom function to format the longitude value. Defaults to undefined

`latFormatter:` Custom function to format the latitude value. Defaults to undefined

`prefix:` A string to be prepended to the coordinates. Defaults to the empty string ‘’.
