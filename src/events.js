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
      googleMap.setMarker(coords, response);
      utils.setDataToCardInfo(response);
      $('#map').trigger('setInfoWindow', { response });
    }).fail((error) => {
      $('#myModal').modal()
    });
    $('.infoContainer').removeClass('none');
    $('.infoContainer').addClass('block');
    animateCSS('.infoContainer', 'fadeInRight')
  });

  $('.closeInfo').on('click', () => {
    $('.infoContainer').addClass('none');
  });

  $('#myTab a').on('click', (e) => {
    e.preventDefault()
    $(this).tab('show');
  })
}

$('.closeModal').on('click', () => {
  $('.infoContainer').removeClass('block');
  $('.infoContainer').addClass('none');
})

$('#myModal').on('hidden.bs.modal', () => {
  $('.findCity').trigger('focus');
})

export default initEvents;