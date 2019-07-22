import $ from 'jquery';
import infoContainer from './infoContainer.html';

export default function appendInfoContainer() {
    $('.infoContainer').html(infoContainer);
}