import utils from './utils';
import service from './service';
import animateCSS from './animate';
import googleMap from './googleMap';
import 'bootstrap';

function initEvents() {
  $('.checkWeather').on('click', () => {
    if (googleMap.marker) {
      googleMap.marker.setMap(null);
    }

    let city = $('.findCity').val();
    utils.handle5Days(city);
    service.findCityAndSetMarker(city).done((response) => {
      let coords = {
        lat: response.coord.lat,
        lng: response.coord.lon
      }
      $('#map').trigger('setCenterAndZoom', { coords });
      // googleMap.map.setCenter(coords);
      // googleMap.map.setZoom(8);
      googleMap.setMarker(coords, response);
      utils.setDataToCardInfo(response);
      // googleMap.setInfoWindow(marker, response)
      $('#map').trigger('setInfoWindow', { response });
    }).fail((error) => {
      console.log(error);
    });
    $('.infoContainer').removeClass('none');
    $('.infoContainer').addClass('block');
    animateCSS('.infoContainer', 'fadeInRight')
  });

  $('.closeInfo').on('click', () => {
    $('.infoContainer').addClass('none');
  });

  $('#myTab a').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show');
  })
}

export default initEvents;