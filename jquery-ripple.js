(function($) {
  var defaults = {
        color: 'red',
        speed: 400,
        width: 2
        },
      rippleDiv;

  function getRippleDiv() {
    if (typeof rippleDiv == 'undefined') {
      rippleDiv = $('<div></div>').css({ position: 'static' });
      rippleDiv.appendTo($('body'));
    }
    return rippleDiv;
  }

  function createRing($el, color) {
    var ring = $('<div></div>'),
        sub = $('<div></div>');
    sub.appendTo(ring);
    sub.css({
      width: parseInt($el.css('width')) - defaults.width * 2,
      height: parseInt($el.css('height')) - defaults.width * 2,
      padding: $el.css('padding')
    });
    ring.css({
      position: 'absolute',
      top: $el.offset().top,
      left: $el.offset().left,
      border: defaults.width + 'px solid ' + color,
      pointerEvents: 'none'
    });
    ring.appendTo(getRippleDiv());
    return ring;
  }

  function animateRing(ring, offset, time, opacity, rounded, del) {
    if (rounded)
      rounded = 1;
    else
      rounded = 0;
    ring.animate({
      marginLeft: -1 * offset,
      marginTop: -1 * offset,
      padding: offset,
      opacity: opacity,
      borderRadius: offset * rounded
    }, time, 'swing', function() {
      if (del) {
        ring.remove();
      } 
    });
  }

  function createRipple($el, speed, color, rounded) {
    var ring = createRing($el, color);
    animateRing(ring, defaults.width * 2, 0, 1, rounded);
    animateRing(ring, 50, speed, 0, rounded, true);
  }

  $.fn.ripple = function(speed, color, rounded) {
    if (typeof color == 'undefined')
      color = 'red';
    else if (typeof color == 'function')
      color = color();
    if (typeof speed == 'undefined')
      speed = 'normal';
    this.each(function() {
      createRipple($(this), speed, color, rounded);
    });
  };
})(jQuery);
