!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var r=e();for(var n in r)("object"==typeof exports?exports:t)[n]=r[n]}}(window,(function(){return function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=18)}([function(t,e){t.exports=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},function(t,e){function r(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}t.exports=function(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t}},function(t,e,r){var n=r(9),o=r(10),i=r(11),a=r(13);t.exports=function(t,e){return n(t)||o(t,e)||i(t,e)||a()}},function(t,e){t.exports=function(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}},function(t,e,r){var n=r(14),o=r(15),i={};for(var a in n)n.hasOwnProperty(a)&&(i[n[a]]=a);var u=t.exports={to:{},get:{}};function l(t,e,r){return Math.min(Math.max(e,t),r)}function s(t){var e=t.toString(16).toUpperCase();return e.length<2?"0"+e:e}u.get=function(t){var e,r;switch(t.substring(0,3).toLowerCase()){case"hsl":e=u.get.hsl(t),r="hsl";break;case"hwb":e=u.get.hwb(t),r="hwb";break;default:e=u.get.rgb(t),r="rgb"}return e?{model:r,value:e}:null},u.get.rgb=function(t){if(!t)return null;var e,r,o,i=[0,0,0,1];if(e=t.match(/^#([a-f0-9]{6})([a-f0-9]{2})?$/i)){for(o=e[2],e=e[1],r=0;r<3;r++){var a=2*r;i[r]=parseInt(e.slice(a,a+2),16)}o&&(i[3]=Math.round(parseInt(o,16)/255*100)/100)}else if(e=t.match(/^#([a-f0-9]{3,4})$/i)){for(o=(e=e[1])[3],r=0;r<3;r++)i[r]=parseInt(e[r]+e[r],16);o&&(i[3]=Math.round(parseInt(o+o,16)/255*100)/100)}else if(e=t.match(/^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/)){for(r=0;r<3;r++)i[r]=parseInt(e[r+1],0);e[4]&&(i[3]=parseFloat(e[4]))}else{if(!(e=t.match(/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/)))return(e=t.match(/(\D+)/))?"transparent"===e[1]?[0,0,0,0]:(i=n[e[1]])?(i[3]=1,i):null:null;for(r=0;r<3;r++)i[r]=Math.round(2.55*parseFloat(e[r+1]));e[4]&&(i[3]=parseFloat(e[4]))}for(r=0;r<3;r++)i[r]=l(i[r],0,255);return i[3]=l(i[3],0,1),i},u.get.hsl=function(t){if(!t)return null;var e=t.match(/^hsla?\(\s*([+-]?(?:\d*\.)?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/);if(e){var r=parseFloat(e[4]);return[(parseFloat(e[1])+360)%360,l(parseFloat(e[2]),0,100),l(parseFloat(e[3]),0,100),l(isNaN(r)?1:r,0,1)]}return null},u.get.hwb=function(t){if(!t)return null;var e=t.match(/^hwb\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/);if(e){var r=parseFloat(e[4]);return[(parseFloat(e[1])%360+360)%360,l(parseFloat(e[2]),0,100),l(parseFloat(e[3]),0,100),l(isNaN(r)?1:r,0,1)]}return null},u.to.hex=function(){var t=o(arguments);return"#"+s(t[0])+s(t[1])+s(t[2])+(t[3]<1?s(Math.round(255*t[3])):"")},u.to.rgb=function(){var t=o(arguments);return t.length<4||1===t[3]?"rgb("+Math.round(t[0])+", "+Math.round(t[1])+", "+Math.round(t[2])+")":"rgba("+Math.round(t[0])+", "+Math.round(t[1])+", "+Math.round(t[2])+", "+t[3]+")"},u.to.rgb.percent=function(){var t=o(arguments),e=Math.round(t[0]/255*100),r=Math.round(t[1]/255*100),n=Math.round(t[2]/255*100);return t.length<4||1===t[3]?"rgb("+e+"%, "+r+"%, "+n+"%)":"rgba("+e+"%, "+r+"%, "+n+"%, "+t[3]+")"},u.to.hsl=function(){var t=o(arguments);return t.length<4||1===t[3]?"hsl("+t[0]+", "+t[1]+"%, "+t[2]+"%)":"hsla("+t[0]+", "+t[1]+"%, "+t[2]+"%, "+t[3]+")"},u.to.hwb=function(){var t=o(arguments),e="";return t.length>=4&&1!==t[3]&&(e=", "+t[3]),"hwb("+t[0]+", "+t[1]+"%, "+t[2]+"%"+e+")"},u.to.keyword=function(t){return i[t.slice(0,3)]}},function(t,e,r){(function(e){var r=/^\s+|\s+$/g,n=/^[-+]0x[0-9a-f]+$/i,o=/^0b[01]+$/i,i=/^0o[0-7]+$/i,a=parseInt,u="object"==typeof e&&e&&e.Object===Object&&e,l="object"==typeof self&&self&&self.Object===Object&&self,s=u||l||Function("return this")(),c=Object.prototype.toString,f=Math.max,p=Math.min,h=function(){return s.Date.now()};function y(t,e,r){var n,o,i,a,u,l,s=0,c=!1,y=!1,g=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function b(e){var r=n,i=o;return n=o=void 0,s=e,a=t.apply(i,r)}function v(t){return s=t,u=setTimeout(w,e),c?b(t):a}function O(t){var r=t-l;return void 0===l||r>=e||r<0||y&&t-s>=i}function w(){var t=h();if(O(t))return k(t);u=setTimeout(w,function(t){var r=e-(t-l);return y?p(r,i-(t-s)):r}(t))}function k(t){return u=void 0,g&&n?b(t):(n=o=void 0,a)}function j(){var t=h(),r=O(t);if(n=arguments,o=this,l=t,r){if(void 0===u)return v(l);if(y)return u=setTimeout(w,e),b(l)}return void 0===u&&(u=setTimeout(w,e)),a}return e=m(e)||0,d(r)&&(c=!!r.leading,i=(y="maxWait"in r)?f(m(r.maxWait)||0,e):i,g="trailing"in r?!!r.trailing:g),j.cancel=function(){void 0!==u&&clearTimeout(u),s=0,n=l=o=u=void 0},j.flush=function(){return void 0===u?a:k(h())},j}function d(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function m(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&"[object Symbol]"==c.call(t)}(t))return NaN;if(d(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=d(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(r,"");var u=o.test(t);return u||i.test(t)?a(t.slice(2),u?2:8):n.test(t)?NaN:+t}t.exports=function(t,e,r){var n=!0,o=!0;if("function"!=typeof t)throw new TypeError("Expected a function");return d(r)&&(n="leading"in r?!!r.leading:n,o="trailing"in r?!!r.trailing:o),y(t,e,{leading:n,maxWait:e,trailing:o})}}).call(this,r(17))},function(t,e){function r(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=r=function(t){return typeof t}:t.exports=r=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(e)}t.exports=r},function(t,e){class r{constructor(t,e){this.$element=t,this.attr=e,this._functionObject=this._getFunctions(this._getValue(t,e))}_getValue(t,e){return t.style[e]}_setValue(t){this.$element.style[this.attr]=t}_getValueFromObject(t){let e="";return Object.keys(t).forEach(r=>{e+=`${r}(${t[r].join(", ")}) `}),e.substring(0,e.length-1)}_getFunctions(t){const e=t.split(/(\w+)\((.*?)\)/);let r={};for(let t=1;t<e.length;t+=3)r[e[t]]=e[t+1].replace(" ","").split(",");return r}get(){return this._getValue(this.$element,this.attr)}add(t,e,r=!0){return this.exists(t)?!!r&&(this.update(t,e),!0):("string"==typeof e&&(e=[e]),this._functionObject[t]=e,this._setValue(this._getValueFromObject(this._functionObject)),!0)}update(t,e,r=!0){return this.exists(t)?("string"==typeof e&&(e=[e]),this._functionObject[t]=e,this._setValue(this._getValueFromObject(this._functionObject)),!0):!!r&&(this.add(t,e),!0)}delete(t){return!!this.exists(t)&&(delete this._functionObject[t],this._setValue(this._getValueFromObject(this._functionObject)),!0)}exists(t){return this._functionObject.hasOwnProperty(t)}}t.exports=(t,e)=>new r(t,e)},function(t,e,r){const n=r(4),o=t=>{const e=n.get.rgb(t);return{r:e[0],g:e[1],b:e[2],a:e[3]}};t.exports=t=>{let e,r;t=o(t),this.toColor=r=>(r=o(r),e={r:r.r-t.r,g:r.g-t.g,b:r.b-t.b},{withPercent:i});const i=n=>{const o=n/100;return r={r:t.r+Math.floor(e.r>0?e.r*o:- -e.r*o),g:t.g+Math.floor(e.g>0?e.g*o:- -e.g*o),b:t.b+Math.floor(e.b>0?e.b*o:- -e.b*o)},{get:a}},a=t=>{if(!t)return r;if(-1!==Object.keys(n.to).indexOf(t))return n.to[t]([r.r,r.g,r.b]);throw new Error(`Unknown type '${t}'`)};return this}},function(t,e){t.exports=function(t){if(Array.isArray(t))return t}},function(t,e){t.exports=function(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var r=[],n=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(n=(a=u.next()).done)&&(r.push(a.value),!e||r.length!==e);n=!0);}catch(t){o=!0,i=t}finally{try{n||null==u.return||u.return()}finally{if(o)throw i}}return r}}},function(t,e,r){var n=r(12);t.exports=function(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(r):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}},function(t,e){t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}},function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},function(t,e,r){"use strict";t.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}},function(t,e,r){"use strict";var n=r(16),o=Array.prototype.concat,i=Array.prototype.slice,a=t.exports=function(t){for(var e=[],r=0,a=t.length;r<a;r++){var u=t[r];n(u)?e=o.call(e,i.call(u)):e.push(u)}return e};a.wrap=function(t){return function(){return t(a(arguments))}}},function(t,e){t.exports=function(t){return!(!t||"string"==typeof t)&&(t instanceof Array||Array.isArray(t)||t.length>=0&&(t.splice instanceof Function||Object.getOwnPropertyDescriptor(t,t.length-1)&&"String"!==t.constructor.name))}},function(t,e){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(t){"object"==typeof window&&(r=window)}t.exports=r},function(t,e,r){"use strict";r.r(e);var n=r(0),o=r.n(n),i=r(1),a=r.n(i),u=r(3),l=r.n(u),s=r(2),c=r.n(s),f=function(t,e,r){return(r-=t)/(e-=t)*100},p=function(t,e,r,n){var o=t+(e-t)*r/100;return n?function(t,e){return e?Math.floor(t*Math.pow(10,e))/Math.pow(10,e):t}(o,n):o},h=r(4),y=r.n(h),d=function(t){return"The value for the '".concat(t,"' property must be a number, string or object")},m=function(){return"Property value not specified"},g=function(t){return"Keyframe percent '".concat(t,"' is not a valid number")},b=function(){return"No value specified"},v=function(t,e){return"Previous unit '".concat(t,"' does not match current unit '").concat(e,"'")},O=function(t,e){return"'to' unit ('".concat(t,"') does not match 'from' unit ('").concat(e,"')")},w=function(){return"Keyframe property 'to' must be set"},k=function(){return"The provided animation object is not an instance of Motus.Animation"},j=function(){return"No keyframes specified"},_=function(){return"Unexpected error"},P=function(t){return"".concat(t," is not a valid html element")},x=function(){return"No animation found. Have you attached the animation with Motus.addAnimation ?"},S=function(t){for(var e=arguments.length,r=new Array(e>1?e-1:0),n=1;n<e;n++)r[n-1]=arguments[n];throw new Error(t.apply(void 0,r))};function A(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function V(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?A(Object(r),!0).forEach((function(e){l()(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):A(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var N={matrix:{defaultValue:[0,0,0,0,0,0]},matrix3d:{defaultValue:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},translate:{defaultValue:["0px","0px"]},translate3d:{defaultValue:["0px","0px","0px"]},translateX:{defaultValue:"0px"},translateY:{defaultValue:"0px"},translateZ:{defaultValue:"0px"},scale:{defaultValue:[1]},scale3d:{defaultValue:[1,1,1]},scaleX:{defaultValue:1},scaleY:{defaultValue:1},scaleZ:{defaultValue:1},rotate:{defaultValue:["0deg"]},rotate3d:{defaultValue:[0,"0deg","0deg","0deg"]},rotateX:{defaultValue:"0deg"},rotateY:{defaultValue:"0deg"},rotateZ:{defaultValue:"0deg"},skew:{defaultValue:["0deg"]},skewX:{defaultValue:["0deg"]},skewY:{defaultValue:["0deg"]},perspective:{defaultValue:0}},$={blur:{defaultValue:["0px"]},brightness:{defaultValue:["100%"]},contrast:{defaultValue:["100%"]},hueRotate:{defaultValue:["0deg"]},grayscale:{defaultValue:["0%"]},invert:{defaultValue:["0%"]},saturate:{defaultValue:["100%"]},sepia:{defaultValue:["0%"]}};Object.keys(N).forEach((function(t){return N[t]=V({},N[t],{functionName:"transform"})})),Object.keys($).forEach((function(t){return $[t]=V({},$[t],{functionName:"filter"})}));var E=V({},N,{},$),M=function(t){return t===window?{width:window.innerWidth,height:window.innerHeight}:{width:t.clientWidth,height:t.clientHeight}},T=function t(e){if(z(e))return e.map(t);if(e=String(e),y.a.get(e)){var r=y.a.get.rgb(e);return[y.a.to.rgb(r),"COLOR_UNIT"]}var n=e.match(/([-0-9.]+)(cm|mm|in|px|pt|pc|em|ex|ch|%|rem|vw|vh|vmin|vmax|deg)*/);if(n&&3===n.length)return[parseFloat(n[1]),n[2]||"NO_UNIT"];S(b)},F=function t(e){var r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return e?void 0===e.offsetLeft?t(e.parentElement,r):t(e.offsetParent,r)+(r?e.offsetLeft:e.offsetTop):0},I=function(t){return t.replace(/([A-Z])/g,(function(t){return"-"+t.toLowerCase()}))},D=r(6),K=r.n(D),U=function(t){return"number"==typeof t},C=function(t){return"string"==typeof t},z=function(t){return Array.isArray(t)},L=function(t){return t instanceof Element},B=function(t){return 0===t||!!t};function q(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}var H=function(){function t(){o()(this,t)}return a()(t,null,[{key:"normalize",value:function(t,e){var r=this;return Array.isArray(t)&&(t=this._arrayToObject(t)),Object.keys(t).length||S(j),Object.keys(t).forEach((function(n){var o;(!U(o=n)&&!C(o)||isNaN(o))&&S(g,n);var i=t[n];Object.keys(i).forEach((function(o){var i=r._normalizeKeyframeRule(o,n,t,e);t[n]=function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?q(Object(r),!0).forEach((function(e){l()(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):q(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({},t[n],l()({},o,i))}))})),t}},{key:"_normalizeKeyframeRule",value:function(t,e,r,n){var o,i,a,u,l=r[e][t];if(B(l)||S(m),U(l)){var s=this._normalizeNumberValue(t,e,r,n),f=c()(s,3);o=f[0],i=f[1],a=f[2]}else if(C(l)){var p=this._normalizeStringValue(t,e,r,n),h=c()(p,3);o=h[0],i=h[1],a=h[2]}else if(z(l)){o=this._previousKeyframeProperty(t,e,r,n),i=T(l)}else if(u=l,"object"===K()(u)){var y=this._normalizeObjectValue(t,e,r,n),g=c()(y,3);o=g[0],i=g[1],a=g[2]}else S(d,t);return{from:o,to:i,unit:a}}},{key:"_arrayToObject",value:function(t){return 1===t.length?{100:t[0]}:t.reduce((function(e,r,n){return e[Math.floor(n/(t.length-1)*100)]=r,e}),{})}},{key:"_getPreviousKeyframe",value:function(t,e){var r,n,o,i=Object.keys(t);return n=e,!(!(o=(r=(r=i).map((function(t){return parseInt(t)})))[r.indexOf(parseInt(n))-1])&&0!==o)&&o}},{key:"_previousKeyframeProperty",value:function(t,e,r,n){var o=this._getPreviousKeyframe(r,e);if(!1===o)return T(function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:window;return E[e]?E[e].defaultValue:r.getComputedStyle(t,null).getPropertyValue(I(e))}(n,t));var i=r[o][t];return i?z(i.to)?i.to:[i.to,i.unit]:this._previousKeyframeProperty(t,o,r,n)}},{key:"_normalizeNumberValue",value:function(t,e,r,n){var o=r[e][t],i=this._previousKeyframeProperty(t,e,r,n),a=c()(i,2);return[a[0],o,a[1]]}},{key:"_normalizeStringValue",value:function(t,e,r,n){var o=r[e][t],i=T(o),a=c()(i,2),u=a[0],l=a[1],s=this._previousKeyframeProperty(t,e,r,n),f=c()(s,2),p=f[0],h=f[1];return h!==l&&S(v,h,l),[p,u,l]}},{key:"_normalizeObjectValue",value:function(t,e,r,n){var o=r[e][t],i=o.from,a=o.to,u=o.unit,l=this._previousKeyframeProperty(t,e,r,n),s=c()(l,2),f=s[0],p=s[1];B(a)||S(w);var h=B(i)?T(i):[f,p],y=c()(h,2),d=y[0],m=y[1],g=T(a),b=c()(g,2),v=b[0],k=b[1];return u||m!==k&&S(O,k,m),B(u)||(u=p),[d,v,u]}}]),t}(),R=function(){function t(){o()(this,t)}return a()(t,null,[{key:"getPxFromPoint",value:function(t,e,r){var n=F(e,r)||0,o=F(t,r)-n;return L(t)?o:t}},{key:"getDistanceFromParent",value:function(t,e,r){var n=e===window?0:F(e,r);return F(t,r)-n}}]),t}(),W=r(7),X=r.n(W),Y=function(){function t(e){o()(this,t),this.$el=e}return a()(t,[{key:"apply",value:function(t,e,r){E[t]&&this._applyArray(t,[e+r]),U(e)&&this._applyNumber(t,e,r),C(e)&&this._applyString(t,e),z(e)&&this._applyArray(t,e)}},{key:"_getStyle",value:function(t){return this.$el.style[t]}},{key:"_setStyle",value:function(t,e){this.$el.style[t]=e}},{key:"removeAll",value:function(){this.$el.style=""}},{key:"_applyNumber",value:function(t,e,r){r&&"NO_UNIT"!==r&&(e+=r),this._setStyle(t,e)}},{key:"_applyString",value:function(t,e){this._applyNumber(t,e)}},{key:"_applyArray",value:function(t,e){var r=E[t].functionName;e=e.map((function(t){return z(t)?"NO_UNIT"===t[1]?t[0]:t[0]+t[1]:t})),X()(this.$el,r).add(t,e)}}]),t}(),Z=r(8),G=r.n(Z);function J(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function Q(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?J(Object(r),!0).forEach((function(e){l()(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):J(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var tt=function(){function t(e,r){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};o()(this,t),this.options=Q({},t.defaultOptions,{},n),this.keyframes=e,this.elementStyles=new Y(r)}return a()(t,[{key:"_getCurrentKeyframesPercent",value:function(t){for(var e=this.keyframes,r=Object.keys(e),n=0;n<r.length;n++){if(t===parseInt(r[n]))return[r[n-1]||"0",r[n]];if(t>r[n]&&t<r[n+1])return[r[n],r[n+1]]}return r[0]>t?["0",r[0]]:r[r.length-1]<t?[]:void 0}},{key:"applyAnimations",value:function(t){var e=this,r=this._getCurrentKeyframesPercent(t);if(r.length){var n=c()(r,2),o=n[0],i=n[1],a=Math.floor(f(o,i,t));Object.keys(this.keyframes).forEach((function(t){parseInt(t)<parseInt(i)&&e._applyKeyframe(e.keyframes[t],100)})),this._applyKeyframe(this.keyframes[i],a)}}},{key:"applyNoAnimations",value:function(){this.elementStyles.removeAll(),this.keyframes[0]&&this._applyKeyframe(this.keyframes[0],100)}},{key:"applyAllAnimations",value:function(){var t=this;Object.keys(this.keyframes).forEach((function(e){return t._applyKeyframe(t.keyframes[e],100)}))}},{key:"_applyKeyframe",value:function(t,e){var r=this;Object.keys(t).forEach((function(n){var o=t[n],i=o.from,a=o.to,u=o.unit;U(i)&&U(a)?r._applyNumberValues(n,i,a,"NO_UNIT"===u?"":u,e):"COLOR_UNIT"===u?r._applyColorValues(n,i,a,e):z(i)&&z(a)?r._applyArrayValues(n,i,a,e):S(_)}))}},{key:"_applyNumberValues",value:function(t,e,r,n,o){var i=this.elementStyles,a=this.options,u=p(e,r,o,a.precision);i.apply(t,u,n)}},{key:"_applyColorValues",value:function(t,e,r,n){var o=this.elementStyles,i=G()(e).toColor(r).withPercent(n).get("rgb");o.apply(t,i)}},{key:"_applyArrayValues",value:function(t,e,r,n){for(var o=this.elementStyles,i=Math.min(e.length,r.length),a=[],u=0;u<i;u++)a[u]=[],a[u][0]=p(e[u][0],r[u][0],n,this.options.precision),a[u][1]=r[u][1];o.apply(t,a)}}]),t}();l()(tt,"defaultOptions",{precision:1});var et=r(5),rt=r.n(et);function nt(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}var ot=function(){function t(e){var r=this;o()(this,t),this.uid=Math.random().toString(36).substr(2,9),this.options=function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?nt(Object(r),!0).forEach((function(e){l()(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):nt(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({},t.defaultOptions,{},e),this.$el=this.options.$el,L(this.$el)||S(P,this.$el),this.keyframes=H.normalize(this.options.keyframes,this.options.$el),this.started=this.options.started,this.appliedAllBefore=!1,this.appliedAllAfter=!1,this._animator=new tt(this.keyframes,this.options.$el),this._compute=rt()(this.__compute,this.options.throttle),this._computePositions(this.options.startPoint,this.options.endPoint);var n=rt()(this._computePositions.bind(this),this.options.throttle);window.addEventListener("resize",(function(){return n(r.options.startPoint,r.options.endPoint)}))}return a()(t,[{key:"getUid",value:function(){return this.uid}},{key:"isStarted",value:function(){return this.started}},{key:"start",value:function(){var t=this.options;this.started||(t.$scrollElement.addEventListener("scroll",this._compute.bind(this)),this.options.onStart&&this.options.onStart(),this.started=!0,this._compute())}},{key:"stop",value:function(){var t=this.started,e=this.options;t&&(e.$scrollElement.removeEventListener("scroll",this._compute),this.options.onStop&&this.options.onStop(),this.started=!1)}},{key:"_getScrollPosition",value:function(){var t=this.options,e=t.horizontal;return function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return t===window?e?t.scrollX:t.scrollY:e?t.scrollLeft:t.scrollTop}(t.$scrollElement,e)}},{key:"_computePositions",value:function(t,e){var r=this.options,n=r.$scrollElement,o=r.horizontal;B(t)&&!z(t)?this.startPoint=R.getPxFromPoint(t,n,o):(this.startPoint=R.getDistanceFromParent(this.$el,n,o)-M(n)[o?"width":"height"],z(t)&&(this.startPoint+=t[0])),B(e)&&!z(e)?this.endPoint=R.getPxFromPoint(e,n,o):(this.endPoint=R.getDistanceFromParent(this.$el,n,o)+M(this.$el)[o?"width":"height"],z(e)&&(this.endPoint+=e[0]))}},{key:"__compute",value:function(){var t=this.options,e=t.onScrollBefore,r=t.onScrollAfter,n=t.onScrollBetween,o=t.onScroll,i=t.onHitTop,a=t.onHitBottom,u=this.startPoint,l=this.endPoint;if(this.started){var s=this._getScrollPosition();if(o&&o(s),s>u&&s<l){this.appliedAllBefore=!1,this.appliedAllAfter=!1;var c=f(u,l,s);this._animator.applyAnimations(c),n&&n(s,c)}else s<u?(e&&e(s),this.appliedAllBefore||(i&&i(),this.appliedAllBefore=!0,this._animator.applyNoAnimations())):s>l&&(r&&r(s),this.appliedAllAfter||(a&&a(),this.appliedAllAfter=!0,this._animator.applyAllAnimations()))}}}]),t}();l()(ot,"defaultOptions",{startPoint:null,endPoint:null,$el:null,keyframes:[],precision:tt.defaultOptions.precision,throttle:10,$scrollElement:window,horizontal:!1,onScroll:null,onScrollBetween:null,onScrollBefore:null,onScrollAfter:null,onHitTop:null,onHitBottom:null,onStart:null,onStop:null,started:!1});var it=ot,at=new(function(){function t(){o()(this,t),this.Animation=it,this.Point=R,this._animations=[],this.NO_UNIT="NO_UNIT",this.COLOR_UNIT="COLOR_UNIT"}return a()(t,[{key:"addAnimation",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];t instanceof this.Animation?(this._animations.push(t),e&&t.start()):S(k)}},{key:"clearAnimation",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];t instanceof this.Animation||S(k);var r=this._animations.findIndex((function(e){return t.getUid()===e.getUid()}));-1===r&&S(x),e&&this._animations[r].stop(),this._animations.splice(r,1)}},{key:"clearAnimations",value:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];t&&this._animations.forEach((function(t){return t.stop()})),this._animations=[]}}]),t}());"undefined"!=typeof window&&(window.Motus=at);e.default=at}])}));
