/**!
* @name NitroForm
* @version 1.0.b
* @author Ajith S Punalur (ASP)
* @license MIT
*/

(function ($) {
  $.fn.setVal = function (v) {
    var p = $(this).val(),
      c = Array.prototype.slice.call(arguments, 1);
    $(this).val(v).change();
    if (c.length !== undefined && c.length > 0 && typeof c === "function") {
      c(p, v);
    }
    return this;
  };
  $.fn.getVal = function () {
    return $(this).val();
  };
  $.fn.NitroValidate = function (opt) {
    var State;
    (function (State) {
      State[State["Error"] = 0] = "Error";
      State[State["Success"] = 1] = "Success";
      State[State["Warning"] = 2] = "Warning";
      State[State["Default"] = 3] = "Default";
    })(State || (State = {}));;
    var o = {
      val: $(this).val(),
      message: {
        type: "",
        text: ""
      }
    };
    $.extend(o, opt);
    o.message.type = o.message.type.toTitleCase();
    for (key in o) {
      if (typeof o[key] === 'object') {
        if (key === 'message') {
          $(this).closest('.mtl').removeClass('onError onSuccess onWarning');
          if (o[key]['type'] !== "Default" || o[key]['type'] !== "") {
            $(this).closest('.mtl').addClass('hasMessage on' + o[key]['type']);
            $(this).next('label').find('small').html(o[key]['text']);
          } else {
            $(this).closest('.mtl').removeClass('hasMessage onError onSuccess onWarning');
          }
        }
      } else {
        if (o.hasOwnProperty('attr')) {
          if ($(this).length > 0) {
            if ($(o[key]).is('input:checkbox') || $(o[key]).is('input:radio')) {
              $(this)[0].checked = true;
            } else if ($(o[key]).is('[data-range-slider]')) {
              $(o[key]).slider('value', o['attr']);
            } else {
              $(this).attr(o['attr']);
            }
          }
        }
        if (o.hasOwnProperty('removeAttr')) {
          $(this).removeAttr(o['removeAttr']);
        }
        if (o.hasOwnProperty('removeClass')) {
          $(this).removeClass(o['removeClass']);
        } else if (o.hasOwnProperty('class')) {
          $(this).addClass(o['class']);
        } else if (o.hasOwnProperty('val')) {
          $(this).val(o['val']).trigger('change');
        } else if (o.hasOwnProperty('text')) {
          if ($(this).length > 0) {
            $(this).text(o['text']);
          }
        } else if (o.hasOwnProperty('template')) {
          if ($(this).length > 0) {
            $(this).html(o['template']);
          }
        }
      }
    }
    $(this).NitroForm({});
  };
  $.fn.NitroForm = function (custom) {
    var op = {
      "class": "",
      "message": ""
    },
      mtlClass = 'mtl';

    custom.floatingLabel = (custom.floatingLabel === undefined) ? true : custom.floatingLabel;
    custom.placeholderLabel = (custom.placeholderLabel === undefined) ? true : custom.placeholderLabel;
    custom.validatorMessage = (custom.validatorMessage === undefined) ? false : custom.validatorMessage;
    custom.validation = (custom.validation === undefined || getBoolean(custom.validation) === false) ? ["", "*"] : custom.validation;
    // custom.validatorMessage = (custom.validatorMessage === undefined) ? false : custom.validatorMessage;

    this.each(function (i, el) {
      var mtlWrap = $(el).parents('.' + mtlClass).length,
        mtl = $(el).parent('.' + mtlClass),
        ds = $(el).data(),
        attr = el.attributes;
      if (isElemSupportsAttr(el.tagName, "id")) {
        (attr.id === undefined) ? el.setAttribute('id', 'mtl-ctrl_' + new Date().getTime()) : attr["id"];
        attr = el.attributes;
      } else {
        attr["id"] = (attr.id === undefined) ? document.createAttribute('id') : attr["id"];
        attr["id"].value = (attr.id.value === '') ? ('mtl-ctrl_' + new Date().getTime()) : attr["id"].value;
      }

      ds.floatingLabel = (ds.floatingLabel === undefined) ? custom.floatingLabel : getBoolean(ds.floatingLabel);
      ds.placeholderLabel = (ds.placeholderLabel === undefined) ? custom.placeholderLabel : getBoolean(ds.placeholderLabel);
      ds.validatorMessage = (ds.validatorMessage === undefined) ? custom.validatorMessage : getBoolean(ds.validatorMessage);
      ds.validation = (ds.validation === undefined || ds.validation !== "mandatory") ? custom.validation : ds.validation;

      if (ds.validation === undefined) {
        ds.validation = custom.validation;
      } else if (typeof ds.validation !== 'object') {
        ds.validation = ds.validation.split('|');
      }

      opt = {
        width: ds.width || '100%',
        validation: ds.validation,
        class: ds.class || custom.class,
        label: ds.label || custom.label,
        floatingLabel: ds.floatingLabel,
        validatorMessage: ds.validatorMessage,
        message: ds.message || custom.message,
        placeholderLabel: ds.placeholderLabel,
        placeholder: ds.placeholder || custom.placeholder,
        type: ds.type || $(el).attr('type') || $(el).prop("tagName").toLowerCase()
      };

      opt.class = (opt.class === undefined) ? '' : opt.class;
      $.extend(op, opt);

      if (ds.validatorMessage === false) {
        opt.class = opt.class + " mtl-no-message";
      }

      // init
      if (mtlWrap === 0) {
        $(el).wrap("<div class='" + mtlClass + " " + opt.class + "'></div>");
      } else if (mtlWrap > 1) {
        while (mtlWrap > 1) {
          $($(el).parents('.' + mtlClass)[mtlWrap - 1]).removeClass(mtlClass);
          mtlWrap = $(el).parents('.' + mtlClass).length;
        }
      }

      $(el).closest('.' + mtlClass).addClass(opt.class);

      if ($(el).is(':disabled')) {
        $(el).closest('.' + mtlClass).addClass('disabled');
      }

      // Type of Control
      $(el).parent('.' + mtlClass).addClass(mtlClass + '-' + op.type).attr('data-type', op.type);

      if (getBoolean(op.placeholderLabel) === true && $(el).parent('.' + mtlClass).length === 1) {
        var lbl = $(el).attr('data-placeholder') || $(el).attr('data-label') || $(el).attr('placeholder') || '';
        if (
          lbl !== undefined &&
          $(el).parent('.' + mtlClass).find('.mtl-label').length <= 0
        ) {
          if ($.trim(op.validation[0]) !== '') {
            lbl = lbl + "<i>" + op.validation[1] + "</i>";
          }
          $(el).parent('.' + mtlClass).append
            ('<label class="mtl-label" for="' + attr["id"].value + '">' + lbl + '<small>' + op.message + '</small></label>');
          $(el).removeAttr('placeholder').removeAttr('data-label');
        }
      } else if (
        getBoolean(op.placeholderLabel) === false &&
        $(el).parent('.' + mtlClass).length === 1
      ) {
        $(el).parent('.' + mtlClass).addClass(mtlClass + '-no-label');
        var lbl = $(el).attr('data-placeholder') || $(el).attr('data-label') || $(el).attr('placeholder') || '';
        if (
          lbl !== undefined &&
          $(el).parent('.' + mtlClass).find('.mtl-label').length <= 0
        ) {
          $(el).parent('.' + mtlClass).append('<label class="mtl-label" for="' + attr["id"].value + '"><small>' + op.message + '</small></label>');
        }
      }

      // if (op.placeholder !== '' && op.placeholder !== undefined) {
      // }

      if (getBoolean(op.floatingLabel) === true && getBoolean(op.placeholderLabel) === true) {
        $(el).parent('.' + mtlClass).addClass(mtlClass + '-floatingLabel');
      } else {
        $(el).parent('.' + mtlClass).removeClass(mtlClass + '-floatingLabel');
      }

      // switch ($(el).parent('.' + mtlClass).attr('data-type')) {
      // 	case 'search':
      // 		//$(el).parent('.' + mtlClass).append('<a href="javascript:;" class="btn"><i class="fa fa-search"></i></a>');
      // 		break;
      // 	// default:
      // 	// break;
      // }

      $(el).off('focus.material').on('focus.material',
        function () {
          $(this).closest('.' + mtlClass).addClass('focus');
        });
      $(el)
        .off('change.material input.material click.material blur.material propertychange.material paste.material')
        .on('change.material input.material click.material blur.material propertychange.material paste.material',
          function () {
            if ($.trim($(this).val()) === '') {
              $(this).parent('.' + mtlClass).removeClass('hasValue');
            } else {
              $(this).parent('.' + mtlClass).addClass('hasValue');
            }
          });

      $(el).off('blur.material').on('blur.material', function () {
        $(this).parent('.' + mtlClass).removeClass('focus');
      });

      if ($(el).val() !== '') {
        $(el).parent('.' + mtlClass).addClass('hasValue');
      }
      // $(el).click();
    });
    return this;
  };
}(jQuery));