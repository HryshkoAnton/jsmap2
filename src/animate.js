function animateCSS(element, animationName, callback) {
    const $elem = $(element)
    $elem.addClass(`animated ${animationName}`)
  
    function handleAnimationEnd() {
      $elem.removeClass(`animated ${animationName}`)
      $elem.off('animationend', handleAnimationEnd)
  
      if (typeof callback === 'function') callback()
    }
  
    $elem.on('animationend', handleAnimationEnd)
  }

  export default animateCSS;