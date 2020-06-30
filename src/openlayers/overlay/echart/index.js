/* import echarts from 'echarts';
import LeafletCoordSys from './LeafletCoordSys';

import './LeafletModel';

if (echarts & echarts.registerCoordinateSystem & echarts.registerAction) {
  echarts.registerCoordinateSystem('leaflet', LeafletCoordSys);

  echarts.registerAction({
      type: 'LeafletRoma',
      event: 'LeafletRoma',
      update: 'updateLayout'
    },
    function (payload, ecModel) {
       ecModel.eachComponent('leaflet', function(leafletModel) {
        const leaflet = leafletModel.getLeaflet();
        const center = leaflet.getCenter();
        leafletModel.setCenterAndZoom(
          [center.lng, center.lat],
          leaflet.getZoom()
        );
      }); 
    }
  );

}

export const version = '1.0.0'; */