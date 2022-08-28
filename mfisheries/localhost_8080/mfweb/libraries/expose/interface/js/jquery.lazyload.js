/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2012 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.8.0
 *
 */(function(e,t){var n=e(t);e.fn.lazyload=function(r){function i(){var t=0;s.each(function(){var n=e(this);if(u.skip_invisible&&!n.is(":visible"))return;if(!e.abovethetop(this,u)&&!e.leftofbegin(this,u))if(!e.belowthefold(this,u)&&!e.rightoffold(this,u))n.trigger("appear");else if(++t>u.failure_limit)return!1})}var s=this,o,u={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:t,data_attribute:"original",skip_invisible:!0,appear:null,load:null};return r&&(undefined!==r.failurelimit&&(r.failure_limit=r.failurelimit,delete r.failurelimit),undefined!==r.effectspeed&&(r.effect_speed=r.effectspeed,delete r.effectspeed),e.extend(u,r)),o=u.container===undefined||u.container===t?n:e(u.container),0===u.event.indexOf("scroll")&&o.bind(u.event,function(e){return i()}),this.each(function(){var t=this,n=e(t);t.loaded=!1,n.one("appear",function(){if(!this.loaded){if(u.appear){var r=s.length;u.appear.call(t,r,u)}e("<img />").bind("load",function(){n.hide().attr("src",n.data(u.data_attribute))[u.effect](u.effect_speed),t.loaded=!0;var r=e.grep(s,function(e){return!e.loaded});s=e(r);if(u.load){var i=s.length;u.load.call(t,i,u)}}).attr("src",n.data(u.data_attribute))}}),0!==u.event.indexOf("scroll")&&n.bind(u.event,function(e){t.loaded||n.trigger("appear")})}),n.bind("resize",function(e){i()}),i(),this},e.belowthefold=function(r,i){var s;return i.container===undefined||i.container===t?s=n.height()+n.scrollTop():s=e(i.container).offset().top+e(i.container).height(),s<=e(r).offset().top-i.threshold},e.rightoffold=function(r,i){var s;return i.container===undefined||i.container===t?s=n.width()+n.scrollLeft():s=e(i.container).offset().left+e(i.container).width(),s<=e(r).offset().left-i.threshold},e.abovethetop=function(r,i){var s;return i.container===undefined||i.container===t?s=n.scrollTop():s=e(i.container).offset().top,s>=e(r).offset().top+i.threshold+e(r).height()},e.leftofbegin=function(r,i){var s;return i.container===undefined||i.container===t?s=n.scrollLeft():s=e(i.container).offset().left,s>=e(r).offset().left+i.threshold+e(r).width()},e.inviewport=function(t,n){return!e.rightofscreen(t,n)&&!e.leftofscreen(t,n)&&!e.belowthefold(t,n)&&!e.abovethetop(t,n)},e.extend(e.expr[":"],{"below-the-fold":function(t){return e.belowthefold(t,{threshold:0})},"above-the-top":function(t){return!e.belowthefold(t,{threshold:0})},"right-of-screen":function(t){return e.rightoffold(t,{threshold:0})},"left-of-screen":function(t){return!e.rightoffold(t,{threshold:0})},"in-viewport":function(t){return!e.inviewport(t,{threshold:0})},"above-the-fold":function(t){return!e.belowthefold(t,{threshold:0})},"right-of-fold":function(t){return e.rightoffold(t,{threshold:0})},"left-of-fold":function(t){return!e.rightoffold(t,{threshold:0})}})})(jQuery,window);