import service from './service';
import slickHelper from './slickHelper';

function setDataToCardInfo(response) {
    let cardInfo = $('.infoContainer');
    cardInfo.find('.cityName').text(response.name);
    cardInfo.find('.cityInfo').text(
      `Страна: ${response.sys.country}
      / Широта: ${response.coord.lat}
      / Долгота: ${response.coord.lon}
      / Часовой пояс: UTC+${(response.timezone) / 60 / 60}`);
    cardInfo.find('.description').html(`
    <img style="width: 80px">
    <span>
      ${response.weather[0].description}
    </span>`)
    cardInfo.find('.description img').prop('src', 'https://openweathermap.org/img/w/' + response.weather[0].icon + '.png');
    cardInfo.find('.temperature').html(`<span>${Math.floor(response.main.temp - 273.15)} &deg;C</span>`);
    cardInfo.find('.pressure').html(`<span>Атмосферное давление: ${Math.floor(response.main.pressure / 1.333)} мм рт. ст.</span>`);
    cardInfo.find('.humidity').html(`<span>Влажность: ${response.main.humidity} %</span>`);
    cardInfo.find('.wind').text('Ветер:' + response.wind.speed + ' m/s');
    cardInfo.find('.sunrise').text('Восход: ' + getDateFromUnixTime(response.sys.sunrise));
    cardInfo.find('.sunset').text('Закат: ' + getDateFromUnixTime(response.sys.sunset));
    if(response.visibility) {
      cardInfo.find('.visibility').text(`Видимость: ${response.visibility / 1000} км.`)
    }
  }
  
function getDateFromUnixTime(unixTime) {
let date = new Date(unixTime * 1000);
let hours = date.getHours();
let minutes = `0${date.getMinutes()}`;
let seconds = `0${date.getSeconds()}`;
let formattedTime = `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
return formattedTime
}

function addDataToCard(response){
_.each(response.list, data => {
    let clone = $('#card-tmpl').clone()
    .prop('id', data.dt)
    .appendTo('.card-section');
    clone.find('.weatherDate').html(`<span>${data.dt_txt.slice(0,10).split('-').reverse().join('-')}<br>${data.dt_txt.slice(11,16)}</span>`);
    clone.find('.weatherIcon').prop('src', 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
    clone.find('.weatherTemp').html(`<span>${Math.floor(data.main.temp - 273.15)} &deg;C</span>`);
});
}

function handleHours(hours){
let daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
let days = [];
let dayArr = [];
let dayIndex;
hours.forEach(hourObj => {
    let date = new Date(hourObj.dt_txt);
    let dayHours = date.getHours();
    dayArr.push(hourObj);
    
    dayIndex = date.getDay();
    if (dayHours === 21) {
    days.push({
        day: daysOfWeek[dayIndex],
        dayArr: dayArr
    });
    dayArr = [];

    }
    
});
addDataToEveryDayWeatherTabs(days);
return days;
}

function addDataToEveryDayWeatherTabs(responseArray){
responseArray.forEach((data, i) => {
    let $table = $('<table class="table table-striped table-dark"></table>');
    // let $head;
    $(`#dayTab-${i}`).text(data.day);
    let $head = $('<thead></thead>');
    let $body = $('<tbody></tbody>');

    data.dayArr.forEach((day, index) => {
        $(`#dayContent-${i}`).html('');
        if (index === 0) {
            
            let $trHead = $(`<tr class="tr-head"><th>${day.dt_txt.slice(0,10).split('-').reverse().join('-')}:</th><th>${day.dt_txt.slice(11,16)}</th></tr>`);
            let $trBody1 = $(`<tr class="tr-body-1"><td>Описание:</td><td><img src="https://openweathermap.org/img/w/${day.weather[0].icon}.png"><br>${day.weather[0].description}</td></tr>`);
            let $trBody2 = $(`<tr class="tr-body-2"><td>Температура:</td><td>${Math.floor(day.main.temp - 273.15)} &deg;C</td></tr>`);
            let $trBody3 = $(`<tr class="tr-body-3"><td>Атм. давление:</td><td>${Math.floor(day.main.pressure / 1.333)} мм рт. ст.</td></tr>`);
            let $trBody4 = $(`<tr class="tr-body-4"><td>Влажность:</td><td>${day.main.humidity} %</td></tr>`);
            let $trBody5 = $(`<tr class="tr-body-5"><td>Ветер:</td><td>${day.wind.speed} м/с</td></tr>`);
            
            $head.append($trHead);
            $body.append($trBody1);
            $body.append($trBody2);
            $body.append($trBody3);
            $body.append($trBody4);
            $body.append($trBody5);
            
        } else {
            $head.find('.tr-head').append(`<th>${day.dt_txt.slice(11,16)}</th>`);
            $body.find('.tr-body-1').append(`<td><img src="https://openweathermap.org/img/w/${day.weather[0].icon}.png"><br>${day.weather[0].description}</td>`);
            $body.find('.tr-body-2').append(`<td>${Math.floor(day.main.temp - 273.15)} &deg;C</td>`);
            $body.find('.tr-body-3').append(`<td>${Math.floor(day.main.pressure / 1.333)} мм рт. ст.</td>`);
            $body.find('.tr-body-4').append(`<td>${day.main.humidity} %</td>`);
            $body.find('.tr-body-5').append(`<td>${day.wind.speed} м/с</td>`);
            
        }
    });

    $table.append($head);
    $table.append($body);
    $(`#dayContent-${i}`).append($table);
    });
}

function handle5Days(city){
    service.getWeatherFor5Days(city).done((response) => {
      handleHours(response.list);
      addDataToCard(response);
      slickHelper.destroySlick();
      slickHelper.initSlickSlider();
      
    }).fail((error) => {
      console.log(error);
    });
  }
export default {
    setDataToCardInfo,
    getDateFromUnixTime, 
    addDataToCard, 
    handleHours, 
    addDataToEveryDayWeatherTabs, 
    handle5Days
};