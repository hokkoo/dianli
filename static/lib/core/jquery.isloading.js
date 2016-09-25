/**
 * Loading plugin for jQuery
 * version: v1.0.6
 *
 * Small helper to give the user a visual feedback that something is happening
 * when fetching/posting data
 *
 * USAGE:
 * - global overlay:                     $.isLoading();
 * - use javascript:                     $( selector ).isLoading();
 * - On non-form elements:               $("div").isLoading({ text: "Loading", position:'inside'});
 * - remove the loading element:         $( selector ).isLoading( "hide" );
 *
 * @author Laurent Blanes <laurent.blanes@gmail.com>
 * ---
 * Copyright 2013, Laurent Blanes ( https://github.com/hekigan/is-loading )
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2013 Laurent Blanes
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
;
(function($, window, document, undefined) {

    // Create the defaults once
    var pluginName = "isLoading",
        defaults = {
            'position': "right", // right | inside | overlay
            'text': "", // Text to display next to the loader
            'class': "fa-refresh", // loader CSS class
            'tpl': '<span class="isloading-wrapper %wrapper%" style="margin-left: 10px;z-index:101;">%text%<i class="%class% fa-spin"></i></span>', // loader base Tag
            'disableSource': true, // true | false
            'disableOthers': []
        };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;

        // Merge user options with default ones
        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;
        this._loader = null; // Contain the loading tag element
        this.init();
        this.inside  = true;

    }

    // Contructor function for the plugin (only once on page load)
    function contruct() {
        if (!$[pluginName]) {
            $.isLoading = function(opts) {
                $("body").isLoading(opts);
            };
        }
    }

    Plugin.prototype = {
        init: function() {
            var self = this;
            if ($(this.element).is("body")) {
                this.options.position = "overlay";
            }
            tpl = self.options.tpl.replace('%wrapper%', ' isloading-show ' + ' isloading-' + self.options.position);
            tpl = tpl.replace('%class%', self.options['class']);
            tpl = tpl.replace('%text%', (self.options.text !== "") ? self.options.text + ' ' : '');
            self._loader = $(tpl);
            this.options.disableOthers.push(this.element);
            switch (self.options.position) {
                case "inside":
                    $(self.element).html(self._loader);
                    break;
                case "overlay":
                    var $wrapperTpl =this._wrapper= $('<div class="isloading-overlay" style="text-align: center;position:absolute; left:0; top:0; z-index: 100; background: rgba(0,0,0,0.5); width: 100%; height: 100%;" />');
                    var isbody = $(self.element).is('body');
                    var ovCss = {
                        'background': '#FFFFFF',
                        '-webkit-border-radius': '7px',
                        '-webkit-background-clip': 'padding-box',
                        '-moz-border-radius': '7px',
                        '-moz-background-clip': 'padding-box',
                        'border-radius': '7px',
                        'background-clip': 'padding-box',
                        'display': 'inline-block',
                        'margin': '0 auto',
                        'padding': '10px 20px',
                        'position':'relative'
                    }
                    this.inside = false;
                    var ref_pos = function(){
                        var p ={position :'absolute',top:0,left:0},pos =$(self.element).position();
                        if($(self.element).css('position')=='static'){
                            p.top = pos.top;
                            p.left = pos.left;
                            p.height = $(self.element).outerHeight();
                        }
                        if(isbody){
                            p.position = 'fixed';
                            p.height = $(window).height();
                        }
                        return p;
                    }
                    function layout(){
                        $wrapperTpl.css(ref_pos());
                        self._loader.css({
                             top: ($wrapperTpl.outerHeight() / 2 - self._loader.outerHeight() / 2)
                        });
                    }
                    //初次布局
                    if(isbody){
                        $("body").prepend($wrapperTpl);
                    }else{
                        $(self.element).prepend($wrapperTpl);
                    }
                    $wrapperTpl.html(self._loader.css(ovCss));
                    layout();
                    //绑定resize
                    $(window).on('resize',layout);
                    break;
                default:
                    $(self.element).after(self._loader);
                    break;
            }
            //self.disableOthers();
            //this.show();
        },
        show: function() {
            this._wrapper ? $(this._wrapper).show() : $(this._loader).show();
            this.disableOthers();
            return this;
        },
        hide: function() {
            this._wrapper ? $(this._wrapper).hide() : $(this._loader).hide();
            this.inside ? this.remove() :1;
            this.enableOthers();
            return this;
        },
        remove : function(){
            this._wrapper ? $(this._wrapper).remove() : $(this._loader).remove();
            $(this.element).data("plugin_" + pluginName,null);
        },
        disableOthers: function() {
            $.each(this.options.disableOthers, function(i, e) {
                var elt = $(e);
                if (elt.is("button, input, textarea")) {
                    elt.attr("disabled", "disabled");
                } else {
                    elt.addClass("disabled");
                }
            });
        },
        enableOthers: function() {
            $.each(this.options.disableOthers, function(i, e) {
                var elt = $(e);
                if (elt.is("button, input, textarea")) {
                    elt.removeAttr("disabled");
                } else {
                    elt.removeClass("disabled");
                }
            });
        }
    };
    // Constructor
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            var d = $.data(this, "plugin_" + pluginName);
            if(d) options == 'hide'?d.hide():d.show();
            else{
              //  d = new Plugin(this, options);
                $.data(this, "plugin_" + pluginName,new Plugin(this, options).show());
              //  d.show();
            }
        });
    };
    contruct();
})(jQuery, window, document);