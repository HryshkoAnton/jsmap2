import $ from 'jquery';
import template from './hello-template.html';

export default function helloHtml() {
    $('.hello-section').html(template);
}