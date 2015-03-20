/*
 * relativeFixed
 * https://github.com/frensuren/relative-fixed
 *
 * Copyright (c) 2015 SUREN
 * Licensed under the MIT license.
 */

(function($) {

  // Collection method.
  $.fn.relativeFixed = function(options) {
	 if (this.length == 0)
    return this;

  var defaults = {
    parentDiv: ''
  }
  var plugin = {};
  var el = this;
  var init = function () {
    //add class to the parent div
    el.parent().addClass('aps-relativeFixed-parent');
    plugin.settings = $.extend(defaults, options);
    if (plugin.settings.parentDiv == '') {
      //store the parent div object
      plugin.settings.parentDiv = el.parent('.aps-relativeFixed-parent');
    }
    else {
      plugin.settings.parentDiv = $(plugin.settings.parentDiv);//create a jquery object for parentDiv
    }
    el.css({
      'position': 'absolute'
    });

    //get the element current offset
    plugin.currentOffsetTop = el.offset().top - plugin.settings.parentDiv.offset().top;
    //attach event of scroll on the parent div
    $(plugin.settings.parentDiv).on('scroll', function () {
      var newOffset = plugin.currentOffsetTop + plugin.settings.parentDiv.scrollTop();
      el.css({
        'top': 0,
        'bottom': 'auto',
        'transform': 'translate3d(0,' + newOffset + 'px,0)',
        '-webkit-transform': 'translate3d(0,' + newOffset + 'px,0)',
        '-moz-transform': 'translate3d(0,' + newOffset + 'px,0)',
      });
    }).scroll();
  }
  el.destroy = function () {
    el.removeAttr('style');
    plugin.settings.parentDiv.removeClass('aps-relativeFixed-parent');
    plugin.settings.parentDiv.off('scroll');
  }
  init();
  return this;
  };
}(jQuery));
