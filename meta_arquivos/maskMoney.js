/*
* maskMoney plugin for jQuery
* http://plentz.github.com/jquery-maskmoney/
* version: 2.0.1
* Licensed under the MIT license
*/
;(function($) {
	if(!$.browser){
		$.browser = {};
		$.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
		$.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
		$.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
		$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
	}

	var methods = {
		destroy : function(){
			var input = $(this);
			input.unbind('.maskMoney');

			if ($.browser.msie) {
				this.onpaste = null;
			} else if ($.browser.mozilla) {
				this.removeEventListener('input', blurEvent, false);
			}
			return this;
		},

		mask : function(){
			return this.trigger('mask');
		},
		
		init : function(settings) {
			settings = $.extend({
				symbol: 'US$',
				showSymbol: false,
				symbolStay: false,
				thousands: ',',
				decimal: '.',
				precision: 2,
				defaultZero: true,
				allowZero: false,
				allowNegative: false
			}, settings);

			return this.each(function() {
				var input = $(this);
				var dirty = false;

				function markAsDirty() {
					dirty = true;
				}

				function clearDirt(){
					dirty = false;
				}

				function keypressEvent(e) {
					e = e || window.event;
					var k = e.which || e.charCode || e.keyCode;
					if (k == undefined) return false; //needed to handle an IE "special" event
					if (k < 48 || k > 57) { // any key except the numbers 0-9
						if (k == 45) { // -(minus) key
							markAsDirty();
							input.val(changeSign(input));
							return false;
						} else if (k == 43) { // +(plus) key
							markAsDirty();
							input.val(input.val().replace('-',''));
							return false;
						} else if (k == 13 || k == 9) { // enter key or tab key
							if(dirty){
								clearDirt();
								$(this).change();
							}
							return true;
						} else if ($.browser.mozilla && (k == 37 || k == 39) && e.charCode == 0) {
							// needed for left arrow key or right arrow key with firefox
							// the charCode part is to avoid allowing '%'(e.charCode 0, e.keyCode 37)
							return true;
						} else { // any other key with keycode less than 48 and greater than 57
							preventDefault(e);
							return true;
						}
					} else if (input.val().length >= input.attr('maxlength')) {
						return false;
					} else {
						preventDefault(e);

						var key = String.fromCharCode(k);
						var x = input.get(0);
						var selection = getInputSelection(x);
						var startPos = selection.start;
						var endPos = selection.end;
						x.value = x.value.substring(0, startPos) + key + x.value.substring(endPos, x.value.length);
						maskAndPosition(x, startPos + 1);
						markAsDirty();
						return false;
					}
				}

				function keydownEvent(e) {
					e = e||window.event;
					var k = e.which || e.charCode || e.keyCode;
					if (k == undefined) return false; //needed to handle an IE "special" event

					var x = input.get(0);
					var selection = getInputSelection(x);
					var startPos = selection.start;
					var endPos = selection.end;

					if (k==8) { // backspace key
						preventDefault(e);

						if(startPos == endPos){
							// Remove single character
							x.value = x.value.substring(0, startPos - 1) + x.value.substring(endPos, x.value.length);
							startPos = startPos - 1;
						} else {
							// Remove multiple characters
							x.value = x.value.substring(0, startPos) + x.value.substring(endPos, x.value.length);
						}
						maskAndPosition(x, startPos);
						markAsDirty();
						return false;
					} else if (k==9) { // tab key
						if(dirty) {
							$(this).change();
							clearDirt();
						}
						return true;
					} else if ( k==46 || k==63272 ) { // delete key (with special case for safari)
						preventDefault(e);
						if(x.selectionStart == x.selectionEnd){
							// Remove single character
							x.value = x.value.substring(0, startPos) + x.value.substring(endPos + 1, x.value.length);
						} else {
							//Remove multiple characters
							x.value = x.value.substring(0, startPos) + x.value.substring(endPos, x.value.length);
						}
						maskAndPosition(x, startPos);
						markAsDirty();
						return false;
					} else { // any other key
						return true;
					}
				}

				function focusEvent(e) {
					var mask = getDefaultMask();
					if (input.val() == mask) {
						input.val('');
					} else if (input.val()=='' && settings.defaultZero) {
						input.val(setSymbol(mask));
					} else {
						input.val(setSymbol(input.val()));
					}
					if (this.createTextRange) {
						var textRange = this.createTextRange();
						textRange.collapse(false); // set the cursor at the end of the input
						textRange.select();
					}
				}

				function blurEvent(e) {
					if ($.browser.msie) {
						keypressEvent(e);
					}

					if (input.val() == '' || input.val() == setSymbol(getDefaultMask()) || input.val() == settings.symbol) {
						if(!settings.allowZero) input.val('');
						else if (!settings.symbolStay) input.val(getDefaultMask());
						else input.val(setSymbol(getDefaultMask()));
					} else {
						if (!settings.symbolStay) input.val(input.val().replace(settings.symbol,''));
						else if (settings.symbolStay&&input.val()==settings.symbol) input.val(setSymbol(getDefaultMask()));
					}
				}

				function preventDefault(e) {
					if (e.preventDefault) { //standard browsers
						e.preventDefault();
					} else { // internet explorer
						e.returnValue = false
					}
				}

				function maskAndPosition(x, startPos) {
					var originalLen = input.val().length;
					input.val(maskValue(x.value));
					var newLen = input.val().length;
					startPos = startPos - (originalLen - newLen);
					setCursorPosition(input, startPos);
				}
				
				function mask(){
					var value = input.val();
					input.val(maskValue(value));
				}

				function maskValue(v) {
					v = v.replace(settings.symbol, '');

					var strCheck = '0123456789';
					var len = v.length;
					var a = '', t = '', neg='';

					if(len != 0 && v.charAt(0)=='-'){
						v = v.replace('-','');
						if(settings.allowNegative){
							neg = '-';
						}
					}

					if (len==0) {
						if (!settings.defaultZero) return t;
						t = '0.00';
					}

					for (var i = 0; i<len; i++) {
						if ((v.charAt(i)!='0') && (v.charAt(i)!=settings.decimal)) break;
					}

					for (; i < len; i++) {
						if (strCheck.indexOf(v.charAt(i))!=-1) a+= v.charAt(i);
					}
					var n = parseFloat(a);

					n = isNaN(n) ? 0 : n/Math.pow(10,settings.precision);
					t = n.toFixed(settings.precision);

					i = settings.precision == 0 ? 0 : 1;
					var p, d = (t=t.split('.'))[i].substr(0,settings.precision);
					for (p = (t=t[0]).length; (p-=3)>=1;) {
						t = t.substr(0,p)+settings.thousands+t.substr(p);
					}

					return (settings.precision>0)
					? setSymbol(neg+t+settings.decimal+d+Array((settings.precision+1)-d.length).join(0))
					: setSymbol(neg+t);
				}

				function getDefaultMask() {
					var n = parseFloat('0')/Math.pow(10,settings.precision);
					return (n.toFixed(settings.precision)).replace(new RegExp('\\.','g'),settings.decimal);
				}

				function setSymbol(value){
					if (settings.showSymbol){
						var operator = '';
						if(value.length != 0 && value.charAt(0) == '-'){
							value = value.replace('-', '');
							operator = '-';
						}

						if(value.substr(0, settings.symbol.length) != settings.symbol){
							value = operator + settings.symbol + value;
						}
					}
					return value;
				}

				function changeSign(i){
					if (settings.allowNegative) {
						var vic = i.val();
						if (i.val()!='' && i.val().charAt(0)=='-'){
							return i.val().replace('-','');
						} else{
							return '-'+i.val();
						}
					} else {
						return i.val();
					}
				}

				function setCursorPosition(input, pos) {
					// I'm not sure if we need to jqueryfy input
					$(input).each(function(index, elem) {
						if (elem.setSelectionRange) {
							elem.focus();
							elem.setSelectionRange(pos, pos);
						} else if (elem.createTextRange) {
							var range = elem.createTextRange();
							range.collapse(true);
							range.moveEnd('character', pos);
							range.moveStart('character', pos);
							range.select();
						}
					});
					return this;
				};

				function getInputSelection(el) {
					var start = 0, end = 0, normalizedValue, range, textInputRange, len, endRange;

					if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
						start = el.selectionStart;
						end = el.selectionEnd;
					} else {
						range = document.selection.createRange();

						if (range && range.parentElement() == el) {
							len = el.value.length;
							normalizedValue = el.value.replace(/\r\n/g, "\n");

							// Create a working TextRange that lives only in the input
							textInputRange = el.createTextRange();
							textInputRange.moveToBookmark(range.getBookmark());

							// Check if the start and end of the selection are at the very end
							// of the input, since moveStart/moveEnd doesn't return what we want
							// in those cases
							endRange = el.createTextRange();
							endRange.collapse(false);

							if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
								start = end = len;
							} else {
								start = -textInputRange.moveStart("character", -len);
								start += normalizedValue.slice(0, start).split("\n").length - 1;

								if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
									end = len;
								} else {
									end = -textInputRange.moveEnd("character", -len);
									end += normalizedValue.slice(0, end).split("\n").length - 1;
								}
							}
						}
					}

					return {
						start: start,
						end: end
					};
				} // getInputSelection

				if (!input.attr("readonly")){
					input.unbind('.maskMoney');
					input.bind('keypress.maskMoney', keypressEvent);
					input.bind('keydown.maskMoney', keydownEvent);
					input.bind('blur.maskMoney', blurEvent);
					input.bind('focus.maskMoney', focusEvent);
					input.bind('mask.maskMoney', mask);
				}
			})
		}
	}

	$.fn.maskMoney = function(method) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
		}
	};
})(jQuery);



/*
	Masked Input plugin for jQuery
	Copyright (c) 2007-2013 Josh Bush (digitalbush.com)
	Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
	Version: 1.3.1
*/
(function(e){function t(){var e=document.createElement("input"),t="onpaste";return e.setAttribute(t,""),"function"==typeof e[t]?"paste":"input"}var n,a=t()+".mask",r=navigator.userAgent,i=/iphone/i.test(r),o=/android/i.test(r);e.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},dataName:"rawMaskFn",placeholder:"_"},e.fn.extend({caret:function(e,t){var n;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof e?(t="number"==typeof t?t:e,this.each(function(){this.setSelectionRange?this.setSelectionRange(e,t):this.createTextRange&&(n=this.createTextRange(),n.collapse(!0),n.moveEnd("character",t),n.moveStart("character",e),n.select())})):(this[0].setSelectionRange?(e=this[0].selectionStart,t=this[0].selectionEnd):document.selection&&document.selection.createRange&&(n=document.selection.createRange(),e=0-n.duplicate().moveStart("character",-1e5),t=e+n.text.length),{begin:e,end:t})},unmask:function(){return this.trigger("unmask")},mask:function(t,r){var c,l,s,u,f,h;return!t&&this.length>0?(c=e(this[0]),c.data(e.mask.dataName)()):(r=e.extend({placeholder:e.mask.placeholder,completed:null},r),l=e.mask.definitions,s=[],u=h=t.length,f=null,e.each(t.split(""),function(e,t){"?"==t?(h--,u=e):l[t]?(s.push(RegExp(l[t])),null===f&&(f=s.length-1)):s.push(null)}),this.trigger("unmask").each(function(){function c(e){for(;h>++e&&!s[e];);return e}function d(e){for(;--e>=0&&!s[e];);return e}function m(e,t){var n,a;if(!(0>e)){for(n=e,a=c(t);h>n;n++)if(s[n]){if(!(h>a&&s[n].test(R[a])))break;R[n]=R[a],R[a]=r.placeholder,a=c(a)}b(),x.caret(Math.max(f,e))}}function p(e){var t,n,a,i;for(t=e,n=r.placeholder;h>t;t++)if(s[t]){if(a=c(t),i=R[t],R[t]=n,!(h>a&&s[a].test(i)))break;n=i}}function g(e){var t,n,a,r=e.which;8===r||46===r||i&&127===r?(t=x.caret(),n=t.begin,a=t.end,0===a-n&&(n=46!==r?d(n):a=c(n-1),a=46===r?c(a):a),k(n,a),m(n,a-1),e.preventDefault()):27==r&&(x.val(S),x.caret(0,y()),e.preventDefault())}function v(t){var n,a,i,l=t.which,u=x.caret();t.ctrlKey||t.altKey||t.metaKey||32>l||l&&(0!==u.end-u.begin&&(k(u.begin,u.end),m(u.begin,u.end-1)),n=c(u.begin-1),h>n&&(a=String.fromCharCode(l),s[n].test(a)&&(p(n),R[n]=a,b(),i=c(n),o?setTimeout(e.proxy(e.fn.caret,x,i),0):x.caret(i),r.completed&&i>=h&&r.completed.call(x))),t.preventDefault())}function k(e,t){var n;for(n=e;t>n&&h>n;n++)s[n]&&(R[n]=r.placeholder)}function b(){x.val(R.join(""))}function y(e){var t,n,a=x.val(),i=-1;for(t=0,pos=0;h>t;t++)if(s[t]){for(R[t]=r.placeholder;pos++<a.length;)if(n=a.charAt(pos-1),s[t].test(n)){R[t]=n,i=t;break}if(pos>a.length)break}else R[t]===a.charAt(pos)&&t!==u&&(pos++,i=t);return e?b():u>i+1?(x.val(""),k(0,h)):(b(),x.val(x.val().substring(0,i+1))),u?t:f}var x=e(this),R=e.map(t.split(""),function(e){return"?"!=e?l[e]?r.placeholder:e:void 0}),S=x.val();x.data(e.mask.dataName,function(){return e.map(R,function(e,t){return s[t]&&e!=r.placeholder?e:null}).join("")}),x.attr("readonly")||x.one("unmask",function(){x.unbind(".mask").removeData(e.mask.dataName)}).bind("focus.mask",function(){clearTimeout(n);var e;S=x.val(),e=y(),n=setTimeout(function(){b(),e==t.length?x.caret(0,e):x.caret(e)},10)}).bind("blur.mask",function(){y(),x.val()!=S&&x.change()}).bind("keydown.mask",g).bind("keypress.mask",v).bind(a,function(){setTimeout(function(){var e=y(!0);x.caret(e),r.completed&&e==x.val().length&&r.completed.call(x)},0)}),y()}))}})})(jQuery);