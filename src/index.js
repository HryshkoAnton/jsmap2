import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import 'slick-carousel';
import googleMap from './googleMap';
import initEvents from './events';


googleMap.initMap();
initEvents();