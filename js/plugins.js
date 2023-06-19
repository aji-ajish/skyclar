var TRUTH = [true, 1, 'true', 't', 'on', 'yes', 'y'],
  NULL = [null, undefined, 'null', 'undefined', ''],
  kb = {
    TAB: 9,
    ESC: 27,
    ENTER: 13,
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
  };

/**
 * @name String.toTitleCase
 * @version 2.0.0
 */
String.prototype.toTitleCase = String.prototype.toTitleCase || function () {
  return this.toLowerCase().replace(/\b([a-z])/g, function (_, s) {
    return s.toUpperCase();
  });
};

/**
 * @name stringToJSON
 * @version 1.0.0
 */
function stringToJSON(s) { return JSON.parse(s.replace(/(\b[a-z]+:)?(\b[a-z]+\b)/gi, '"$2"')); };
function getBoolean(a) { a = typeof a === "string" ? a.toLowerCase() : a; return TRUTH.some(function (t) { return t === a; }); }
function isNull(v) { return (v === null || v === 'null' || v === '' || v === undefined || v === 'undefined'); }
function onlyUnique(value, index, self) { return self.indexOf(value) === index; }
function abs(n) { return Math.abs(n); }
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive 
}
function getRandomStr(l) {
  l = l || 8;
  return Math.random().toString(36).substr(2, l);
}

/**
 * @name appUID
 * @returns {string} UID
 */
function appUID() {
  var ts = new Date().valueOf();
  return getRandomStr() + '_' + ts + '_' + getRandomInt(4000, 99999);
}

function replaceAll(arr, regex, unique) {
  unique = unique ? getBoolean(unique) : true;
  $.each(arr, function (i, el) {
    arr[i] = el.replace(regex, '');
  });
  return (unique) ? arr.filter(onlyUnique) : arr;
  // EXAMPLE
  // var arr = 't{{e}}mp{{l}}a{{te}}'.match(/{{\s*.+?\s*}}/ig);
  // var map = replaceAll(/{{\s*.+?\s*}}/ig, /{{|}}/g);
  // Will find all {{...}} and get the inner text
}
function buildTemplate(template, data) {
  var map = replaceAll(template.match(/{{\s*.+?\s*}}/ig), /{{|}}/g);
  $.each(map, function (_i, el) {
    if (data[el] !== undefined) {
      template = template.replace(new RegExp('{{' + el + '}}', 'g'), data[el]);
    }
  });

  return template;
}

/**
 * @name themeManager
 * @param {*} color 
 */
function themeManager(color) {
  // console.log(name);
  color = color || CONFIG.theme;
  $('meta[name="theme-color"]').attr('content', color);
  $('meta[name="msapplication-navbutton-color"]').attr('content', color);
  $('meta[name="apple-mobile-web-app-status-bar-style"]').attr('content', color);
};

/**
 * @name UnitConversionPlugin
 * @version 1.0.0
 * @date 28-12-2021
 * @license MIT
 */
var units = {
  _baseFS: CONFIG.fontSize || 14,
  getBaseFontSize: function () {
    this._baseFS = parseInt($('html').css('font-size'));
    return this._baseFS;
  },
  getFontSize: function (el) {
    return parseInt($(el).css('font-size'));
  },
  pxToRem: function (px, bsFs) {
    bsFs = bsFs || this.getBaseFontSize();
    return px / bsFs;
  },
  remToPx: function (px, bsFs) {
    bsFs = bsFs || this.getBaseFontSize();
    return px * bsFs;
  },
  pxToEm: function (el) {
    return px / this.getFontSize(el);
  },
  emToPx: function (el) {
    return px * this.getFontSize(el);
  }
};

/**
 * @name getParameterByName
 * @param {string} name 
 * @returns {string}
 * @version 1.1.0
 */
function getParameterByName(name, sensitive) {
  sensitive = sensitive === undefined ? true : getBoolean(sensitive);
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var search = location.search;
  var regex = sensitive ? new RegExp("[\\?&]" + name + "=([^&#]*)") : new RegExp("[\\?&]" + name + "=([^&#]*)", "i"),
    results = regex.exec(search);
  // console.log({
  //   name,
  //   search,
  //   results,
  //   sensitive
  // });
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/**
 * @name isElemSupportsAttr
 * @param {HTML_Element} element 
 * @param {string} attribute 
 * @returns {boolean}
 */
function isElemSupportsAttr(element, attribute) {
  var test = document.createElement(element);
  if (attribute in test) {
    return true;
  } else {
    return false;
  }
}

/**
 * @name openFullscreen
 */
function openFullscreen() {
  var elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

/**
 * @name copyToClipBoard
 * @param {HTML_Element} obj 
 */
function copyToClipBoard(obj) {
  if (navigator.clipboard === undefined) {
    obj.select();
    obj.setSelectionRange(0, 99999);
    document.execCommand('copy');
  } else {
    navigator.clipboard.writeText(obj.value);
  }
}

/**
 * @name setLottieOptions
 * @param {*} opt 
 * @returns {}
 */
function setLottieOptions(opt) {
  // console.log(opt);
  opt = $.extend({
    loop: true,
    id: opt.key,
    autoplay: true
  }, opt);
  // console.log(opt);
  // opt.id = opt.id || opt.key;
  opt = Object.assign({
    renderer: 'svg',
    name: "lottieAnimation",
    loop: getBoolean(opt.loop),
    autoplay: getBoolean(opt.autoplay),
    container: document.getElementById('la-' + opt.id),
    path: CONFIG.root + '/lottie/' + opt.key + '.json'
  }, opt);
  // console.log(opt);
  return opt;
}

// /**
//  * @name noCaching
//  */
// function noCaching() {
//   $('[data-nocache="true"]').each(function (i, el) {
//     var d = new Date(),
//       ustr = getRandomStr(8) + '_' + getRandomInt(0, 99999) + '_',
//       uuid = ustr + d.getHours() + d.getMinutes() + d.getSeconds() + d.getMilliseconds() + d.getUTCMilliseconds();
//     if ($(el).attr('href')) {
//       // console.log($(el).attr('href'));
//       $(el).attr('href', $(el).attr('href') + '?rid=' + uuid);
//     }
//     if ($(el).attr('src')) {
//       // console.log($(el).attr('src'));
//       $(el).attr('src', $(el).attr('src') + '?rid=' + uuid);
//     }
//   });
// }
/**
 * @name cacheManager
 * @param { uuid, expires, type, key, format }
 * @returns cacheOB
 * @version 1.0.0
 */
function cacheManager(ob) {
  ob = Object.assign({
    key: 'cache',
    uuid: appUID(),
    type: 'minutes',
    expires: 30, // minutes
    format: 'YYYY-MM-DD hh:mm:ss a'
  }, ob);

  // console.log(ob);

  var d = new Date();
  var cache = localStorage.getItem(ob.key);
  var expires = moment(d).add(ob.expires, ob.type);
  var diff = expires.diff(moment(d));
  // console.log(time);

  // console.log('localstorage', { expiresIn });
  // moment('2021-10-26 01:22:00 pm', ob.format); //

  if (cache === null || cache === undefined) {
    cache = {
      uuid: ob.uuid,
      expires: expires.format(ob.format)
    };
    localStorage.setItem(ob.key, JSON.stringify(cache));
  } else {
    try {
      cache = JSON.parse(cache);
      expires = moment(cache.expires, ob.format);
    } catch {
      cache = {
        uuid: ob.uuid,
        expires: expires.format(ob.format)
      };
      localStorage.setItem(ob.key, JSON.stringify(cache));
    }
  }

  diff = expires.diff(moment(d));
  // console.log({ d: diff });
  if (diff <= 0) {
    console.log('Getting New Version from Server...');
    d = new Date();
    expires = moment(d).add(ob.expires, ob.type);

    cache = {
      uuid: appUID(),
      expires: expires.format(ob.format)
    };
    localStorage.setItem(ob.key, JSON.stringify(cache));
  }

  cache.diff = diff;

  return cache;
}

var noCaching = function () {
  var uuid = appUID(),
    cacheOB = cacheManager({
      uuid: uuid,
      expires: 30,
      key: 'cache',
      type: 'minutes'
    });

  // console.log({ cacheOB });
  if (cacheOB.diff <= 0) {
    $('[data-nocache="true"]').each(function (_i, el) {
      if ($(el).attr('href')) {
        $(el).attr('href', $(el).attr('href') + '?rid=' + appUID());
      }
      if ($(el).attr('src')) {
        $(el).attr('src', $(el).attr('src') + '?rid=' + appUID());
      }
    });
  } else {
    console.info(
      'Maybe its loaded from the CACHE...\n' +
      'Press Ctrl/Cmd + Shift + R or Clear the Browser Cache\n' +
      'OR wait till the next server refresh. Try after ' + cacheOB.expires + '.'
    );
  }
}

/**!
 * @name popup
 * @version 5.3.2-beta
 * @author Ajith S Punalur (ASP)
 * @method popup.init()
 * @method popup.open()
 * @method popup.close()
 * @method popup.reset()
 * @method popup.reInit()
 * @method popup.loader()
 * @method popup.refresh()
 * @method popup.setData()
 * @date 27-02-2023 (DD-MM-YYYY)
 * @license MIT
 */
var popup = {
  TOP: 0,
  LEFT: 0,
  LEVEL: 0,
  WIDTH: 50,
  HEIGHT: 50,
  CC: 'none transparent inlineMock',
  _error: { message: 'No Errors' },
  _events: {
    opening: function (_e) { },
    opened: function (_e) { },
    closing: function (_e) { },
    closed: function (_e) { },
    refresh: function (_e) { },
    reInit: function (_e) { },
    setter: function (_e) { }
  },
  isInline: function (ds) {
    return (ds.position === 'inline') ? true : false;
  },
  /**
   * @see popup.init width, height, top, left
   */
  init: function (w, h, t, l) {
    "use strict";
    // Dependency Check
    this._error.message = 'No Errors';
    try {
      if (TRUTH === undefined) { };
      if (NULL === undefined) { };
      if (kb === undefined) { };
      if (isNull === undefined) { };
      if (getBoolean === undefined) { };
      if (onlyUnique === undefined) { };
      if (getRandomInt === undefined) { };
      if (abs === undefined) { };
    } catch (err) {
      // console.log(err);
      this._error.message = err.message + "\n Hi DEV!,\nInclude the dependancies and RETRY...";
      console.error(this._error.message);
      return;
    }
    $('[data-popup]').each(function (_i, _el) {
      $(this).attr('tabindex', 0);
    });
    $('[data-modal].popup').each(function (_i, el) {
      var dataset = $(el).data(),
        ovClass = '',
        toggleclasses = " none transparent inlineMock ";
      dataset.level = parseInt(dataset.level) || 0;

      popup.LEVEL = (dataset.level !== undefined && typeof (dataset.level) === 'number') ? parseInt(dataset.level, 10) : 0;

      if (dataset.block === false) {
        ovClass = 'none';
      } else if (dataset.block === "transparent") {
        ovClass = 'transparent';
      } else {
        ovClass = '';
        if ($(el).closest('.modalOverlay').length > 0) {
          $(el).closest('.modalOverlay').removeClass(toggleclasses + ' ' + dataset.oClass + ' ' + popup.CC);
        }
      }
      if ($(el).closest('.modalOverlay').length < 1) {
        $(el).wrap('<div class="modalOverlay ' + ovClass + '"></div>');
      }
    });

    w = w || 50;
    h = h || 50;
    t = t || 0;
    l = l || 0;

    $('[data-popup]').off('click.popup').on('click.popup', function (_e) {
      popup.open('[data-modal="' + $(this).attr('data-popup') + ']', $(this).data());
    });

    $('.popup [data-hide]').off('click.popup').on('click.popup', function () {
      popup.close($(this).closest('.popup'));
    });
    $('[data-modal].popup').each(function (_i, el) {
      $(el).trigger("popup.init", $(el));
    });
  },
  /**
   * @method popup.open()
   * @param {*} obPop 
   * @param {*} w 
   * @param {*} h 
   */
  open: function (obPop, w, h) {
    "use strict";
    // console.log(obPop);

    var vArgs = Array.prototype.slice.call(arguments, 3),
      t = Array.prototype.slice.call(arguments, 4, 5),
      l = Array.prototype.slice.call(arguments, 5),
      ob,
      key,
      ovClass = '',
      modal = $(obPop).data('modal'),
      video = $(obPop).find('video'),
      dataset = vArgs[0] || $(obPop).data();
    // toggleclasses = "none transparent inlineMock",

    ob = obPop || '[data-modal=' + modal + '].popup:nth-of-type(1)';
    dataset.styles = dataset.styles || {};
    dataset.oClass = dataset.oClass || '';
    dataset.class = dataset.class || modal || '';
    dataset.animateIn = dataset.animateIn || '';
    dataset.animateOut = dataset.animateOut || '';
    dataset.position = dataset.position || 'center';
    dataset.level = parseInt(dataset.level, 10) || 0;
    dataset.modal = dataset.modal !== undefined ? getBoolean(dataset.modal) : true;
    dataset.block = dataset.block !== undefined ? getBoolean(dataset.block) : true;
    dataset.scroll = dataset.scroll !== undefined ? getBoolean(dataset.scroll) : false;

    dataset.events = (dataset.events === undefined || dataset.events === {}) ? popup._events : $.extend(popup._events, dataset.events);
    // $.extend(popup._events, dataset.events);

    // console.log(obPop, dataset);
    // callback before opening
    $(document).trigger($.Event('popup.opening'), $(obPop));
    $(obPop).trigger($.Event('popup.opening'), $(obPop));
    var cb = dataset.events.opening({
      target: $(obPop)[0],
      type: 'opening'
    });
    if (getBoolean(cb)) { return; }

    // console.log(dataset.level);
    popup.LEVEL = (dataset.level !== NaN && typeof (dataset.level) === 'number') ? parseInt(dataset.level, 10) : 0;

    if (dataset.block === false) {
      ovClass = 'none';
    } else if (dataset.block === "transparent") {
      ovClass = 'transparent';
    } else {
      ovClass = '';
    }

    $(obPop).closest('.modalOverlay').removeClass(ovClass + ' ' + dataset.oClass + ' ' + popup.CC);
    $(obPop).closest('.modalOverlay').addClass(ovClass + ' ' + dataset.oClass);

    // console.log(dataset);
    dataset.offsetX = !(dataset.hasOwnProperty("offsetX")) ? 0 : parseInt(dataset.offsetX, 10);
    dataset.offsetY = !(dataset.hasOwnProperty("offsetY")) ? 0 : parseInt(dataset.offsetY, 10);

    $(obPop).attr('data-offset-x', dataset.offsetX);
    $(obPop).attr('data-offset-y', dataset.offsetY);

    /**
     * @deprecated: InlineSetter
     */
    for (var i = 0; i < vArgs.length; i += 1) {
      // t = vArgs[i]
      for (key in vArgs[i]) {
        // console.log(key)
        if (vArgs[i].hasOwnProperty(key)) {
          if (key.match(/^xsource/)) {
            // console.log('xs');
            $(obPop).attr('data-xsource', true);
            $(obPop).find('.popContent').html('<iframe id="' + $(obPop).attr('id') + '_iframe" onload="popup.loader(\'' + obPop + '\',false)" src="' + vArgs[i][key] + '" frameborder="0"></iframe>');
          }
          // will be DEPRECATED on future versions
          // else if (key.match(/^setAttr/)) {
          //   tgt = key.replace(/^setAttr/, '').toLowerCase();
          //   //console.log(key + ' >>> ' + tgt);
          //   $(obPop).find('[data-get-attr-' + tgt + ']').attr(tgt, vArgs[i][key]);
          // } else if (key.match(/^setData/)) {
          //   tgt = key.replace(/^setData/, '').toLowerCase();
          //   // console.log(tgt, $(obPop).find('[data-get-data-' + tgt + ']'));
          //   // console.log(key + ' >>> ' + tgt);
          //   $(obPop).find('[data-get-data-' + tgt + ']').attr('data-' + tgt, vArgs[i][key]);
          // } else if (key.match(/^setText/)) {
          //   $(obPop).find('[data-get-text]').text(vArgs[i][key]);
          // } else if (key.match(/^setTemplate/)) {
          //   $(obPop).find('[data-get-template]').html(vArgs[i][key]);
          // }
          // --ENDS will be DEPRECATED on future versions
          else if (key.match(/^set/)) {
            // tgt = key.replace(/^set/, '').toLowerCase();
            // console.log(dataset[key]);
            try {
              var ds = JSON.parse(dataset[key].replace(/'/g, '"'));
            } catch (e) {
              // error
              if (typeof (dataset[key]) === 'object') {
                ds = dataset[key];
              } else if (typeof (dataset[key]) === 'string') {
                console.error('SYNTAX Error: Datatype Mismatch / Incorrect Data Format. \n ::: %s', dataset[key]);
                return;
              }
            }
            if (ds.datatype === 'JSON_encoded' && typeof ds.data === 'string') {
              if ($(ds.data).length > 0) {
                var json = hardDecode($(ds.data).val());
                // console.log(json);
                this.setData(obPop, json);
              } else {
                console.error('EXCEPTION: Datasource not found.');
              }
            } else if (ds.datatype === 'JSON_string') {
              var json = ds.data;
              // console.log(json);
              this.setData(obPop, json);
            } else if (ds.datatype === 'JSON_object' || typeof ds.data === 'object') {
              var json = ds.data;
              // console.log(json);
              this.setData(obPop, json);
            } else {
              console.error(json);
            }
          }
        }
      }
    }

    if (video) {
      $(video).each(function (_i, el) {
        if ($(el).data('autoplay') === true) {
          el.play();
        }
      });
    }
    // (Called on document.ready) popup.activate();
    if (dataset.units === 'px' || dataset.units === 'pixel') {
      // console.log('open : px', w, h, dataset.position)
      w = w || $(window).width() - 20;
      h = h || $(window).height() - 20;

      if (!(dataset.position === 'inline') || getBoolean(dataset.responsive) === true) {
        w = (w >= $(window).width()) ? $(window).width() : w;
        h = (h >= $(window).height()) ? $(window).height() : h;
      }

      // if (dataset.position === 'center') {
      //   t = (abs($(window).height() - h) / 2);
      //   l = (abs($(window).width() - w) / 2);
      // } else if (dataset.position === 'absolute') {
      //   t = (dataset.top > ($(window).height() - h)) ? $(window).height() - h : dataset.top;
      //   l = (dataset.left > ($(window).width() - w)) ? $(window).width() - w : dataset.left;
      // } else 
      if (dataset.position === 'inline') {
        var rel = dataset.relate,
          ww = $(document).width(),
          wh = $(document).height();
        if ($(rel).length > 0) {
          // console.log(dataset.offsetX);
          t = $(rel).offset().top + dataset.offsetY;
          l = $(rel).offset().left + dataset.offsetX;
          // console.log(t,l);
          // console.log("POPUP{\n left: %s,\n width: %s}\nWINDOW{width: %s}", l, w, ww);

          l = ((l + w) > ww) ? l - ((l + w) - ww) : l;
          t = ((t + h) > wh) ? t - ((t + h) - wh) : t;
        } else {
          t = popup.TOP;
          l = popup.LEFT;
          l = ((l + w) > ww) ? l - ((l + w) - ww) : l;
          t = ((t + h) > wh) ? t - ((t + h) - wh) : t;

          l = (l < 0) ? 0 : l;
          t = (t < 0) ? 0 : t;

          // DONT DELETE FOLLOWING COMMENTS > Needs to Check
          // t = $(this).offset().top + dataset.offsetY;
          // l = $(this).offset().left + dataset.offsetX;
        }

        $('body').css('position', 'relative');
        $(obPop).closest('.modalOverlay').addClass('inlineMock');
        popup.TOP = t;
        popup.LEFT = l;
      }
      // console.log(dataset);
      $(ob).attr({
        'data-width': w,
        'data-height': h,
        'data-units': 'px',
        'data-class': dataset.class,
        'data-styles': dataset.styles,
        'data-relate': dataset.relate,
        'data-top': t + dataset.offsetY,
        'data-left': l + dataset.offsetX,
        'data-offset-x': dataset.offsetX,
        'data-offset-y': dataset.offsetY,
        'data-animate-in': dataset.animateIn,
        'data-animate-out': dataset.animateOut,
        'data-position': dataset.position || 'center'
      });
    } else {
      //console.log('open : %')
      w = w || 50;
      h = h || 50;

      w = (w >= 100) ? 100 : w;
      h = (h >= 100) ? 100 : h;

      $(ob).attr({
        'data-top': t,
        'data-left': l,
        'data-width': w,
        'data-height': h,
        'data-units': '%',
        'data-class': dataset.class,
        'data-styles': dataset.styles,
        'data-animate-in': dataset.animateIn,
        'data-animate-out': dataset.animateOut,
        'data-position': dataset.position || 'center'
      });
    }

    popup.TOP = t;
    popup.LEFT = l;
    popup.WIDTH = w;
    popup.HEIGHT = h;

    // console.log(modal +" "+ w  +" "+ h);
    // console.log(modal +" "+ w  +" "+ h);
    // console.log(dataset);
    if (getBoolean(dataset.scroll) !== true) {
      $('html,body').addClass('modalOpen');
    } else if (dataset.block === undefined || dataset.block === 'transparent') {
      $('html,body').addClass('modalOpen');
    } else {
      $('html,body').addClass('modalOpen');
    }

    // if ((dataset.scroll === true && dataset.position === 'inline') && (dataset.block === true || dataset.block === undefined))
    if (getBoolean(dataset.scroll) === true) {
      $('html,body').removeClass('modalOpen');
    }

    if ($.trim(dataset.animateIn) !== '') {
      $(ob).addClass('open ' + dataset.class + ' animate__' + dataset.animateIn).css(dataset.styles);
      $(ob).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function (e) {
        if ($(e.target).is('.popup')) {
          $(ob).removeClass('animate__' + dataset.animateIn);
          popup.refresh();
        }
      }).parent('.modalOverlay').addClass('active ' + dataset.oClass).css({
        // 'display': 'block',
        // 'visibility': 'visible',
        'z-index': 1050 + dataset.level
      });
    } else {
      $(ob).addClass('open ' + dataset.class).parent('.modalOverlay').addClass('active ' + dataset.oClass).css($.extend({
        // 'display': 'block',
        // 'visibility': 'visible',
        'z-index': 1050 + dataset.level
      }, dataset.styles));
    }

    if (dataset.units === 'px' || dataset.units === 'pixel') {
      $(ob).attr('data-units', 'px');
      // console.log(t)
      var mw = ((abs(l) + w) > $(window).width()) ? 1 : abs(l);
      // console.log({ w, h });
      $(ob).css({
        top: popup.isInline(dataset) ? t + 'px' : '',
        left: popup.isInline(dataset) ? l + 'px' : '',
        width: (typeof w === 'number') ? w + 'px' : 'auto',
        height: (typeof h === 'number') ? h + 'px' : 'auto'
        // minHeight: (typeof h === 'number') ? h + 'px' : 'initial'
      });
    } else {
      $(ob).attr('data-units', '%');
      // console.log('CSS');
      //console.log('open : %');
      w = w || 50;
      h = h || 50;

      w = (w >= 100) ? 100 : w;
      h = (h >= 100) ? 100 : h;

      $(ob).attr({
        'data-top': t,
        'data-left': l,
        'data-width': w,
        'data-height': h,
        'data-units': '%',
        'data-class': dataset.class,
        'data-styles': dataset.styles,
        'data-animate-in': dataset.animateIn,
        'data-animate-out': dataset.animateOut,
        'data-position': dataset.position || 'center'
      });

      // console.log(w, h, typeof w, $(ob).css('width'));
      $(ob).css({
        width: (typeof w === 'number') ? w + '%' : 'auto',
        height: (typeof h === 'number') ? h + '%' : 'auto',
        top: popup.isInline(dataset) ? (abs(100 - h) / 2) + '%' : '',
        left: popup.isInline(dataset) ? (abs(100 - w) / 2) + '%' : ''
      });
      // console.log($(ob).css('width'));
    }

    dataset.top = popup.TOP;
    dataset.left = popup.LEFT;
    dataset.width = popup.WIDTH;
    dataset.height = popup.HEIGHT;

    $(obPop)[0]._config = dataset;

    // console.log(dataset);
    // console.log('after Open:  ' + $(ob).attr('data-units'));
    popup.refresh(ob);

    $(document).trigger($.Event('popup.open'), $(obPop));
    $(obPop).trigger($.Event('popup.open'), $(obPop));
    dataset.events.opened({
      target: $(obPop)[0],
      type: 'opened'
    });
  },
  /**
   * @method popup.reInit()
   * @param {*} el 
   */
  reInit: function (el) {
    var dataset, hdr, ftr;
    // dataset = $(el)[0]._config;
    dataset = $(el)[0]._config || $(el)[0].dataset;
    // console.log(dataset);
    dataset.events = (dataset.events === undefined || dataset.events === {}) ? popup._events : $.extend(popup._events, dataset.events);;
    // $.extend(popup._events, dataset.events);

    popup.WIDTH = parseInt(dataset.width, 10);
    popup.HEIGHT = parseInt(dataset.height, 10);
    popup.TOP = parseInt(dataset.top, 10) || 0;
    popup.LEFT = parseInt(dataset.left, 10) || 0;

    $('.popup [data-hide]').off('click.popup').on('click.popup', function () {
      popup.close($(this).closest('.popup'));
    });

    $('.modalOverlay').off('click.popup').on('click.popup', function (e) {
      // e.stopPropagation();
      // console.log(e.target);
      if ($(e.target).is('.modalOverlay') && $(e.target).find('[data-dismiss="true"].popup').length > 0) {
        popup.close($(this).find('.popup'));
      }
    });

    $(document).off('keydown.popup').on('keydown.popup', function (e) {
      if (e.which === kb.ESC) {
        $('.modalOverlay.active').each(function (_i, el) {
          if ($(el).find('.popup[data-dismiss="true"]').length > 0) {
            popup.close($(this).find('.popup'));
          }
        });
      }
    });

    if (dataset.units === 'px' || dataset.units === 'pixel') {
      $(el).attr('data-units', 'px');
      var w = (popup.WIDTH >= $(window).width()) ? $(window).width() : popup.WIDTH,
        h = (popup.HEIGHT >= $(window).height()) ? $(window).height() : popup.HEIGHT,
        t = popup.TOP,
        l = popup.LEFT;
      // console.log(el, w);
      // if (dataset.position === 'center') {
      //   t = (abs($(window).height() - h) / 2);
      //   l = (abs($(window).width() - w) / 2);
      // } else if (dataset.position === 'absolute') {
      //   t = (dataset.top > ($(window).height() - h)) ? $(window).height() - h : dataset.top;
      //   l = (dataset.left > ($(window).width() - w)) ? $(window).width() - w : dataset.left;
      // } else
      if (dataset.position === 'inline') {
        $('body').css('position', 'relative');
        $(el).closest('.modalOverlay').addClass('inlineMock');
        t = popup.TOP;
        l = popup.LEFT;
        w = popup.WIDTH;
        h = popup.HEIGHT;

        l = (l < 0) ? 0 : l;
        t = (t < 0) ? 0 : t;
        // l = ((l + w) > $(window).width())? abs(l - w): l;
      }
      // console.log(t);
      // t = (popup.TOP >= $(window).height()/2) ? 0 : (abs($(window).height() - h) / 2) + 'px',
      // l = (popup.LEFT >= $(window).width()/2) ? 0 : (abs($(window).width() - w) / 2) + 'px';
      // console.log('Refresh : px', popup.WIDTH, $(window).width(), w);
      // console.log(t, l, w, h);
      // console.log('CSS px');

      $(el).css({
        top: popup.isInline(dataset) ? t : '',
        left: popup.isInline(dataset) ? l : '',
        width: (typeof w === 'number') ? w + 'px' : 'auto',
        height: (typeof h === 'number') ? h + 'px' : 'auto'
        // minHeight: (typeof h === 'number') ? h + 'px' : 'initial'
      });
    } else {
      var w = (popup.WIDTH >= $(window).width()) ? $(window).width() : popup.WIDTH,
        h = (popup.HEIGHT >= $(window).height()) ? $(window).height() : popup.HEIGHT,
        t = popup.TOP,
        l = popup.LEFT;
      // console.log('refresh : %');
      $(el).attr('data-units', '%');
      // console.log('CSS %');
      // console.log({ w, h, type: typeof w, width: $(el).css('width') });
      $(el).css({
        top: popup.isInline(dataset) ? t : '',
        left: popup.isInline(dataset) ? l : '',
        width: (typeof w === 'number') ? w + '%' : 'auto',
        height: (typeof h === 'number') ? h + '%' : 'auto'
      });
      // console.log({ width: $(el).css('width') });
    }

    hdr = ($(el).find('.popHeader').is(':hidden')) ? 0 : $(el).find('.popHeader').outerHeight();
    ftr = ($(el).find('.popFooter').is(':hidden')) ? 0 : $(el).find('.popFooter').outerHeight();
    hdr = hdr ? hdr : 0;
    ftr = ftr ? ftr : 0;

    $(el).find('.popContent').css('height', $(el).outerHeight() - (hdr + ftr));
    // $(el).trigger("popup.refresh", $(el));
    // console.log(dataset);
    // console.log(el, $(el)[0]);
    $(document).trigger($.Event('popup.refresh'), $(el));
    $(el).trigger($.Event('popup.refresh'), $(el));
    dataset.events.refresh({
      target: el,
      type: 'refresh'
    });
  },
  /**
   * @method popup.refresh()
   * @param {*} ob 
   */
  refresh: function (ob) {
    "use strict";
    if (ob === undefined || ob === null) {
      ob = '.popup.open';

      $(ob).each(function (_i, el) {
        popup.reInit(el);
      });
    } else {
      if ($(ob).length > 0) {
        $(ob).each(function (_i, el) {
          popup.reInit(el);
        });
      } else {
        popup.reInit(ob);
      }
    }
  },
  /**
   * @method popup.setData()
   * @param {*} obPop 
   * @param {*} json 
   */
  setData: function (obPop, json) {
    if (typeof json === "string" && json !== '') {
      json = JSON.parse(json);
    } else if (typeof json !== "object") {
      console.error("Invalid JSON Format: ", json);
    }
    // console.log(obPop, json);
    $(json).each(function (_di, dx) {
      // for (var k in dx) {
      var k = 'selector';
      // console.log(dx.hasOwnProperty(k));
      if (dx.hasOwnProperty(k)) {
        // console.log(k, dx[k]);
        if ($(obPop).find(dx[k]).length <= 0) { return; }
        if (dx.hasOwnProperty('attr')) {
          $(obPop).find(dx[k]).attr(dx['attr']);
        }
        if (dx.hasOwnProperty('css')) {
          $(obPop).find(dx[k]).css(dx['css']);
        }
        if (dx.hasOwnProperty('removeAttr')) {
          $(obPop).find(dx[k]).removeAttr(dx['removeAttr']);
        }
        if (dx.hasOwnProperty('class')) {
          $(obPop).find(dx[k]).addClass(dx['class']);
        }
        if (dx.hasOwnProperty('addClass')) {
          $(obPop).find(dx[k]).addClass(dx['addClass']);
        }
        if (dx.hasOwnProperty('removeClass')) {
          $(obPop).find(dx[k]).removeClass(dx['removeClass']);
        }
        if (dx.hasOwnProperty('val')) {
          if ($(dx[k]).is('input:checkbox') || $(dx[k]).is('input:radio')) {
            $(obPop).find(dx[k])[0].checked = getBoolean(dx['val']);
          } else if ($(dx[k]).is('[data-range-slider]')) {
            $(dx[k]).slider('value', dx['val']);
          } else {
            $(obPop).find(dx[k]).val(dx['val']).trigger('keyup');
          }
        }
        if (dx.hasOwnProperty('text')) { // k === 'selector'
          $(obPop).find(dx[k]).text(dx['text']);
        }
        if (dx.hasOwnProperty('template')) { // k === 'selector'
          $(obPop).find(dx[k]).html(dx['template']);
        }
        if (dx.hasOwnProperty('html')) { // k === 'selector'
          $(obPop).find(dx[k]).html(dx['html']);
        }
      }
      // }
    });
  },
  /**
   * @method popup.close()
   * @param {*} obPop 
   * @returns 
   */
  close: function (obPop) {
    "use strict";
    var reset = $(obPop).find('[data-reset="true"]'),
      dataset = $(obPop)[0]._config || $(obPop)[0].dataset;
    dataset.events = (
      dataset.events === undefined ||
      dataset.events === {} ||
      typeof dataset.events !== "object"
    ) ? popup._events : $.extend(popup._events, dataset.events);

    // console.log(typeof dataset.events, dataset);
    // $.extend(popup._events, dataset.events);

    // console.log(obPop, dataset.events);
    // callback before opening
    $(document).trigger($.Event('popup.closing'), $(obPop));
    $(obPop).trigger($.Event('popup.closing'), $(obPop));
    var cb = dataset.events.closing({
      type: 'closing',
      target: $(obPop)[0]
    });
    if (getBoolean(cb)) { return; }

    if (reset.length > 0) {
      $(reset).each(function (_i, e) {
        switch (e.tagName.toLowerCase()) {
          case 'img':
            $(e).attr({ src: '' });
            break;
          case 'video':
            e.load();
            break;
          case 'iframe':
            e.src = '';
            break;
          case 'input':
          case 'select':
          case 'textarea':
            if ($(e).attr('type') === 'radio' || $(e).attr('type') === 'checkbox') {
              if ($(e).is('[data-init]')) {
                e.checked = $(e).attr('data-init');
              } else {
                e.checked = false;
              }
            } else {
              e.value = '';
            }
            break;
          default:
            $(obPop).find(e).html('');
            // console.log(e.tagName.toLowerCase());
            break;
        }
      });
    }

    $('html,body').removeClass('modalOpen');

    if ($.trim(dataset.animateOut) !== '') {
      $(obPop).addClass('animate__' + dataset.animateOut).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass('open ' + dataset.class + ' ' + 'animate__' + dataset.animateOut)
          .parent('.modalOverlay').removeClass('active' + ' ' + dataset.oClass + ' ' + popup.CC).removeAttr('style');
      });
      popup.refresh();
    } else {
      $(obPop).removeClass('open ' + dataset.class).closest('.modalOverlay').removeClass('active' + ' ' + dataset.oClass + ' ' + popup.CC).removeAttr('style');
    }

    // $(document).trigger("popup.close", $(obPop));
    // $(obPop).trigger("popup.close", $(obPop));
    $(document).trigger($.Event('popup.close'), $(obPop));
    $(obPop).trigger($.Event('popup.close'), $(obPop));
    // console.log(dataset.events);
    dataset.events.closed({
      target: $(obPop)[0],
      type: 'closed'
    });

    dataset.events = popup._events = {
      opening: function (_e) { },
      opened: function (_e) { },
      closing: function (_e) { },
      closed: function (_e) { },
      refresh: function (_e) { },
      reInit: function (_e) { },
      setter: function (_e) { }
    };
  },
  /**
   * @method popup.loader()
   * @param {*} obPop 
   * @param {*} opt 
   */
  loader: function (obPop, opt) {
    "use strict";
    $(obPop).attr('data-loader', opt);
  },
  /**
   * @method popup.reset()
   * @param {*} obPop 
   * @param {*} override 
   */
  reset: function (obPop, override) {
    $(obPop).addClass('animating').one(transitionend, function () {
      $(obPop).removeClass('animating');
    });
    override = override || {};
    var ds = $(obPop)[0]._config || $(obPop)[0].dataset;
    override = $.extend(ds, override);
    // console.log(override);
    $(obPop)[0]._config = override;
    $(obPop)[0].dataset = override;

    popup.refresh(obPop);
  }
}; $(function () { popup.init(); });
$(window).on('resize', function () { popup.refresh(); });

/**!
 * @name Carousel DataAPI
 * @author Ajith S Punalur (ASP)
 * @version 3.0.0
 * @license MIT
 * @release 2022-08-19
 * */
var carousel = {
  _error: { message: 'No Errors' },
  init: function () {
    "use strict";
    window.SWIPER = {};
    // Dependancy Check
    this._error.message = 'No Errors';
    try {
      if (TRUTH === undefined) { };
      if (NULL === undefined) { };
      if (isNull === undefined) { };
      if (getBoolean === undefined) { };
      if (onlyUnique === undefined) { };
    } catch (err) {
      // console.log(err);
      this._error.message = err.message + "\n Include the dependancy it and retry...!";
      console.error(this._error.message);
      return;
    }

    $('[data-carousel="owl"]').each(function (_i, el) {
      // var mgn = ($(el).data('margin') !== undefined)? parseInt($(el).data('margin')): 10;
      // console.log($('html').attr('dir')==='rtl')
      var nav = ($(el).data('nav') !== undefined) ?
        $(el).data('nav').split('{{,}}')
        : ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"];
      $(el).owlCarousel({
        video: true,
        navText: nav,
        singleItem: true,
        items: $(el).data('items') || 3,
        smartSpeed: $(el).data('duration') || 1000,
        animateIn: $(el).data('animateIn') || false,
        animateOut: $(el).data('animateOut') || false,
        stagePadding: $(el).data('stagePadding') || 0,
        autoplayTimeout: $(el).data('timeout') || 2000,
        rtl: ($('html').attr('dir') === 'rtl') ? true : false,
        loop: ($(el).data('loop') === undefined) ? true : getBoolean($(el).data('loop')),
        dots: ($(el).data('dots') === undefined) ? false : getBoolean($(el).data('dots')),
        arrows: ($(el).data('arrows') === undefined) ? false : getBoolean($(el).data('arrows')),
        margin: ($(el).data('margin') === undefined) ? 0 : parseInt($(el).data('margin')),
        center: ($(el).data('center') === undefined) ? false : getBoolean($(el).data('center')),
        autoplay: ($(el).data('autoplay') === undefined) ? true : getBoolean($(el).data('autoplay')),
        autoplayHoverPause: ($(el).data('pause') === undefined) ? false : getBoolean($(el).data('pause')),
        responsive: {
          0: {
            stagePadding: $(el).data('xsStagePadding') || 0,
            items: $(el).data('xsItems') || 1
          },
          480: {
            stagePadding: $(el).data('smStagePadding') || 0,
            items: $(el).data('smItems') || 1
          },
          991: {
            stagePadding: $(el).data('mdStagePadding') || $(el).data('stagePadding') || 0,
            items: $(el).data('mdItems') || $(el).data('items') || 3
          },
          1200: {
            stagePadding: $(el).data('stagePadding') || 0,
            items: $(el).data('items') || 3
          }
        },
      });
    });

    $('[data-carousel="swiper"]').each(function (_i, ob) {
      var key = $(ob).data('key') || getRandomStr(4) + '_' + getRandomInt(1000, 9999);
      // console.log(key);
      if (typeof Swiper !== "undefined") {
        window.SWIPER[key] = new Swiper(ob, {
          // If we need pagination
          pagination: {
            el: $(ob).data('paginationElement') || '.swiper-pagination',
          },
          // Navigation arrows
          navigation: {
            nextEl: $(ob).data('paginationNextElement') || '.swiper-button-next',
            prevEl: $(ob).data('paginationPrevElement') || '.swiper-button-prev',
          },
          // And if we need scrollbar
          scrollbar: {
            el: $(ob).data('paginationElement') || '.swiper-scrollbar',
          },
          // Optional parameters
          speed: $(ob).data('speed') || 400,
          width: $(ob).data('width') || null,
          height: $(ob).data('height') || null,
          effect: $(ob).data('effect') || 'slide', // 'slide' | 'fade' | 'cube' | 'coverflow' | 'flip' | 'creative' | 'cards'
          slidesPerView: $(ob).data('items') || 3,
          spaceBetween: $(ob).data('spaceBetween') || 0,
          longSwipesMs: $(ob).data('longSwipesMs') || 300,
          loopedSlides: $(ob).data('loopedSlides') || null,
          direction: $(ob).data('direction') || 'horizontal',
          longSwipesRatio: $(ob).data('longSwipesRatio') || 0.5,
          containerModifierClass: $(ob).data('prefix') || 'swiper-',
          breakpointsBase: $(ob).data('breakpointsBase') || 'window',
          edgeSwipeThreshold: $(ob).data('edgeSwipeThreshold') || 20,
          noSwipingSelector: $(ob).data('noSwipingSelector') || 'input',
          loopAdditionalSlides: $(ob).data('loopAdditionalSlides') || 0,
          noSwipingClass: $(ob).data('noSwipingClass') || 'swiper-no-swiping',
          maxBackfaceHiddenSlides: $(ob).data('maxBackfaceHiddenSlides') || 10,
          // modules: $(ob).data('modules') ?  $(ob).data('modules').split(',') : null,
          init: ($(ob).data('init') === undefined) ? true : getBoolean($(ob).data('init')),
          loop: ($(ob).data('loop') === undefined) ? true : getBoolean($(ob).data('loop')),
          nested: ($(ob).data('nested') === undefined) ? false : getBoolean($(ob).data('nested')),
          enabled: ($(ob).data('enabled') === undefined) ? true : getBoolean($(ob).data('enabled')),
          cssMode: ($(ob).data('cssMode') === undefined) ? false : getBoolean($(ob).data('cssMode')),
          observer: ($(ob).data('observer') === undefined) ? false : getBoolean($(ob).data('observer')),
          noSwiping: ($(ob).data('noSwiping') === undefined) ? true : getBoolean($(ob).data('noSwiping')),
          initialSlide: parseInt($(ob).data('initial'), 10) || parseInt($(ob).data('initialSlide'), 10) || 0,
          longSwipes: ($(ob).data('longSwipes') === undefined) ? true : getBoolean($(ob).data('longSwipes')),
          grabCursor: ($(ob).data('grabCursor') === undefined) ? false : getBoolean($(ob).data('grabCursor')),
          autoHeight: ($(ob).data('autoHeight') === undefined) ? false : getBoolean($(ob).data('autoHeight')),
          followFinger: ($(ob).data('followFinger') === undefined) ? true : getBoolean($(ob).data('followFinger')),
          focusableElements: $(ob).data('focusableElements') || 'input, select, option, textarea, button, video, label',
          allowSlideNext: ($(ob).data('allowSlideNext') === undefined) ? true : getBoolean($(ob).data('allowSlideNext')),
          allowSlidePrev: ($(ob).data('allowSlidePrev') === undefined) ? true : getBoolean($(ob).data('allowSlidePrev')),
          allowTouchMove: ($(ob).data('allowTouchMove') === undefined) ? true : getBoolean($(ob).data('allowTouchMove')),
          observeParents: ($(ob).data('observeParents') === undefined) ? false : getBoolean($(ob).data('observeParents')),
          createElements: ($(ob).data('createElements') === undefined) ? false : getBoolean($(ob).data('createElements')),
          edgeSwipeDetection: ($(ob).data('edgeSwipeDetection') === undefined) ? false : $(ob).data('edgeSwipeDetection'),
          loopedSlidesLimit: ($(ob).data('loopedSlidesLimit') === undefined) ? true : getBoolean($(ob).data('loopedSlidesLimit')),
          loopPreventsSlide: ($(ob).data('loopPreventsSlide') === undefined) ? true : getBoolean($(ob).data('loopPreventsSlide')),
          normalizeSlideIndex: ($(ob).data('normalizeSlideIndex') === undefined) ? true : getBoolean($(ob).data('normalizeSlideIndex')),
          observeSlideChildren: ($(ob).data('observeSlideChildren') === undefined) ? false : getBoolean($(ob).data('observeSlideChildren')),
          loopFillGroupWithBlank: ($(ob).data('loopFillGroupWithBlank') === undefined) ? false : getBoolean($(ob).data('loopFillGroupWithBlank')),
          centerInsufficientSlides: ($(ob).data('centerInsufficient') === undefined) ? false : getBoolean($(ob).data('centerInsufficient')),
          centeredSlidesBounds: ($(ob).data('centerBounds') === undefined) ? false : getBoolean($(ob).data('centerBounds')),
          centeredSlides: ($(ob).data('center') === undefined) ? false : getBoolean($(ob).data('center')),
          breakpoints: {
            0: {
              slidesPerView: $(ob).data('xsItems') || 1,
              spaceBetween: $(ob).data('xsSpaceBetween') || 0
            },
            576: {
              slidesPerView: $(ob).data('smItems') || 1,
              spaceBetween: $(ob).data('smSpaceBetween') || 0
            },
            991: {
              slidesPerView: $(ob).data('mdItems') || $(ob).data('items') || 3,
              spaceBetween: $(ob).data('mdSpaceBetween') || $(ob).data('spaceBetween') || 0
            },
            1200: {
              slidesPerView: $(ob).data('items') || 3,
              spaceBetween: $(ob).data('spaceBetween') || 0
            }
          }
        });
        // console.log(window.SWIPER[key]);
      }
    });
  },
  forceRefresh: function () {
    "use strict";
    console.log('refreshed');
    window.dispatchEvent(new Event('resize'));
  }
}; $(document).on('ready resize', function () { carousel.init(); });

/**!
 * @name MultiSelector ComboBox
 * @version 1.1.0
 * @build 07-01-2022 (dd-mm-yyyy)
 * */
$.fn.multiselector = function (settings) {
  var s = {
    max: settings.max || 3,
    class: settings.class || '',
    prefix: settings.prefix || '',
    screen: settings.screen || 500,
    outputTo: settings.outputTo || '',
    csvSeperator: settings.csvSeperator || ',',
    placeholder: settings.placeholder || 'Choose',
    searchText: settings.searchText || 'Search...',
    selectMsg: settings.selectMsg || '{0} Selected',
    error: settings.error || 'No matches for "{0}"',
    outputSrcAttr: settings.outputSrcAttr || "value",
    locale: settings.locale || ['OK', 'Cancel', 'Select All'],
    selectMsgAll: settings.selectMsgAll || '{0} all selected!',
    outputTemplate: settings.outputTemplate || "<b> &gt; {{$}} </b>",
    top: (settings.top === undefined) ? false : getBoolean(settings.top),
    csv: (settings.csv === undefined) ? false : getBoolean(settings.csv),
    live: (settings.live === undefined) ? true : getBoolean(settings.live),
    search: (settings.search === undefined) ? false : getBoolean(settings.search),
    tooltip: (settings.tooltip === undefined) ? true : getBoolean(settings.tooltip),
    buttons: (settings.buttons === undefined) ? false : getBoolean(settings.buttons),
    selectAll: (settings.selectAll === undefined) ? false : getBoolean(settings.selectAll),
    forceCustom: (settings.forceCustom === undefined) ? false : getBoolean(settings.forceCustom),
    devices: settings.devices || ['Android', 'BlackBerry', 'iPhone', 'iPad', 'iPod', 'Opera Mini', 'IEMobile', 'Silk'],
  };
  // console.log(s.floatWidth)
  return this.each(function (_idx, el) {
    var ds = $(el).data();
    ds.locale = (ds.locale) ? (typeof ds.locale === 'string' ? ds.locale.split(',') : ds.locale) : s.locale;
    ds.devices = (ds.locale) ? (typeof ds.devices === 'string' ? ds.devices.split(',') : ds.devices) : s.devices;
    // console.log(s.screen)
    settings = {
      class: ds.class || s.class,
      noMatch: ds.error || s.error,
      prefix: ds.prefix || s.prefix,
      locale: ds.locale || s.locale,
      csvDispCount: ds.max || s.max,
      floatWidth: ds.screen || s.screen,
      outputTo: ds.outputTo || s.outputTo,
      nativeOnDevice: ds.devices || s.devices,
      searchText: ds.searchText || s.searchText,
      captionFormat: ds.selectMsg || s.selectMsg,
      placeholder: ds.placeholder || s.placeholder,
      csvSepChar: ds.csvSeperator || s.csvSeperator,
      outputSrcAttr: ds.outputSrcAttr || s.outputSrcAttr,
      outputTemplate: ds.outputTemplate || s.outputTemplate,
      up: (ds.top === undefined) ? s.top : getBoolean(ds.top),
      captionFormatAllSelected: ds.selectMsgAll || s.selectMsgAll,
      selectAll: (ds.all === undefined) ? s.all : getBoolean(ds.all),
      outputAsCSV: (ds.csv === undefined) ? s.csv : getBoolean(ds.csv),
      search: (ds.search === undefined) ? s.search : getBoolean(ds.search),
      showTitle: (ds.tooltip === undefined) ? s.tooltip : getBoolean(ds.tooltip),
      triggerChangeCombined: (ds.live === undefined) ? s.live : getBoolean(ds.live),
      okCancelInMulti: (ds.buttons === undefined) ? s.buttons : getBoolean(ds.buttons),
      forceCustomRendering: (ds.forceCustom === undefined) ? s.forceCustom : getBoolean(ds.forceCustom),
    };
    // console.log(settings);
    $(el).SumoSelect(settings);

    $(el).closest('.SumoSelect').addClass(settings.class);

    if ($.trim(settings.outputTo) !== '') {
      var output = settings.outputTo,
        outputTemplate = settings.outputTemplate.replace(/'/g, '"'),
        outputSrc = settings.outputSrcAttr,
        act = null;

      outputTemplate = outputTemplate.replace(/{{\$action\=([a-z-]+)\(\)}}/, '').split('{{$}}');
      act = settings.outputTemplate.match(/{{\$action\=([a-z-]+)\(\)}}/);

      if (act !== null) {
        act = act[0].split('{{')[1].split('}}')[0].split('=')[1];
      }

      $(el).attr('data-action', act);

      if ($(output).length <= 0) { return; }

      // $(el).attr('data-output-to', settings.outputTo);
      // console.log(el)
      $(el).off('change.multiselector').on('change.multiselector', function () {
        // console.log( $(this).attr('data-output-to') )
        var av = new Array,
          sv = new Array;
        // console.log(outputSrc)
        $(this).find('option:selected').each(function () {
          var ov = $(this).attr(outputSrc),
            v = $(this).attr('value');
          sv.push(v);
          av.push(ov);
          sv = sv.filter(onlyUnique);
          av = av.filter(onlyUnique);
        });

        $(output).html('');
        for (k in av) {
          // console.log(outputTemplate, sv[k]);
          var d =
            (outputTemplate[0].replace('>', ' data-val="' + sv[k] + '">')) +
            av[k] +
            outputTemplate[1];

          $(output).attr('data-rel', '#' + $(el).attr('id'));
          $(output).append(d);
          $(output + ' > *').off('click.multiselector').on('click.multiselector', function () {
            $($(output).attr('data-rel'))[0].sumo.unSelectItem($(this).attr('data-val'));
            if ($.trim(act) !== '') {
              if (typeof act === "function") {
                act.apply();
              } else if (typeof act === "string") {
                var fnName = act.split('('),
                  fnparams = fnName[1].split(')')[0].split(','),
                  fn = window[fnName[0]];
                if (typeof fn === "function") { fn.apply(null, fnparams) };
              }
            }
          });
        }
      });
    }
  });
}; $(function () {
  $('[data-type="selector"]').multiselector({
    search: true,
    selectAll: true,
    captionFormat: '{0} selected',
    outputTemplate: "<span class='badge bg-info m-r-5 m-b-5'> {{$}} <i class='fa fa-times' {{$action=removeTag()}}></i> </span>",
    selectMsgAll: 'All selected'
  });
});

/**
 * @name NitroTemplate Javascript
 * @version 0.2.0
 * @author Ajith S Punalur (ASP)
 * @license MIT
 * @date 22-04-2022
 */
(function ($) {
  $.fn.NT = $.fn.NitroTemplate = function (data) {
    try {
      eval("`nitro`");
    } catch (error) {
      alert('Please upgrade to a Modern Browser, like Chrome, Firefox, Edge, Opera etc.!');
      return;
    }

    $.extend(data, {
      json: data.json || {},
      source: data.source || "/data",
      filter: data.filter || undefined,
      template: data.template || `<div></div>`,
      appendMode: getBoolean(data.appendMode) ? getBoolean(data.appendMode) : false,
      loader: typeof data.loader === "function" ? data.loader : function (bool) { console.log('Loading', bool) },
      afterRender: typeof data.afterRender === "function" ? data.afterRender : function (ob) { return ob; },
    });

    // console.log(data.appendMode);

    var html = '';
    var buidHtml = function (data) {
      html = '';
      if (data.json.length > 0) {
        $.each(data.json, function (_i, el) {
          html += data.template(el);
        });
      } else {
        html += data.template(data.json);
      }
      // console.log(html);
      return html;
    };

    function filterJson(d, filter) {
      return (filter) ? jsonSql({
        from: d,
        where: filter.where,
        limit: filter.limit
      }).data : d;
    }

    var json = init = function (element) {
      element.each(function (_i, ob) {
        html = '';
        data.loader(true);
        var ds = $(ob).data();
        ds = ds.nitroTemplate ? ds.nitroTemplate : ds;
        ds = typeof ds === "string" ? JSON.parse(ds) : ds;
        $.extend(data, ds);

        // console.log({ data });
        if (typeof data.json === "string") {
          if (data.json.endsWith('.json') || data.json.includes('.json')) {
            data.loader(true);
            $.ajax({
              async: false,
              dataType: 'json',
              url: `${data.source}/${data.json}?v=${appUID()}`,
              success: function (d, status) {
                if (status === 'success') {
                  data.json = filterJson(d, data.filter);
                  // console.log('amode', data.appendMode);
                  html += buidHtml(data);
                  // console.log({html});
                  if (data.appendMode === true) {
                    $(ob).append(html);
                  } else {
                    $(ob).html(html);
                  }
                }
                data.loader(false);
              },
              fail: function () {
                data.loader(false);
              }
            });
          } else if (data.json.startsWith('{') && data.json.endsWith('}')) {
            data.json = JSON.parse(data.json);
            data.json = filterJson(data.json, data.filter);

            html += buidHtml(data);
            // console.log({html});
            if (data.appendMode === true) {
              $(ob).append(html);
            } else {
              $(ob).html(html);
            }
          }
        } else {
          // console.log(data);
          data.json = filterJson(data.json, data.filter);

          html += buidHtml(data);

          if (data.appendMode === true) {
            $(ob).append(html);
          } else {
            $(ob).html(html);
          }
        }
      });

      data.afterRender({
        html
      });

      data.loader(false);
      return {
        json: data.json
      };
    }(this);

    return json;
  };
  $.fn.NT.parseTemplate = (function () {
    var cache = {};
    function generateTemplate(template) {
      var fn = cache[template];
      if (!fn) {
        // Replace ${expressions} (etc) with ${map.expressions}.
        var sanitized = template
          .replace(/\$\{([\s]*[^;\s\{]+[\s]*)\}/g, function (_, match) {
            return `\$\{map.${match.trim()}\}`;
          })
          // Afterwards, replace anything that's not ${map.expressions}' (etc) with a blank string.
          .replace(/(\$\{(?!map\.)[^}]+\})/g, '');
        // console.log(sanitized);
        fn = Function('map', `return \`${sanitized}\``);
      }
      return fn;
    }

    return generateTemplate;
  })();
  $.fn.NT.for = function (str, obj) {
    // console.log(obj);
    if (typeof obj !== "object") {
      console.log('Wrong format received, Expected an array but got "' + typeof obj + '"');
      return;
    }
    var buildTemp = $.fn.NitroTemplate.parseTemplate(str);
    var htmlTemplate = '';
    $.each(obj, function (_key, el) {
      // console.log(el);
      htmlTemplate += buildTemp({ el });
    });
    return htmlTemplate;
  }
}(jQuery));

/**!
 * @name NitroDialog - Plugin
 * @version 1.1.1
 * @author Ajith S Punalur (ASP)
 * @license MIT
 * @date 24-02-2022
 * */
(function ($) {
  var nmDialog = {
    init: function (ob) {
      if ($(ob).closest('.dialogBackdrop').length < 1) {
        $(ob).wrap('<div class="dialogBackdrop ">&nbsp;</div>');
      }
      // if (data.backdrop === true) {
      // }
      $(ob).trigger("nm.dialog.init", $(ob));
    },
    open: function (ob, data) {
      $(ob).trigger("nm.dialog.opening", $(ob));
      $(ob).addClass(data.class);
      $(ob).find('.dialog-message').html(data.message);
      $(ob).find('.dialog-footer').find('button').remove();
      $(ob).find('.dialog-footer').html('');
      if ($(data.buttons).length <= 0) {
        $(ob).find('.dialog-footer').hide();
      } else {
        $(ob).find('.dialog-footer').show();
      }
      var uid = '' + new Date().getTime() + getRandomStr();
      $(data.buttons).each(function (_i, button) {
        var btn = $('<button/>');
        button.class = (button.class === undefined) ? 'btn ' : 'btn ' + button.class;
        if (uid === new Date().getTime()) {
          uid = '' + uid + getRandomStr();
        } else {
          uid = '' + new Date().getTime() + getRandomStr();
        }
        uid = uid + getRandomStr();
        $(btn).attr('id', 'dialogBtn-' + uid).addClass(button.class).html(button.label);
        $(ob).find('.dialog-footer').append(btn);

        $(ob).find('#dialogBtn-' + uid).off('click.nm.dialog.button_i').on('click.nm.dialog.button_i', function () {
          if (button.action !== undefined && typeof button.action === "string") {
            // console.log(button.action);
            var fnName = button.action.split('('),
              fnparams = fnName[1].split(')')[0].split(','),
              fn = window[fnName[0]];
            if (typeof fn === "function") fn.apply(null, fnparams);
          } else if (typeof button.action === "function") {
            button.action.apply(null, fnparams)
          } else {
            console.error("Undefined Error , %o", button.action);
          }
        });

        if (button.focus === true) {
          // console.log('focus', btn);
          setTimeout(function () {
            $('#dialogBtn-' + uid).trigger('focus');
          }, 5);
        }
      });

      var bd = $(ob).closest('.dialogBackdrop');

      if (data.keyboard === true) {
        $(document).off('keydown.nm.dialog.keyboard').on('keydown.nm.dialog.keyboard', function (e) {
          if (e.keyCode === kb.ESC) {
            nmDialog.close(ob, data);
          }
        });
      }
      if (bd.length > 0) {
        if (data.dismissible === true) {
          $(bd).off('click.nm.dialog.overlay').on('click.nm.dialog.overlay', function (e) {
            if ($(e.target).is('.dialogBackdrop')) {
              nmDialog.close(ob, data);
            }
          });
        } else {
          $(bd).off('click.nm.dialog.overlay');
        }
      }

      if (data.backdrop === true) {
        $(bd).addClass('active');
      } else {
        $(bd).addClass('transparent');
      }
      $(ob).css({
        "width": data.width,
        "height": data.height
      }).addClass('open').attr('open', 'true');
      $(ob).trigger("nm.dialog.opened", $(ob));
    },
    close: function (ob, data) {
      $(ob).trigger("nm.dialog.closing", $(ob));
      $(ob).removeClass('open ' + data.class);
      $(ob).removeAttr('open');
      if (data.backdrop === true) {
        $(ob).closest('.dialogBackdrop').removeClass('active');
      } else {
        $(ob).closest('.dialogBackdrop').removeClass('transparent');
      }
      $(ob).removeAttr('class').addClass('dialog');
      $(ob).closest('.dialogBackdrop').off('click.nm.dialog.overlay');
      $(ob).trigger("nm.dialog.closed", $(ob));
    },
    refresh: function (ob) {
      $(ob).trigger("nm.dialog.refresh", $(ob));
    }
  }; $(window).on('resize', function () {
    nmDialog.refresh('.dialog');
  });

  $.fn.NitroDialog = function (data) {
    var dClass = "dialog";
    this.each(function (_i, ob) {
      var ds = $(ob).data();
      if (data.action === 'init') {
        data.backdrop = (data.backdrop === undefined) ? false : getBoolean(data.backdrop);
        ds.backdrop = (ds.backdrop === undefined) ? data.backdrop : getBoolean(ds.backdrop);
      } else {
        ds.backdrop = (ds.backdrop === undefined) ? false : getBoolean(ds.backdrop);
        data.backdrop = (data.backdrop === undefined) ? ds.backdrop : getBoolean(data.backdrop);
        ds.backdrop = data.backdrop;
      }

      ds.dismissible = (ds.dismissible === undefined) ? false : getBoolean(ds.dismissible);
      data.dismissible = (data.dismissible === undefined) ? ds.dismissible : getBoolean(data.dismissible);
      ds.dismissible = data.dismissible;

      ds.keyboard = (ds.keyboard === undefined) ? false : getBoolean(ds.keyboard);
      data.keyboard = (data.keyboard === undefined) ? ds.keyboard : getBoolean(data.keyboard);
      ds.keyboard = data.keyboard;

      if (ds.buttons !== undefined && typeof (ds.buttons) === "string") {
        ds.buttons = JSON.parse(ds.buttons.replace(/'/g, '"'));
      } else {
        ds.buttons = undefined;
      }
      data = {
        action: ds.action || data.action || 'init',
        class: ds.class || data.class || dClass,
        width: ds.width || data.width || 'auto',
        height: ds.height || data.height || 'auto',
        message: ds.message || data.message || '',
        backdrop: ds.backdrop,
        dismissible: ds.dismissible,
        keyboard: ds.keyboard,
        buttons: ds.buttons || data.buttons || [{
          class: 'R',
          label: 'ok',
          action: function () { nmDialog.close(ob, {}); }
        }]
      }

      if (data.action === 'init') {
        nmDialog.init(ob);
      }
      if (data.action === 'open') {
        nmDialog.open(ob, data);
      }
      if (data.action === 'close') {
        nmDialog.close(ob, data);
      }
    });
  };
}(jQuery));

/**!
 * @name NitroToast
 * @version 1.1.0
 * @author Ajith S Punalur (ASP)
 * @license MIT
 * @release 01-02-2021
 **/
(function ($) {
  $.fn.NitroToast = function (data) {
    var ob = $(this),
      sbClass = "snackbar",
      sbTimer = setTimeout(function () { }, 0);

    clearTimeout(sbTimer);

    $.extend(data, {
      class: data.class || "",
      message: data.message || "",
      position: data.position || "bottom",
      actionText: data.actionText || "OK",
      afterTimeOut: data.afterTimeOut || void (0),
      actionHandler: data.actionHandler || void (0)
    });

    $(ob).addClass(data.class);

    if ($('.snackbar.active').length > 0) {
      $('.snackbar').removeClass('active');
    }
    $(ob).attr('data-placement', data.position);
    $(ob).find('.' + sbClass + '-text').html(data.message);
    $(ob).find('.' + sbClass + '-action').html(data.actionText);
    setTimeout(function () {
      $(ob).addClass('active');
    }, 300);
    sbTimer = setTimeout(function () {
      setTimeout(data.afterTimeOut, 0);
      $(ob).removeClass('active ' + data.class);
      $(ob).find('.' + sbClass + '-text').html('');
      $(ob).find('.' + sbClass + '-action').html('');
      var sbEvent = $.Event('snackbar.closed');
      $(ob).trigger(sbEvent, [$(ob)]);
    }, data.timeout);

    $('.' + sbClass + '-action').off('click.snackbar').on('click.snackbar', function () {
      // console.log(sbTimer);
      clearTimeout(sbTimer);
      $(this).parent('.' + sbClass).removeClass('active ' + data.class);
      $(this).parent('.' + sbClass).find('.' + sbClass + '-text').html('');
      $(this).parent('.' + sbClass).find('.' + sbClass + '-action').html('');
      setTimeout(data.actionHandler, 0);
    });
    return this;
  };
}(jQuery));

// NitroMaterial >> vendor/nitroForm
/**!
 * @name NitroScrollTrigger - Plugin
 * @version 0.1.1-beta
 * @author Ajith S Punalur (ASP)
 * @license MIT
 * @date 11-07-2022
 * */
(function ($) {
  $.fn.NitroScrollTrigger = function (data) {
    this.each(function (i, ob) {
      var ds = $.extend({
        offset: '0px',
        handler: null,
        type: "always",
        direction: "both",
      }, $(ob).data());

      ds.nitroTrigger = (typeof ds.nitroTrigger === String) ? {
        when: ["exit", "enter", "entered", "exited"],
        dir: ["up", "down"],
        handler: function () { }
      } : $.extend({
        when: ["exit", "enter", "entered", "exited"],
        dir: ["up", "down"],
        handler: function () { }
      }, ds.nitroTrigger);

      var config = ds.nitroTrigger;

      var nsData = {
        target: this,
        direction: ds.direction
      };

      if (ds.nitroTrigger.handler !== undefined && typeof ds.nitroTrigger.handler === "string") {
        var fnName = ds.nitroTrigger.handler.split('('),
          fnparams = fnName.length > 1 ? fnName[1].split(')')[0].split(',') : [],
          fn = window[fnName[0].trim()];
        fnparams.unshift(nsData);
        ds.handler = (typeof fn === "function") ? fn : ds.handler;
      } else if (typeof ds.nitroTrigger.handler === "function") {
        ds.handler = ds.nitroTrigger.handler;
      }

      // console.log(this);
      if (ds.nitroTrigger.type === "once" && $(this).is('[data-triggered="true"]')) {
        return;
      }

      function manageTrigger(ob, wp) {
        // console.log({ ob, ds })
        if (ds.nitroTrigger.type === "once") {
          $(ob).attr('data-triggered', true);
          wp.destroy();
          return;
        } else {
          $(ob).attr('data-triggered', "always");
        }
      }

      var waypointInview = new Waypoint.Inview({
        element: ob,
        triggerOnce: true,
        offset: ds.offset,
        enter: function (direction) {
          if (
            config.when.includes("enter") &&
            config.dir.includes(direction)
          ) {
            manageTrigger(this.element, waypointInview);
            // console.log('Playing', this);
            ds.handler({
              direction,
              target: this,
              when: "enter"
            });
          }

        },
        entered: function (direction) {
          // console.log('Entered triggered with direction ' + direction)
          if (
            config.when.includes("entered") &&
            config.dir.includes(direction)
          ) {
            manageTrigger(this.element, waypointInview);

            ds.handler({
              direction,
              target: this,
              when: "entered"
            });
          }
        },
        exit: function (direction) {
          // console.log('Exit triggered with direction ' + direction);
          if (
            config.when.includes("exit") &&
            config.dir.includes(direction)
          ) {
            manageTrigger(this.element, waypointInview);

            ds.handler({
              direction,
              target: this,
              when: "exit"
            });
          }
        },
        exited: function (direction) {
          nsData.when = "exited";
          if (
            config.when.includes("exited") &&
            config.dir.includes(direction)
          ) {
            manageTrigger(this.element, waypointInview);

            ds.handler({
              direction,
              target: this,
              when: "exited"
            });
          }
        }
      });

      // var waypoint = new Waypoint({
      //   element: ob,
      //   offset: ds.offset,
      //   handler: function (direction) {
      //   }
      // });
      // return waypoint;
    });
  };
}(jQuery));

// $(function () {
//   $('[data-nitro-trigger]').NitroScrollTrigger({
//     method: function (ob) {
//       // la.tapinarofBadge.goToAndPlay(0, true);
//     }
//   });
// });

/**
 * @name jsonSql 
 * @version 1.1.2
 * @param {QueryJSON} q
 * @param {Success} success
 * @param {Error} error
 * @date 07-03-2022
 */
function jsonSql(q, success, error) {
  success = (success === undefined) ? function () { } : success;
  error = (error === undefined) ? function () { } : error;
  var res = {
    status: 404,
    data: q.from,
    error: {
      message: q.select + ' with ' + q.where + '(' + typeof q.where + ') Not Found!!!'
    }
  };

  // console.log(q.limit);

  q.limit = q.limit ? q.limit : 1;
  q.limit = typeof q.limit === "string" ? (q.limit !== "first") ? "*" : "first" : parseInt(q.limit);

  // console.log(q.limit);
  var key = q.where.key,
    value = q.where[q.where.condition].value;

  switch (q.where.condition) {
    case 'between':
      // [key, value] = [q.where.key, q.where[q.where.condition].value];
      $.each(q.from, function (_i, v) {
        // console.log('from', v[key.from], ' | to', v[key.to], ' | value', value);
        if (value >= v[key.from] && value <= v[key.to]) {
          res = v;
          return res;
        }
      });
      break;
    case '=':
    case 'equals':
    default:
      // [key, value] = [q.where.key, q.where[q.where.condition].value];
      var tempArr = [];
      if (q.limit === "first") {
        $.each(q.from, function (_i, v) {
          if (v[key] === value) {
            // tempArr.push(v);
            // res = v;
            tempArr = v;
            return tempArr;
          }
        });
      } else {
        // console.log('ELSE', q.from)
        $.each(q.from, function (_i, v) {
          // console.log(v, v[key], value);
          if (v[key] === value) {
            tempArr.push(v);
            if (q.limit === 1) {
              return tempArr;
            }
          }
        });
        res = tempArr;
        // console.log({ tempArr });
        // return res;
      }
      break;
  }

  if (res.status !== 404) {
    res = {
      status: 200,
      data: res
    };
    success(res);
  } else {
    error(res);
  }

  return res;
}

/**!
 * @name formControls
 * @author Ajith S Punalur (ASP)
 * @version 1.0.5
 * @date 22-02-2022
**/
var formControls = {
  init: function () {
    $("label.checkbox > input, label.radio > input").off('focus.input.global').on('focus.input.global', function () {
      var it = $(this).attr('data-parent-class') || $(this).attr('type') || "text";
      // console.log("focus: " + it, this);
      $(this).closest('label.' + it).addClass('focus');
    });
    $("label.checkbox > input, label.radio > input").off('blur.input.global').on('blur.input.global', function () {
      var it = $(this).attr('data-parent-class') || $(this).attr('type') || "text";
      // console.log("focusout: " + it, this);
      $(this).closest('label.' + it).removeClass('focus');
    });
    $("label.checkbox > input, label.radio > input").each(function (_i, el) {
      // console.log($(this).is(':checked'));
      $('label.checkbox, label.radio').removeClass('focus');
      if ($(el).is(':checked')) {
        var n = $(this).attr("name") || "";
        if ($(el).is(':radio')) {
          $("input[type='radio'][name='" + n + "']").each(function (_i, inpEl) {
            $(inpEl).closest('label.radio').removeClass('checked');
          });
          ($(this).is(':checked')) ? $(this).closest('label.radio').addClass('checked') : $(this).closest('label.radio').removeClass('checked');
          return;
        }
        else if ($(this).is('checkbox')) {
          ($(this).find('input[type=checkbox]').is(':checked')) ? $(this).addClass('checked') : $(this).removeClass('checked');
        }
      }
    });
    $('label.checkbox, label.radio, input:checkbox, input:radio')
      .off('click.input.global change.input.global input.input.global')
      .on('click.input.global change.input.global input.input.global', function (e) {
        if ($(this).is('.disabled') || $(this).is(':disabled')) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        $('label.checkbox, label.radio').removeClass('focus');
        if ($(this).is('label')) {
          $(this).find('input[type=checkbox]').trigger('focus');
          if ($(this).find('input[type=checkbox]').length > 0) {
            // console.log($(this).find('input[type=checkbox]').prop('checked'));
            ($(this).find('input[type=checkbox]').is(':checked')) ? $(this).addClass('checked') : $(this).removeClass('checked');
            $(this).trigger('focus');
            return;
          }
          if ($(this).find('input:radio').length > 0) {
            $(this).find('input[type=radio]').trigger('focus');
            ($(this).find('input:radio:checked')) ? $(this).addClass('checked') : $(this).removeClass('checked');
            $(this).trigger('focus');
          }
        }
        if ($(this).is('input')) {
          var n = $(this).attr("name");
          $(this).trigger('focus');
          if ($(this).closest('label.checkbox').length > 0) {
            // console.log($(this).find('input[type=checkbox]').prop('checked'));
            ($(this).is(':checked')) ? $(this).closest('label.checkbox').addClass('checked') : $(this).closest('label.checkbox').removeClass('checked');
            return;
          }
          if ($(this).closest('label.radio').length > 0) {
            // console.log($(this).find('input[type=radio]').prop('checked'));
            $("input[type='radio'][name='" + n + "']").each(function (_i, el) {
              $(el).closest('label.radio').removeClass('checked');
            });
            ($(this).is(':checked')) ? $(this).closest('label.radio').addClass('checked') : $(this).closest('label.radio').removeClass('checked');
            return;
          }
        }
      });
  },
  set: function (ob, v) {
    if ($(ob).is('[type=checkbox]') || $(ob).is('[type=radio]')) {
      var s = getBoolean(v),
        type = $(ob).attr('type');
      if (s) {
        $(ob).closest('.' + type).addClass('checked');
      } else {
        $(ob).closest('.' + type).removeClass('checked');
      }
      $(ob).prop('checked', s);
    } else {
      $(ob).val(v);
    }
  }
};

/**!
 * @name FormToJson
 * @param {*} elements
 * @version 1.3.1
 * @date 04-05-2022
 */
var formToJSON = function (elements) {
  var _data = undefined;
  _data = Array.prototype.reduce.call(elements, function (data, element) {
    // Make sure the element has the required properties.
    if (isValidElement(element)) {
      // console.log(element);
      var elName = element.dataset.name ? element.dataset.name : element.name;
      if (element.type === 'radio' || element.type === 'checkbox') {
        if (element.type === 'radio' || getBoolean(element.dataset.checkgroup)) {
          if (getBoolean(element.checked)) {
            if (getBoolean(element.dataset.array)) {
              if (data[elName] === undefined) {
                data[elName] = [element.dataset.value];
              } else if (data[elName].length > 0) {
                data[elName].value.push(element.dataset.value);
              } else {
                data[elName] = [element.dataset.value];
              }
            } else {
              // console.log({element});
              var t = data[elName];
              // console.log({ type: element.dataset.name })
              data[elName] = (t !== undefined) ?
                t + ',' + (element.dataset.value || element.value) : element.dataset.value || element.value;

              // console.log({
              //   type,
              //   name: data[elName],
              //   value: (t !== undefined) ? t + ',' + element.dataset.value : element.dataset.value
              // });
            }
          }
          // data[
          //   elName
          // ] = element.dataset.value;// getBoolean(element.checked);
        } else if (element.type === 'checkbox') {
          data[elName] = getBoolean(element.checked);
        } else {
          data[elName] = element.value;
        }

        // if (element.type === 'checkbox') {
        //   data[element.name] = getBoolean(element.checked);
        // } else {
        //   data[element.name] = getSelectedValue('[name="' + element.name + '"]')
        //   // console.log(data[element.name]);
        // }
      } else if (element.type === 'select-multiple') {
        data[elName] = getAllSelectedValues(element);
      } else {
        data[elName] = element.value.trim();
      }
    }

    _data = data;
    return data;
  }, {});

  // console.log(_data);
  return _data;
}, isValidElement = function (element) {
  return element.name && element.value;
}, getAllSelectedValues = function (ob) {
  var selVal = [];
  $(ob).find(":selected").each(function () {
    selVal.push($(this).val());
  });
  return selVal;
}, getSelectedValue = function (ob) {
  var value;
  $(ob).each(function (_i, el) {
    // console.log(el);
    if ($(el).is(":checked")) {
      value = $(el).attr('data-value') || $(el).val();
    }
  });

  return value || '';
};

$(function () {
  formControls.init();

  $('[data-control="dialog"]').NitroDialog({
    backdrop: true
  });

  // $('[data-control="material"]').NitroForm({
  //   floatingLabel: true,
  //   placeholderLabel: true
  // });

  // /* Table Sorter */
  // $('[aria-table-sort="true"]').each(function (_i, el) {
  //   $(el).tablesorter({
  //     textExtraction: function (node) {
  //       // iterates all childs elements inside td and return data from the last child
  //       if (node === null) { return null; }
  //       node = $(node);
  //       while (node.children().length > 0) { node = node.children(":first"); }
  //       if (node[0].tagName.toUpperCase() === "INPUT") {
  //         if (node.attr("type").toUpperCase() === "CHECKBOX") {
  //           return node.attr("checked").toString();
  //         } else {
  //           return $.trim(node.val());
  //         }
  //       } else {
  //         return $.trim(node.text());
  //       }
  //     },
  //     headers: {
  //       // disable sorting of the first & second column - before we would have to had made two entries
  //       // note that "first-name" is a class on the span INSIDE the first column th cell
  //       '.disabled': {
  //         // disable it by setting the property sorter to false
  //         sorter: false
  //       }
  //     }
  //   });
  // });
});
