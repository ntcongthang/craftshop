/**
 * Tabify
 */
;(function ($) {

	'use strict';

	$.fn.tabify = function () {
		return this.each(function () {
			var tabs = $(this);
			$('ul.tab-nav li:first', tabs).addClass('current');
			$('div:first', tabs).show();
			var tabLinks = $('ul.tab-nav li', tabs);
			$(tabLinks).click(function () {
				$(this).addClass('current').attr( 'aria-expanded', 'true' ).siblings().removeClass('current').attr( 'aria-expanded', 'false' );
				$('.tab-content', tabs).hide().attr( 'aria-hidden', 'true' );
				var activeTab = $(this).find('a').attr( 'href' );
				$(activeTab).show().attr( 'aria-hidden', 'false' );
				$( 'body' ).trigger( 'tf_tabs_switch', [ activeTab, tabs ] );
				if ( $(activeTab).find('.shortcode.map').length > 0 ) {
					$(activeTab).find('.shortcode.map').each(function(){
						var mapInit = $(this).find('.map-container').data('map'),
							center = mapInit.getCenter();
						google.maps.event.trigger(mapInit, 'resize');
						mapInit.setCenter(center);
					});
				}
				return false;
			});
			$('.tab-content', tabs).find('a[href^="#tab-"]').on('click', function(event){
				event.preventDefault();
				var dest = $(this).prop('hash').replace('#tab-', ''),
					contentID = $('.tab-content', tabs).eq( dest - 1 ).prop('id');
				if ( $('a[href^="#'+ contentID +'"]').length > 0 ) {
					$('a[href^="#'+ contentID +'"]').trigger('click');
				}
			});
		});
	};

	// $('img.photo',this).themifyBuilderImagesLoaded(myFunction)
	// execute a callback when all images have loaded.
	// needed because .load() doesn't work on cached images
	$.fn.themifyBuilderImagesLoaded = function(callback){
	  var elems = this.filter('img'),
		  len   = elems.length,
		  blank = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
		  
	  elems.bind('load.imgloaded',function(){
		  if (--len <= 0 && this.src !== blank){ 
			elems.unbind('load.imgloaded');
			callback.call(elems,this); 
		  }
	  }).each(function(){
		 // cached images don't fire load sometimes, so we reset src.
		 if (this.complete || this.complete === undefined){
			var src = this.src;
			// webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
			// data uri bypasses webkit log warning (thx doug jones)
			this.src = blank;
			this.src = src;
		 }  
	  }); 
	 
	  return this;
	};
})(jQuery);

/*
 * Parallax Scrolling Builder
 */
(function( $ ){

	'use strict';

	var $window = $(window);
	var windowHeight = $window.height();

	$window.resize(function () {
		windowHeight = $window.height();
	});

	$.fn.builderParallax = function(xpos, speedFactor, outerHeight) {
		var $this = $(this);
		var getHeight;
		var firstTop;
		var paddingTop = 0, resizeId;
		
		//get the starting position of each element to have parallax applied to it		
		$this.each(function(){
			firstTop = $this.offset().top;
		});
		$window.resize(function(){
			clearTimeout(resizeId);
			resizeId = setTimeout(function(){
				$this.each(function(){
					firstTop = $this.offset().top;
				});
			}, 500);
		});

		if (outerHeight) {
			getHeight = function(jqo) {
				return jqo.outerHeight(true);
			};
		} else {
			getHeight = function(jqo) {
				return jqo.height();
			};
		}
			
		// setup defaults if arguments aren't specified
		if (arguments.length < 1 || xpos === null) xpos = "50%";
		if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
		if (arguments.length < 3 || outerHeight === null) outerHeight = true;
		
		// function to be called whenever the window is scrolled or resized
		function update(){
			var pos = $window.scrollTop();				

			$this.each(function(){
				var $element = $(this);
				var top = $element.offset().top;
				var height = getHeight($element);

				// Check if totally above or totally below viewport
				if (top + height < pos || top > pos + windowHeight) {
					return;
				}

				$this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
			});
		}		

		$window.bind('scroll', update).resize(update);
		update();
	};
})(jQuery);

/*! WOW - v1.1.2 - 2015-04-07
* Copyright (c) 2015 Matthieu Aussaguel; Licensed MIT */(function(){var a,b,c,d,e,f=function(a,b){return function(){return a.apply(b,arguments)}},g=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};b=function(){function a(){}return a.prototype.extend=function(a,b){var c,d;for(c in b)d=b[c],null==a[c]&&(a[c]=d);return a},a.prototype.isMobile=function(a){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)},a.prototype.createEvent=function(a,b,c,d){var e;return null==b&&(b=!1),null==c&&(c=!1),null==d&&(d=null),null!=document.createEvent?(e=document.createEvent("CustomEvent"),e.initCustomEvent(a,b,c,d)):null!=document.createEventObject?(e=document.createEventObject(),e.eventType=a):e.eventName=a,e},a.prototype.emitEvent=function(a,b){return null!=a.dispatchEvent?a.dispatchEvent(b):b in(null!=a)?a[b]():"on"+b in(null!=a)?a["on"+b]():void 0},a.prototype.addEvent=function(a,b,c){return null!=a.addEventListener?a.addEventListener(b,c,!1):null!=a.attachEvent?a.attachEvent("on"+b,c):a[b]=c},a.prototype.removeEvent=function(a,b,c){return null!=a.removeEventListener?a.removeEventListener(b,c,!1):null!=a.detachEvent?a.detachEvent("on"+b,c):delete a[b]},a.prototype.innerHeight=function(){return"innerHeight"in window?window.innerHeight:document.documentElement.clientHeight},a}(),c=this.WeakMap||this.MozWeakMap||(c=function(){function a(){this.keys=[],this.values=[]}return a.prototype.get=function(a){var b,c,d,e,f;for(f=this.keys,b=d=0,e=f.length;e>d;b=++d)if(c=f[b],c===a)return this.values[b]},a.prototype.set=function(a,b){var c,d,e,f,g;for(g=this.keys,c=e=0,f=g.length;f>e;c=++e)if(d=g[c],d===a)return void(this.values[c]=b);return this.keys.push(a),this.values.push(b)},a}()),a=this.MutationObserver||this.WebkitMutationObserver||this.MozMutationObserver||(a=function(){function a(){"undefined"!=typeof console&&null!==console&&console.warn("MutationObserver is not supported by your browser."),"undefined"!=typeof console&&null!==console&&console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")}return a.notSupported=!0,a.prototype.observe=function(){},a}()),d=this.getComputedStyle||function(a){return this.getPropertyValue=function(b){var c;return"float"===b&&(b="styleFloat"),e.test(b)&&b.replace(e,function(a,b){return b.toUpperCase()}),(null!=(c=a.currentStyle)?c[b]:void 0)||null},this},e=/(\-([a-z]){1})/g,this.WOW=function(){function e(a){null==a&&(a={}),this.scrollCallback=f(this.scrollCallback,this),this.scrollHandler=f(this.scrollHandler,this),this.resetAnimation=f(this.resetAnimation,this),this.start=f(this.start,this),this.scrolled=!0,this.config=this.util().extend(a,this.defaults),this.animationNameCache=new c,this.wowEvent=this.util().createEvent(this.config.boxClass)}return e.prototype.defaults={boxClass:"wow",animateClass:"animated",offset:0,mobile:!0,live:!0,callback:null},e.prototype.init=function(){var a;return this.element=window.document.documentElement,"interactive"===(a=document.readyState)||"complete"===a?this.start():this.util().addEvent(document,"DOMContentLoaded",this.start),this.finished=[]},e.prototype.start=function(){var b,c,d,e;if(this.stopped=!1,this.boxes=function(){var a,c,d,e;for(d=this.element.querySelectorAll("."+this.config.boxClass),e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.all=function(){var a,c,d,e;for(d=this.boxes,e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.boxes.length)if(this.disabled())this.resetStyle();else for(e=this.boxes,c=0,d=e.length;d>c;c++)b=e[c],this.applyStyle(b,!0);return this.disabled()||(this.util().addEvent(window,"scroll",this.scrollHandler),this.util().addEvent(window,"resize",this.scrollHandler),this.interval=setInterval(this.scrollCallback,50)),this.config.live?new a(function(a){return function(b){var c,d,e,f,g;for(g=[],c=0,d=b.length;d>c;c++)f=b[c],g.push(function(){var a,b,c,d;for(c=f.addedNodes||[],d=[],a=0,b=c.length;b>a;a++)e=c[a],d.push(this.doSync(e));return d}.call(a));return g}}(this)).observe(document.body,{childList:!0,subtree:!0}):void 0},e.prototype.stop=function(){return this.stopped=!0,this.util().removeEvent(window,"scroll",this.scrollHandler),this.util().removeEvent(window,"resize",this.scrollHandler),null!=this.interval?clearInterval(this.interval):void 0},e.prototype.sync=function(){return a.notSupported?this.doSync(this.element):void 0},e.prototype.doSync=function(a){var b,c,d,e,f;if(null==a&&(a=this.element),1===a.nodeType){for(a=a.parentNode||a,e=a.querySelectorAll("."+this.config.boxClass),f=[],c=0,d=e.length;d>c;c++)b=e[c],g.call(this.all,b)<0?(this.boxes.push(b),this.all.push(b),this.stopped||this.disabled()?this.resetStyle():this.applyStyle(b,!0),f.push(this.scrolled=!0)):f.push(void 0);return f}},e.prototype.show=function(a){return this.applyStyle(a),a.className=a.className+" "+this.config.animateClass,null!=this.config.callback&&this.config.callback(a),this.util().emitEvent(a,this.wowEvent),this.util().addEvent(a,"animationend",this.resetAnimation),this.util().addEvent(a,"oanimationend",this.resetAnimation),this.util().addEvent(a,"webkitAnimationEnd",this.resetAnimation),this.util().addEvent(a,"MSAnimationEnd",this.resetAnimation),a},e.prototype.applyStyle=function(a,b){var c,d,e;return d=a.getAttribute("data-wow-duration"),c=a.getAttribute("data-wow-delay"),e=a.getAttribute("data-wow-iteration"),this.animate(function(f){return function(){return f.customStyle(a,b,d,c,e)}}(this))},e.prototype.animate=function(){return"requestAnimationFrame"in window?function(a){return window.requestAnimationFrame(a)}:function(a){return a()}}(),e.prototype.resetStyle=function(){var a,b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(a.style.visibility="visible");return e},e.prototype.resetAnimation=function(a){var b;return a.type.toLowerCase().indexOf("animationend")>=0?(b=a.target||a.srcElement,b.className=b.className.replace(this.config.animateClass,"").trim()):void 0},e.prototype.customStyle=function(a,b,c,d,e){return b&&this.cacheAnimationName(a),a.style.visibility=b?"hidden":"visible",c&&this.vendorSet(a.style,{animationDuration:c}),d&&this.vendorSet(a.style,{animationDelay:d}),e&&this.vendorSet(a.style,{animationIterationCount:e}),this.vendorSet(a.style,{animationName:b?"none":this.cachedAnimationName(a)}),a},e.prototype.vendors=["moz","webkit"],e.prototype.vendorSet=function(a,b){var c,d,e,f;d=[];for(c in b)e=b[c],a[""+c]=e,d.push(function(){var b,d,g,h;for(g=this.vendors,h=[],b=0,d=g.length;d>b;b++)f=g[b],h.push(a[""+f+c.charAt(0).toUpperCase()+c.substr(1)]=e);return h}.call(this));return d},e.prototype.vendorCSS=function(a,b){var c,e,f,g,h,i;for(h=d(a),g=h.getPropertyCSSValue(b),f=this.vendors,c=0,e=f.length;e>c;c++)i=f[c],g=g||h.getPropertyCSSValue("-"+i+"-"+b);return g},e.prototype.animationName=function(a){var b;try{b=this.vendorCSS(a,"animation-name").cssText}catch(c){b=d(a).getPropertyValue("animation-name")}return"none"===b?"":b},e.prototype.cacheAnimationName=function(a){return this.animationNameCache.set(a,this.animationName(a))},e.prototype.cachedAnimationName=function(a){return this.animationNameCache.get(a)},e.prototype.scrollHandler=function(){return this.scrolled=!0},e.prototype.scrollCallback=function(){var a;return!this.scrolled||(this.scrolled=!1,this.boxes=function(){var b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],a&&(this.isVisible(a)?this.show(a):e.push(a));return e}.call(this),this.boxes.length||this.config.live)?void 0:this.stop()},e.prototype.offsetTop=function(a){for(var b;void 0===a.offsetTop;)a=a.parentNode;for(b=a.offsetTop;a=a.offsetParent;)b+=a.offsetTop;return b},e.prototype.isVisible=function(a){var b,c,d,e,f;return c=a.getAttribute("data-wow-offset")||this.config.offset,f=window.pageYOffset,e=f+Math.min(this.element.clientHeight,this.util().innerHeight())-c,d=this.offsetTop(a),b=d+a.clientHeight,e>=d&&b>=f},e.prototype.util=function(){return null!=this._util?this._util:this._util=new b},e.prototype.disabled=function(){return!this.config.mobile&&this.util().isMobile(navigator.userAgent)},e}()}).call(this);

/* Backstretch 2.0.3 2012-11-30 http://srobbin.com/jquery-plugins/backstretch/ (c) Scott Robbin Licensed MIT */
;(function(f,b,g){f.fn.backstretch=function(h,e){return(h===g||h.length===0)&&f.error("No images were supplied for Backstretch"),f(b).scrollTop()===0&&b.scrollTo(0,0),this.each(function(){var i=f(this),j=i.data("backstretch");j&&(e=f.extend(j.options,e),j.destroy(!0)),j=new a(this,h,e),i.data("backstretch",j)})},f.backstretch=function(e,h){return f("body").backstretch(e,h).data("backstretch")},f.expr[":"].backstretch=function(e){return f(e).data("backstretch")!==g},f.fn.backstretch.defaults={centeredX:!0,centeredY:!0,duration:5000,fade:0/*!Themify*/,mode:'fullcover'/*!Themify*/ };var d={wrap:{left:0,top:0,overflow:"hidden",margin:0,padding:0,height:"100%",width:"100%",zIndex:-999999},img:{position:"absolute",display:"none",margin:0,padding:0,border:"none",width:"auto",height:"auto",maxWidth:"none",zIndex:-999999}},a=function(l,j,k){this.options=f.extend({},f.fn.backstretch.defaults,k||{}),this.images=f.isArray(j)?j:[j],f.each(this.images,function(){f("<img />")[0].src=this}),this.isBody=l===document.body,this.$container=f(l),this.$wrap=f('<div class="backstretch"></div>').css(d.wrap).appendTo(this.$container),this.$root=this.isBody?c?f(b):f(document):this.$container;if(!this.isBody){var h=this.$container.css("position"),e=this.$container.css("zIndex");this.$container.css({position:h==="static"?"relative":h,zIndex:e==="auto"?0:e,background:"none"}),this.$wrap.css({zIndex:-999998})}this.$wrap.css({position:this.isBody&&c?"fixed":"absolute"}),this.index=0,this.show(this.index),f(b).on("resize.backstretch",f.proxy(this.resize,this)).on("orientationchange.backstretch",f.proxy(function(){this.isBody&&b.pageYOffset===0&&(b.scrollTo(0,1),this.resize())},this))};a.prototype={resize:function(){try{var m={left:0,top:0},q=this.isBody?this.$root.width():this.$root.innerWidth(),l=q,j=this.isBody?b.innerHeight?b.innerHeight:this.$root.height():this.$root.innerHeight(),k=l/this.$img.data("ratio"),p;k>=j?(p=(k-j)/2,this.options.centeredY&&(m.top="-"+p+"px")):(k=j,l=k*this.$img.data("ratio"),p=(l-q)/2,this.options.centeredX&&(m.left="-"+p+"px")),this.$wrap.css({width:q,height:j}).find("img:not(.deleteable)").css({width:l,height:k}).css(m);
/*!Begin Themify*/
;if("best-fit"==k.options.mode){if(this.$img.width()<this.$img.height()){if(this.$img.closest('.row_inner').width()<f(window).height()){if(this.$img.closest('.row_inner').width()<this.$img.width()){this.$img.removeClass("best-fit-vertical").addClass("best-fit-horizontal")}}else{this.$img.removeClass("best-fit-horizontal").addClass("best-fit-vertical")}}}
/*!End Themify*/
}catch(h){}return this},show:function(h){if(Math.abs(h)>this.images.length-1){return}this.index=h;var k=this,e=k.$wrap.find("img").addClass("deleteable"),j=f.Event("backstretch.show",{relatedTarget:k.$container[0]});return clearInterval(k.interval),k.$img=f("<img />").css(d.img).bind("load",function(i){var l=this.width||f(i.target).width(),m=this.height||f(i.target).height();
/*!Begin Themify*/
;if("best-fit"==k.options.mode){if(this.width<this.height){f(this).removeClass('best-fit-horizontal').addClass("best-fit best-fit-vertical")}else{f(this).removeClass('best-fit-vertical').addClass("best-fit best-fit-horizontal")}}
/*!End Themify*/
;f(this).data("ratio",l/m),f(this).fadeIn(k.options.speed||k.options.fade,function(){e.remove(),k.paused||k.cycle(),k.$container.trigger(j,k)}),k.resize()}).appendTo(k.$wrap),k.$img.attr("src",k.images[h]),k},next:function(){return this.show(this.index<this.images.length-1?this.index+1:0)},prev:function(){return this.show(this.index===0?this.images.length-1:this.index-1)},pause:function(){return this.paused=!0,this},resume:function(){return this.paused=!1,this.next(),this},cycle:function(){return this.images.length>1&&(clearInterval(this.interval),this.interval=setInterval(f.proxy(function(){this.paused||this.next()},this),this.options.duration)),this},destroy:function(e){f(b).off("resize.backstretch orientationchange.backstretch"),clearInterval(this.interval),e||this.$wrap.remove(),this.$container.removeData("backstretch")}};var c=function(){var t=navigator.userAgent,k=navigator.platform,h=t.match(/AppleWebKit\/([0-9]+)/),p=!!h&&h[1],x=t.match(/Fennec\/([0-9]+)/),j=!!x&&x[1],w=t.match(/Opera Mobi\/([0-9]+)/),v=!!w&&w[1],q=t.match(/MSIE ([0-9]+)/),m=!!q&&q[1];return !((k.indexOf("iPhone")>-1||k.indexOf("iPad")>-1||k.indexOf("iPod")>-1)&&p&&p<534||b.operamini&&{}.toString.call(b.operamini)==="[object OperaMini]"||w&&v<7458||t.indexOf("Android")>-1&&p&&p<533||j&&j<6||"palmGetResource" in b&&p&&p<534||t.indexOf("MeeGo")>-1&&t.indexOf("NokiaBrowser/8.5.0")>-1||m&&m<=6)}()})(jQuery,window);