/*! UIkit 1.1.0 | http://www.getuikit.com | (c) 2013 YOOtheme | MIT License */

(function($, doc) {

    "use strict";

    var UI = $.UIkit || {};

    if (UI.fn) {
        return;
    }

    UI.fn = function(command, options) {

        var args = arguments, cmd = command.match(/^([a-z\-]+)(?:\.([a-z]+))?/i), component = cmd[1], method = cmd[2];

        if (!UI[component]) {
            $.error("UIkit component [" + component + "] does not exist.");
            return this;
        }

        return this.each(function() {
            var $this = $(this), data = $this.data(component);
            if (!data) $this.data(component, (data = new UI[component](this, method ? undefined : options)));
            if (method) data[method].apply(data, Array.prototype.slice.call(args, 1));
        });
    };

    UI.support = {};
    UI.support.transition = (function() {

        var transitionEnd = (function() {

            var element = doc.body || doc.documentElement,
                transEndEventNames = {
                    WebkitTransition: 'webkitTransitionEnd',
                    MozTransition: 'transitionend',
                    OTransition: 'oTransitionEnd otransitionend',
                    transition: 'transitionend'
                }, name;

            for (name in transEndEventNames) {
                if (element.style[name] !== undefined) {
                    return transEndEventNames[name];
                }
            }

        }());

        return transitionEnd && { end: transitionEnd };

    })();

    UI.support.touch = (('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch);


    UI.Utils = {};

    UI.Utils.debounce = function(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    UI.Utils.options = function(string) {

        if ($.isPlainObject(string)) return string;

        var start = string.indexOf("{"), options = {};

        if (start != -1) {
            try {
                options = (new Function("", "var json = " + string.substr(start) + "; return JSON.parse(JSON.stringify(json));"))();
            } catch (e) {}
        }

        return options;
    };

    $.UIkit = UI;
    $.fn.uk = UI.fn;

    $.UIkit.langdirection = $("html").attr("dir") == "rtl" ? "right" : "left";

})(jQuery, document);


(function($, UI) {

    "use strict";

    var $win        = $(window),

        ScrollSpy   = function(element, options) {

            this.options = $.extend({}, this.options, options);

            var $this = this, inviewstate, initinview,
                fn = function(){

                    var inview = isInView($this);

                    if(inview && !inviewstate) {

                        if(!initinview) {
                            $this.element.addClass($this.options.initcls);
                            $this.offset = $this.element.offset();
                            initinview = true;

                            $this.element.trigger("uk-scrollspy-init");
                        }

                        $this.element.addClass("uk-scrollspy-inview").addClass($this.options.cls).width();
                        inviewstate = true;

                        $this.element.trigger("uk.scrollspy.inview");
                    }

                    if (!inview && inviewstate && $this.options.repeat) {
                        $this.element.removeClass("uk-scrollspy-inview").removeClass($this.options.cls);
                        inviewstate = false;

                        $this.element.trigger("uk.scrollspy.outview");
                    }
                };

            this.element = $(element);

            $win.on("scroll", fn).on("resize orientationchange", UI.Utils.debounce(fn, 50));

            fn();
        };

    $.extend(ScrollSpy.prototype, {

        options: {
            "cls": "uk-scrollspy-inview",
            "initcls": "uk-scrollspy-init-inview",
            "topoffset": 0,
            "leftoffset": 0,
            "repeat": false
        }

    });

    UI["scrollspy"] = ScrollSpy;


    function isInView(obj) {

        var $element = obj.element, options = obj.options;

        if (!$element.is(':visible')) {
            return false;
        }

        var window_left = $win.scrollLeft(), window_top = $win.scrollTop(), offset = obj.offset || $element.offset(), left = offset.left, top = offset.top;

        if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() &&
            left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
          return true;
        } else {
          return false;
        }
    }


    // init code
    $(function() {
        $("[data-uk-scrollspy]").each(function() {

            var element = $(this);

            if (!element.data("scrollspy")) {
                element.data("scrollspy", new ScrollSpy(element, UI.Utils.options(element.data("uk-scrollspy"))));
            }
        });
    });

})(jQuery, jQuery.UIkit);
