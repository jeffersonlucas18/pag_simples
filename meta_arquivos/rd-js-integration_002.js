/*! Resultados Digitais - Thu Aug 23 2018 15:40:28 GMT-0300 (-03) */
"use strict";function _classCallCheck(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function RDStationFormIntegration(n,t,e){RdIntegration.integrate(n,t,e)}var FormFields=function(){function n(n){for(var t=[],e=0;e<n.length;e+=1)t.push(n[e]);return t}function t(n){var t=jQuery(n).attr("name")||"",e=n.value,o=RDIntegrationCreditCard.validNumber(e);return!(u.indexOf(t.toLowerCase())>=0||o)}function e(e){var o=jQuery(e).find(":input").not(":password"),r=n(o),i=r.filter(t);return jQuery(i).serializeArray()}function o(n){return n.replace(/[\s_-]/g,"").toLowerCase().indexOf("email")>-1}function r(n){var t=!1,e=n.type;return e&&(t="email"===e),o(n.name)||t}function i(n){var t=!1;return jQuery.each(n,function(){if(r(this)&&""!==this.value)return this.name="email",t=!0,!1}),t}function a(e){return n(jQuery(e).find(":input").not(":password").not(":submit").not(":button").not(":reset").not(":checkbox").not(":radio")).filter(t)}var u=["captcha","_wpcf7","_wpcf7_version","_wpcf7_unit_tag","_wpnonce","_wpcf7_is_ajax_call","_wpcf7_locale","g-recaptcha-response","_viewstate","_previouspage","_viewstategenerator"];return{findEmail:i,singleFields:a,retrieveAllowedFields:e}}(),_createClass=function(){function n(n,t){for(var e=0;e<t.length;e++){var o=t[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}return function(t,e,o){return e&&n(t.prototype,e),o&&n(t,o),t}}(),RDErrorNotifier=function(){function n(t,e){_classCallCheck(this,n),this.requestStatus=t,this.requestBody=e}return _createClass(n,[{key:"notify",value:function(){var n=JSON.stringify({status:this.requestStatus,body:this.requestBody});jQuery.ajax({type:"POST",url:this.URL,data:n,dataType:"json",crossDomain:!0})}}]),n}();RDErrorNotifier.prototype.URL="https://qtmlugypw3.execute-api.us-east-1.amazonaws.com/production";var RDIntegrationCreditCard=function(){function n(n){var t,e,o,r=0,i=0;if("string"!=typeof n)return!1;if(e=n.replace(/\D/g,""),(o=e.length)<14)return!1;for(;o--;)t=parseInt(e.charAt(o),10)<<i,r+=t-9*(t>9),i^=1;return r%10==0&&r>0}return{validNumber:n}}();"undefined"!=typeof module&&module.hasOwnProperty("exports")&&(module.exports=RDIntegrationCreditCard);var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},FieldMapping=function(){function n(){f=[]}function t(n){var t=void 0,e=void 0,o=n.getAttribute("name"),r=/\[/g,i=/\]/g;return!!o&&(t=o.replace(r,"_"),e=t.replace(i,""),"checkbox"===n.type?e+"[]":e)}function e(n){var t=jQuery('label[for="'+n.id+'"]')[0],e=jQuery(n).closest("label")[0],o=t||e;return!!o&&o.innerText.trim()}function o(n,o){var r=o.getAttribute("type"),i="Field "+n+" "+r;return t(o)||e(o)||o.getAttribute("id")||i}function r(n){jQuery(n).map(function(n,t){return f.push({name:o(n,t),value:t.value,type:t.type}),!1})}function i(n){r(FormFields.singleFields(n[0]))}function a(n){var t=n.find(":checkbox:checked[name]").clone();t.each(function(n,t){t.name=t.name.split(".")[0]}),r(t)}function u(n){r(n.find(":radio:checked"))}function c(t){return n(),i(t),a(t),u(t),f}var f=[];return{mapFields:c}}(),RdIntegrationIdentifier=function(){function n(n){var t=n[0].action;return"object"===(void 0===t?"undefined":_typeof(t))?t.value:void 0!==t?t:""}function t(t){var e,o=!1,r=["squarespace.com","realty_ajax_shortcode_contact_form"];for(e=0;e<r.length;e+=1)n(t).indexOf(r[e])>-1&&(o=!0);return o}function e(n){return!t(n)&&n.attr("id")}function o(n){var t="/"===window.location.pathname?"home":window.location.pathname;return n.attr("name")||e(n)||t}return{identifier:o}}(),RdIntegration=function(){var n,t,e,o,r,i,a=function(n){"undefined"==typeof jQuery?f("https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js",n):n()},u=function(n,t,e){a(function(){i=jQuery,c(n,t,e),l(),C()})},c=function(n,r,i){o=i||{},t=n,e=r},f=function(n,t){var e=document.getElementsByTagName("head")[0],o=document.createElement("script");o.type="text/javascript",o.src=n,o.onload=t,o.onreadystatechange=function(){"complete"===this.readyState&&t()},e.appendChild(o)},l=function(){i(":submit").click(s)},s=function(t){if(r=h(),n=d(t.target)){var e=FormFields.retrieveAllowedFields(n);if(FormFields.findEmail(e)){var o=m(e);("function"!=typeof n[0].checkValidity||n[0].checkValidity())&&(k(o,g),t.preventDefault())}}},d=function(n){return i(n).closest("form:not([data-internal-rdstation-form])")},m=function(n){var t=p(n);return t.push(r.identifier,r.token,b()),t},p=function(n){return o.fieldMapping&&(n=v(n)),n},v=function(n){return i.each(n,function(){var n=o.fieldMapping[this.name];n&&(this.name=n)}),n},g=function(){y(n)?n.submit():n.find(":submit").unbind("click",s).click()},y=function(n){var t=n.attr("action");return void 0!==t&&""!==t.trim()},h=function(){return{identifier:{name:"identificador",value:e},token:{name:"token_rdstation",value:t}}},_=function(n){var t,e,o=document.cookie.split(";");for(n+="=",t=0;t<o.length;t++){for(e=o[t];" "===e.charAt(0);)e=e.substring(1,e.length);if(0===e.indexOf(n))return e.substring(n.length,e.length)}return null},b=function(){return{name:"query_params",value:location.search.substring(1)}},w=function(){var n=_("rdtrk");if(null!==n)return n=JSON.parse(unescape(n)),n.id},j=function(n){var t=w();return void 0!==t&&n.push({name:"client_id",value:t}),n},F=function(n){var t=_("__utmz"),e=_("__trf.src");return t&&n.push({name:"c_utmz",value:t}),e&&n.push({name:"traffic_source",value:e}),n},S=function(n,t){return n.push({name:"_is",value:t}),n},k=function(n,t,e){var o,r;e=e||3,o=10===e?"form-integrations":"conversions",n=j(n),n=F(n),n=S(n,e),a(function(){jQuery.ajax({type:"POST",url:"https://www.rdstation.com.br/api/1.3/"+o,data:n,crossDomain:!0,xhrFields:{withCredentials:!0},warn:function(n){console.log("ERROR - "),console.log(n)},complete:function(e,o){if(e.status>=500)return r=new RDErrorNotifier(e.status,n),void r.notify();t&&t(e,o)},beforeSend:function(){}})})},C=function(){!0===o.debugMode&&I()},I=function(){a(function(){i=jQuery,o=o||{},console.info("Iniciando");var n=i(_getElementSubmit()),t=d(n);0===n.length?console.warn("Nenhum botao de submit encontrado"):console.info("Botoes de submit encontrados: "+n.length),0===t.length?console.warn("Nenhum formulario encontrado"):console.info("Formularios encontrados: "+t.length),R(t),console.info("Finalizado")})},R=function(n){r=h(),i.each(n,function(n,t){var e=m(t),o=[];console.log(""),console.info(n+1+" formulario"),FormFields.findEmail(t)?console.info("Campo de email encontrado"):console.warn("Campo de email nao encontrado"),i.each(e,function(n,t){o.push(t.name)}),console.info("Campos mapeados: "+o.join(", "))}),console.log("")},x=function(n,e){o=e||{},t=n,a(function(){localStorage.getItem("RdIntegrationFormData")&&q(),Q()})},Q=function(){var n=jQuery('form:not(:has(input[name="_is"]))');jQuery(n).submit(D)},D=function(n){var t=jQuery(n.target).closest("form"),o=FieldMapping.mapFields(t);FormFields.findEmail(o)&&(e=RdIntegrationIdentifier.identifier(t),O(o))},O=function(n){n=E(n),N(n),k(n,function(n){A(n)},10)},E=function(n){return n.push({name:"identificador",value:e},{name:"token_rdstation",value:t},{name:"form_url",value:location.href.split("?")[0]},{name:"page_title",value:document.title}),n},N=function(n){localStorage.setItem("RdIntegrationFormData",JSON.stringify(n))},q=function(){var n=JSON.parse(localStorage.getItem("RdIntegrationFormData"));k(n,function(n){A(n)},10)},A=function(n){4===n.readyState&&localStorage.removeItem("RdIntegrationFormData")};return{integrate:u,post:k,analyse:I,integrateAll:x}}();