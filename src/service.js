function getWeatherByCoords(coordsOfClick) {
    return $.ajax({
      type: 'get',
      data: {
        APPID: 'd9146e210bd357c09924ec64e3d69f7a'
      },
      url: `http://api.openweathermap.org/data/2.5/weather?lat=${coordsOfClick.lat}&lon=${coordsOfClick.lng}`
    });
  }


  function findCityAndSetMarker(city) {
    return $.ajax({
      type: 'get',
      data: {
        APPID: 'd9146e210bd357c09924ec64e3d69f7a',
        q: city
      },
      url: 'http://api.openweathermap.org/data/2.5/weather',
    });
  }

  function getWeatherFor5Days(city) {
    return $.ajax({
      type: 'get',
      data: {
        q: city,
        APPID: 'd9146e210bd357c09924ec64e3d69f7a'
      },
      url: 'http://api.openweathermap.org/data/2.5/forecast',
    })
  };

module.exports = {
    getWeatherByCoords: getWeatherByCoords,
    findCityAndSetMarker: findCityAndSetMarker,
    getWeatherFor5Days: getWeatherFor5Days
}