function destroySlick(){
    if ( $('.slider').hasClass('slick-initialized')){
      $('.slider').slick('destroy');
    }
  }
  
  function initSlickSlider(){
    $('.slider').slick({
      refresh: true,
      infinite: false,
      slidesToShow: 5,
      draggable: true,
      swipeToSlide: true,
      arrows: false
    });
  }
  
  export default {initSlickSlider, destroySlick};