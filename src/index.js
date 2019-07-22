import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import 'slick-carousel';
import googleMap from './googleMap';
import initEvents from './events';

import appendInfoContainer from './infoContainer/index'
appendInfoContainer()
googleMap.initMap();
initEvents();

