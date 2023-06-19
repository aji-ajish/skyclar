/*!
 * Author: 21grams
 * Copyright @ 2023 21grams
 */

var aniGroup = "animate__bounceIn animate__bounceInDown animate__bounceInLeft animate__bounceInRight animate__bounceInUp animate__fadeIn animate__fadeInDown animate__fadeInDownBig animate__fadeInLeft animate__fadeInLeftBig animate__fadeInRight animate__fadeInRightBig animate__fadeInUp animate__fadeInUpBig animate__flip animate__flipInX animate__flipInY animate__lightSpeedIn animate__rotateIn animate__rotateInDownLeft animate__rotateInDownRight animate__rotateInUpLeft animate__rotateInUpRight animate__slideInUp animate__slideInDown animate__slideInLeft animate__slideInRight animate__zoomIn animate__zoomInDown animate__zoomInLeft animate__zoomInRight animate__zoomInUp animate__hinge animate__jackInTheBox animate__rollIn animate__bounceOut animate__bounceOutDown animate__bounceOutLeft animate__bounceOutRight animate__bounceOutUp animate__fadeOut animate__fadeOutDown animate__fadeOutDownBig animate__fadeOutLeft animate__fadeOutLeftBig animate__fadeOutRight animate__fadeOutRightBig animate__fadeOutUp animate__fadeOutUpBig animate__flipOutX animate__flipOutY animate__lightSpeedOut animate__rotateOut animate__rotateOutDownLeft animate__rotateOutDownRight animate__rotateOutUpLeft animate__rotateOutUpRight animate__slideOutUp animate__slideOutDown animate__slideOutLeft animate__slideOutRight animate__zoomOut animate__zoomOutDown animate__zoomOutLeft animate__zoomOutRight animate__zoomOutUp animate__rollOut animate__bounce animate__flash animate__pulse animate__rubberBand animate__shake animate__swing animate__tada animate__wobble animate__jello";

var animationend = "webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend",
  animationstart = "webkitAnimationStart oAnimationStart MSAnimationStart animationstart",
  transitionend = "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend";

var isScrollDirToBottom = true;

var sublinks = $('.subHeader').length > 0 ? $('.subHeader [href]') : [];

var _UTM_DATA = {
  utm_term: getParameterByName("utm_term", false) || "",
  SourceURL: getParameterByName("SourceURL", false) || "",
  Referrer: getParameterByName("Referrer", false) || "WEB",
  utm_medium: getParameterByName("utm_medium", false) || "",
  utm_source: getParameterByName("utm_source", false) || "",
  utm_content: getParameterByName("utm_content", false) || "",
  utm_campaign: getParameterByName("utm_campaign", false) || "",
  InferredSource: getParameterByName("InferredSource", false) || "WEB"
};

function getUtm() { return _UTM_DATA; }

$(function () {
  "use strict";
  themeManager();
  page.init();
  page.refresh();

  isiInit();
  isiManager('#isi');

  $('[data-rel="tooltip"]').tooltip();

  // Remove links that don't actually link to anything
  $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').not('[data-toggle]').on('click', function (event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var offset = 0,
        target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        console.log({ isScrollDirToBottom });
        event.preventDefault();
        document.querySelector('html').scrollTo({
          left: 0,
          behavior: 'smooth',
          top: target.offset().top - offset
        });

        if (this.hash === '#isi') {
          $('#navbarMainMenu').collapse('hide');
        }

        // $('html, body').animate({
        //   scrollTop: target.offset().top
        // }, 1000, function () {
        //   // Callback after animation
        //   // Must change focus!
        //   var $target = $(target);
        //   $target.focus();
        //   if ($target.is(":focus")) {
        //     // Checking if the target was focused
        //     $('.sideMenu .active').removeClass('active');
        //     if ($(ob).closest('.sideMenu').length > 0) {
        //       $(ob).closest('li').addClass('active');
        //     }
        //     return false;
        //   } else {
        //     $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
        //     $target.focus(); // Set focus again
        //     $('.sideMenu .active').removeClass('active');
        //     if ($(ob).closest('.sideMenu').length > 0) {
        //       $(ob).closest('li').addClass('active');
        //     }
        //   };
        // });
      }
    }
  });

  $('.openGraph').on('click', function () {
    var url = $(this).attr('data-url');
    popup.open('#popupGraphViewer', 100, 100/* height */, {
      units: '%',
      scroll: false,
      animateIn: "fadeIn",
      set: {
        datatype: 'json',
        data: [
          {
            selector: '.scrollImg img',
            attr: {
              src: url
            }
          },
          {
            selector: '.scrollImg source',
            attr: {
              srcset: url
            }
          }
        ]
      },
      events: {
        opened: function (ev) {
          setTimeout(() => {
            // console.log(ev);
            $(ev.target).find('.instruction').addClass('disabled');
          }, 3000);
        },
        closed: function (ev) {
          $(ev.target).find('.instruction').removeClass('disabled');
        }
      }
    });
  });

  $('[data-external-site="true"]').on('click', function (e) {
    e.preventDefault();
    var url = $(this).attr('href');
    popup.open('#popupLeaveSite', 100, 100, {
      units: '%',
      animateIn: "fadeIn",
      oClass: '_popUpOverlay',
      set: {
        datatype: 'json',
        data: [
          {
            selector: '.heading',
            html: CONFIG.leaveSite.title
          },
          {
            selector: '.content',
            html: CONFIG.leaveSite.content
          },
          {
            selector: '.btnContinue',
            attr: { href: url }
          }
        ]
      }
    });
  });

  $('.btnRedirectHCP').on('click.ishcp', function (e) {
    e.preventDefault();

    openHcpConfirmModal({
      hcpRedirect: true
    });
    // if (!getBoolean(localStorage.getItem('skyclIsHCP'))) {
    //   openHcpConfirmModal({
    //     hcpRedirect: true
    //   });
    // } else {
    //   location.replace($(this).attr('href'));
    // }
  });

  $('#navbarMainMenu').on('show.bs.collapse', function () {
    $('header.header').addClass('menuOpened');
    $('.ISI').addClass('d-none');
  });
  $('#navbarMainMenu').on('hide.bs.collapse', function () {
    $('header.header').removeClass('menuOpened');
    $('.ISI').removeClass('d-none');
  });

  var fcValidityTimer = setTimeout(() => { });
  $('button[type="submit"]').off('click.form').on('click.form', function () {
    formControlValidator($(this).closest('form'));
  });

  $('input, select, textarea').off('input.fc blur.fc').on('input.fc blur.fc', function () {
    // console.log('...');
    clearTimeout(fcValidityTimer);
    fcValidityTimer = setTimeout(() => {
      // console.log('Checking form validity');
      formControlValidator(this);
    }, 500);
  });

  $('.SumoSelect select').on('sumo:closed', function (sumo) {
    // console.log(sumo);
    clearTimeout(fcValidityTimer);
    fcValidityTimer = setTimeout(() => {
      // console.log('Checking form validity');
      formControlValidator(sumo.currentTarget);
    }, 300);
  });

  $('input:not(:checkbox):not(:radio), textarea').off('blur.fc').on('blur.fc', function () {
    $(this).val($(this).val().trim()).trigger('input');
  });

  $('input, select, textarea').off('input.fc blur.fc').on('input.fc blur.fc', function () {
    // console.log('...');
    clearTimeout(fcValidityTimer);
    fcValidityTimer = setTimeout(() => {
      // console.log('Checking form validity');
      formControlValidator(this);
    }, 500);
  });

  $('.btnScrollTop').on('click.scrolltop', function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1000);
  });

});

$(window).on('resize', function () {
  "use strict";
  page.getRatio();
  page.refresh();
});

var scrollspyTimer = setTimeout(() => { });
$(window).on('scroll', function () {
  "use strict";
  clearTimeout(scrollspyTimer);
  isScrollDirToBottom = (this.oldScroll > this.scrollY) ? false : true;
  this.oldScroll = this.scrollY;
  if ($(window).scrollTop() > 300 && isScrollDirToBottom) {
    $('body').addClass('zenMode');
    $('.ISI').removeClass('active');
    setTimeout(() => {
      $('#navbarMainMenu').collapse('hide');
    }, 0);
  } else {
    $('body').removeClass('zenMode');
  }

  if ($(window).scrollTop() > ($(window).height() - $('.ISI').height())) {
    $('.subHeader').addClass('active');
  } else {
    $('.subHeader').removeClass('active');
  }

  // console.log(sublinks);
  if (sublinks.length > 0) {
    var gutter = $('.subHeader').height() + 5;
    $.each(sublinks, function (_i, el) {
      // console.log(el.hash, $(el.hash).offset().top);
      if ($(window).scrollTop() >= ($(el.hash).offset().top - gutter)) {
        $('.subHeader a[href]').removeClass('active');
        if (!($('.subHeader').find(`[href="${el.hash}"]`).is(':active'))) {
          scrollToActiveTab(this, el);
        }
        if ($(window).scrollTop() <= $(el.hash).offset().top + $(el.hash).height()) {
          $('.subHeader').find(`[href="${el.hash}"]`).addClass('active');
          // console.log($('.subHeader').find(`[href="${el.hash}"]`).offset().left, $('.subHeader').find(`[href="${el.hash}"]`).position().left);

          scrollspyTimer = setTimeout(() => {
            scrollToActiveTab(this, el);
          }, 500);
          // console.log({
          //   offset: $('.subHeader').find(`[href="${el.hash}"]`).offset().left,
          //   position: $('.subHeader').find(`[href="${el.hash}"]`).position().left
          // });
        } else {
          $('.subHeader').find(`[href="${el.hash}"]`).removeClass('active');
        }
      }
    });
  }

  isiManager('#isi');
});

var page = {
  width: $(window).width(),
  height: $(window).height(),
  init: function () {
    page.getRatio();
    // new WOW().init();

    // openHcpConfirmModal({}); // Uncomment if needed to popup on HCP site entry
  },
  refresh: function () {
    "use strict";
    carousel.init();
    formControls.init();

    page.reInitLayout();

    if ($(window).width() > 991) {
      $('.menuOpened').removeClass('menuOpened');
    }
  },
  getRatio: function () {
    "use strict";
    this.width = $(window).width();
    this.height = $(window).height();
  },
  // reset: function () {
  //   var tab = getParameterByName('view');
  //   if (tab) {
  //     $('a[href="#' + tab + '"]').tab('show');
  //   }
  // },
  reInitLayout: function () {
    "use strict";
    page.getRatio();

    var
      hh = $('header.header').outerHeight(true),
      fh = $('footer.footer').outerHeight(true),
      sHh = $('header.header .subHeader').outerHeight(true);

    hh = hh || 0;
    fh = fh || 0;
    sHh = sHh || 0;

    $('html').css({
      '--app-subheader-height': `${sHh}px`,
      '--app-header-height': `${$('.navbar-brand').height() + ($('.nanoNav').is(':visible') ? $('.nanoNav').height() : 0) + sHh}px`
    });

    $('main').css('min-height', page.height - (/* hh +  */fh));
    // if (page.width < 768) {
    //   $('.sideBar').css('min-height', '');
    // }

    refreshVideoPlayer();
  },
  set: function (selector, config) {
    popup.setData(selector, config);
  },
  loader: function (op, selector) {
    op = (op === undefined) ? true : getBoolean(op);
    selector = !(isNull(selector)) ? $(selector).length ? selector : 'body' : 'body';
    if (op) {
      $(selector).addClass('onLoading');
    } else {
      $(selector).removeClass('onLoading');
    }
  }
};

function scrollToActiveTab(ob, el) {
  $(ob).closest('.subHeader')[0].scrollTo({
    top: 0,
    left: $('.subHeader').find(`[href="${el.hash}"]`).position().left,
    behavior: "smooth"
  });
}

function openVideoPlayer(url, autoplay) {
  autoplay = autoplay ? getBoolean(autoplay) : true;
  var dim = getVideoDimensions(),
    param = url.includes('?') ? '&' : '?';
  popup.open('#popupVideo', dim.width, dim.height, {
    units: 'px',
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    oClass: 'videoOverlay',
    xsource: url + (autoplay ? param + 'autoplay=1' : ''),
    set: {
      datatype: 'json',
      data: [
        {
          selector: 'iframe',
          attr: {
            webkitallowfullscreen: true,
            mozallowfullscreen: true,
            allowfullscreen: true,
            allow: "autoplay; fullscreen; picture-in-picture"
          }
        }
      ]
    }
  });
}

function getVideoDimensions() {
  var videoRatio = CONFIG.videoRatio || (1920 / 1080);
  var dim = {
    width: $(window).width() >= 1024 ? 1024 : $(window).width(),
    height: $(window).height() >= 576 ? 576 : $(window).height()
  };

  dim.height = dim.width / videoRatio;
  return dim;
}

function refreshVideoPlayer() {
  var dim = getVideoDimensions();
  // console.log(dim);
  if ($('#popupVideo').is('.open')) {
    popup.reset('#popupVideo', {
      width: dim.width,
      height: dim.height
    });
  }
}

function initVideoPlayer() {
  $('[data-videoplayer]').off('click.video').on('click.video', function () {
    openVideoPlayer($(this).attr('data-videoplayer'));
  });
}

function openHcpConfirmModal(ob) {
  ob = ob || {};
  // console.log('hcp: ', getBoolean(ob.hcpRedirect));
  // console.log(location.href.includes('hcp'));
  ob.hcpRedirect = getBoolean(ob.hcpRedirect) ?
    getBoolean(ob.hcpRedirect) : location.href.includes('hcp');

  localStorage.removeItem('skyclIsHCP');

  if (ob.hcpRedirect /* && !getBoolean(localStorage.getItem('skyclIsHCP')) */) {
    popup.open('#popupAreUSure', 100, 100,
      {
        units: '%',
        animateIn: 'zoomIn',
        animateOut: 'zoomOut',
        oClass: '_popUpOverlay',
        set: {
          datatype: 'json',
          data: [
            {
              selector: '.btnContinue',
              attr: {
                href: CONFIG.hcp
              }
            },
            {
              selector: '.btnCancel',
              attr: {
                href: CONFIG.dtc
              }
            },
            {
              selector: '.heading',
              html: "You have selected to view information that is intended for US healthcare providers only."
            },
            {
              selector: '.content',
              html: "By clicking “Continue,” you certify that you are a US healthcare professional. You can click “Cancel” to stay on this site and learn more about SKYCLARYS."
            }
          ]
        }
      }
    );
  }

  $('.btnContinue').off('click.ishcp').on('click.ishcp', function () {
    // localStorage.setItem('skyclIsHCP', true);
    if (!location.href.includes('hcp')) {
      location.replace($(this).attr('data-redirect'));
    } else {
      popup.close($(this).closest('.popup'));
    }
  });

  $('.btnCancel').off('click.isdtc').on('click.isdtc', function () {
    // localStorage.removeItem('skyclIsHCP');
    if (location.href.includes('hcp')) {
      location.replace($(this).attr('data-redirect'));
    } else {
      popup.close($(this).closest('.popup'));
    }
  });

}

function formControlValidator(ob) {
  // console.log(ob);
  if ($(ob)[0].localName === 'form') {
    $(ob).find('.form-group').removeClass('valid notValid');
    if ($(ob).find(':valid').length > 0) {
      $(ob).find(':valid').each(function (_i, el) {
        $(el).closest('.form-group').addClass('valid').removeClass('notValid');
      });
    }
    if ($(ob).find(':invalid').length > 0) {
      $(ob).find(':invalid').each(function (_i, el) {
        $(el).closest('.form-group').addClass('notValid').removeClass('valid');
      });
    }

    setTimeout(() => {
      if ($(ob).find('.notValid').length > 0) {
        document.querySelector('html').scrollTo({
          top: ($($(ob).find('.notValid')[0]).offset().top - ($('header.header').height())),
          left: 0,
          behavior: 'smooth'
        });
      }
    }, 0);

  } else if ($(ob).is(':input')) {
    $(ob).closest('.form-group').removeClass('valid notValid');
    if ($(ob).is(':valid')) {
      if ($(ob).is('.search-txt')) {
        if ($(ob).closest('.SumoSelect').find('.SumoUnder').is(':invalid')) {
          $(ob).closest('.form-group').addClass('notValid').removeClass('valid');
          return;
        }
      }
      $(ob).closest('.form-group').addClass('valid').removeClass('notValid');
    }

    if ($(ob).is(':invalid')) {
      $(ob).closest('.form-group').removeClass('valid').addClass('notValid');
    } else if ($(ob).is('.search-txt')) {
      if ($(ob).closest('.SumoSelect').find('.SumoUnder').is(':invalid')) {
        $(ob).closest('.form-group').removeClass('valid').addClass('notValid');
      }
    }
  } else {
    if (CONFIG.dev) {
      console.log('Not a form control');
    }
    return;
  }
}

// function getAPI(key, type) {
//   type = type || 'get';
//   type = type.toLowerCase();

//   return CONFIG.apiUrl + key + (type === 'get' ? '?GK=' + CONFIG.accessKey : '');
// }

function openDialog(params) {
  // console.log('ERROR DIALOG');
  params = Object.assign({
    type: 'error',
    message: {
      icon: 'i-warning text-warning',
      title: 'Something went wrong',
      details: 'Please try again later'
    },
    callback: function () { }
  }, params);
  // console.log(params);

  $('#dialog .btn-close').off('click.dclose').on('click.dclose', function () {
    $('#dialog').NitroDialog({
      action: "close"
    });
    params.callback();
  });

  $('#dialog').NitroDialog({
    action: "open",
    backdrop: true,
    message: `
     <h3 class="bold m-b-15">
       <i class=" i ${params.message.icon} m-r-10"></i>
       ${params.message.title}
     </h3>
     <div class="t-c mt-1">${params.message.details}</div>
    `,
    buttons: [{
      label: 'OK',
      class: "btn btn-outline-accent min w-120px",
      action: function () {
        $('#dialog').NitroDialog({
          action: "close"
        });
        params.callback();
      }
    }]
  });
}

function isiInit() {
  $('.ISI .content').html($('#isi .content').html());
  $('.btn-isiToggle').off('click.isi').on('click.isi', function () {
    $('.ISI .content').scrollTop(0);
    $('.ISI').toggleClass('active');
    $('.zenMode').removeClass('zenMode');
    $('.ISI .btn-isiToggle > .i').attr({
      title: $('.ISI').is('.active') ? 'Minimize Important Safety Information' : 'Expand Important Safety Information',
      'aria-label': $('.ISI').is('.active') ? 'Minimize Important Safety Information' : 'Expand Important Safety Information'
    });
  });
}

function isiManager(trigger) {
  if ($(trigger).length <= 0) { return; }
  var oHgt = $('.ISI').height(),
    tgt = $(trigger).position().top;

  page.getRatio();

  // console.log($(window).scrollTop());
  // console.log($(window).scrollTop(), page.height, oHgt, tgt);
  // console.log(((page.height - oHgt) + $(window).scrollTop()));
  if (tgt <= ((page.height - oHgt) + $(window).scrollTop())) {
    $('.ISI').hide();
  } else {
    $('.ISI').show();
  }
}

$(document).ajaxStart(function () {
  page.loader(true);
});

$(document).ajaxStop(function () {
  page.loader(false);
});