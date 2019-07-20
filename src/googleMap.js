import service from './service';
import * as mapStyles from './mapStyles.json';
import animateCSS from './animate';
import utils from './utils';

let map, marker;
function GMapCallback() {
    let mapStylesJSON = mapStyles.default;
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 48.3830, lng: 31.1829 },
        zoom: 3,
        disableDefaultUI: true,
        styles: mapStylesJSON
    });
    google.maps.event.addListener(map, "click", function (event) {
        let latitude = event.latLng.lat();
        let longitude = event.latLng.lng();
        let coordsOfClick = { lat: latitude, lng: longitude }
        handleWeatherByCoords(coordsOfClick);
        
        });
}

function handleWeatherByCoords(coordsOfClick){
    service.getWeatherByCoords(coordsOfClick).done((response) =>{
      setMarker(coordsOfClick, response)
  
      google.maps.event.addListener(map, "click", ()=>{
        marker.setMap(null);
      })
      setInfoWindow(marker, response)
    }).fail((error) => {
      console.log(error);
    });
  }

  function initMap(){
    window.GMapCallback = GMapCallback;

    let url = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDgXKZbz-1NwvQwlGeB3pUJg9Fuf3iGHhE&libraries=visualization&callback=GMapCallback';
    let script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    $('body').append(script);

    $('#map').on('setCenterAndZoom', (e, data) => {
        var a = data.coords;
        map.setCenter(data.coords);
        map.setZoom(8);
    });
    $('#map').on('setInfoWindow', (e, data) => {
        setInfoWindow(marker, data.response);
    });

  }


  
function setMarker(coords, response) {
    if(marker){
      marker.setMap(null);
      marker = undefined;
    }
    marker = new google.maps.Marker({
    position: coords,
    map: map,
    icon: 'https://openweathermap.org/img/w/' + response.weather[0].icon + '.png'
  });


}

function setInfoWindow(marker, response){
    let contentString = `
    <h3>
      <a href="#" class="showWeather">
        ${response.name}
      </a>
    </h3>
    <h4>
      ${Math.floor(response.main.temp - 273.15)}&deg;C
    </h4>`
    let infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    infowindow.open(map, marker);
    infowindow.addListener('domready', () => {
      $('.showWeather').on('click', () => {
        let cityName = $('.showWeather').text();
       
        service.findCityAndSetMarker(cityName).done((response) => {      

            utils.handle5Days(cityName);
            utils.setDataToCardInfo(response);
            
          }).fail((error) => {
            console.log(error);
          });
        service.getWeatherFor5Days(cityName);
        $('.infoContainer').removeClass('none');
        $('.infoContainer').addClass('block');
        animateCSS('.infoContainer', 'fadeInRight');
        
      });
    });
    infowindow.addListener('closeclick', () => {
      marker.setMap(null);
    });
    google.maps.event.addListener(map, "click", ()=>{
      
      infowindow.close();
      
      marker.setMap(null);
    })
   
  }
export default {
    initMap,
    map,
    setMarker,
    setInfoWindow
};
