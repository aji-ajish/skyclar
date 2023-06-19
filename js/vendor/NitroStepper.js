/**!
 * @name NitroStepper
 * @version 1.0.0
 * @author Ajith S Punalur (ASP)
 * @license MIT
 * @date 08/10/2020 (dd/mm/yyyy)
 */
$.fn.NitroStepper = function (data) {
  this.each(function (i, ob) {
    var ds = $(ob).data();
    var active = $('.tab-pane.active');

    data.basePath = ds.basePath || data.basePath || './forms';
    data.dev = data.dev ? data.dev : false;
    // console.log(ds, data);

    // INIT
    data.id = $(active).attr('id');
    nsLoadStep(ob, data);

    $(ob).find('[data-template]').off('show.bs.tab.stepper').on('show.bs.tab.stepper', function (e) {
      data.id = $(e.target).attr('href').split('#')[1];
      data.event = e;
      // console.log(data.id, e.relatedTarget);
      if (nsValidate('#' + $(e.relatedTarget).attr('href').split('#')[1])) {
        nsLoadStep(ob, data);
      } else {
        e.preventDefault();
        // $(e.relatedTarget).tab('show');
      }
    });

    // private Methods
    function nsLoadStep(ob, data) {
      $('.tab-content').addClass('onLoading');
      var url = $('[href="#' + data.id + '"]').attr('data-template');
      // console.log(data.id, url, ob);
      if (!$(ob).find('#' + data.id).is('.loaded')) {
        $(ob).find('#' + data.id).load(data.basePath + '/' + url, function (html, response) {
          // console.log(html);
          // console.log(data.basePath + '/' + url);
          if (response !== 'success') {
            console.warn(response);
            if (dev) {
              if (html === undefined) {
                console.info('Hi DEV!,\nPlease check the template URL is valid or not!!\n\t' + data.basePath + '/' + url);
              }
            }
            $('#dialog').NitroDialog({
              action: "open",
              width: '320px',
              height: 'auto',
              class: "thanksDialog",
              message: '<h2 class="h4 f-heavy p-b-10 m-b-15">'
                + '<i class="i i-warning text-warning m-r-10"></i>'
                + 'Something went wrong!!'
                + '</h2>'
                + '<div class="dtl">'
                + 'Please try again later!'
                + '</div>',
              backdrop: true,
              keyboard: true,
              dismissible: true,
              buttons: [
                {
                  class: 'btn-accent',
                  label: 'OK',
                  action: function () {
                    console.log('Choosen OK');
                    $('#dialog').NitroDialog({ action: 'close' });
                  }
                }
              ]
            });
            $(data.event.relatedTarget).tab('show');
          }
          nsNavInit();
          $(ob).find('#' + data.id).addClass('loaded');
          $('.tab-content').removeClass('onLoading');
        });
      } else {
        // console.log('form cache');
      }
    }

    function nsNavInit() {
      $(ob).find('[data-nav]').off('click.navigate').on('click.navigate', function () {
        var nav = $(this).attr('data-nav');
        if (nsValidate($(this).closest('.nitroStep'))) {
          $(ob).find('[href="#' + nav + '"]').tab('show');
        }
      });

      $(ob).find('.form-control').off('input.fc blur.fc').on('input.fc blur.fc', function (e) {
        isValid(this);
      });

      $(ob).find('select').off('change.fc blur.fc').on('change.fc blur.fc', function (e) {
        isValid(this);
      });

      function isValid(el) {
        if ($(el).is(':invalid')) {
          $(el).closest('.form-group').addClass('is-invalid');
        } else {
          $(el).closest('.form-group').removeClass('is-invalid');
        }
      }
    }

    function nsValidate(nav) {
      console.log(nav);
      if ($(nav).find(':invalid').length <= 0) {
        console.log('PASSPORT'); // $(ob).find('[href="#' + nav + '"]'));
        return true;
      } else {
        // console.log($(nav).find('form :invalid')[0]);
        $(nav).find('.form-group').removeClass('is-invalid');

        $(nav).find('form :invalid').each(function (i, el) {
          $(el).closest('.form-group').addClass('is-invalid');
        });
        $($(nav).find('form :invalid')[0]).trigger('focus');
        console.log('BLOCK');
        return false;
      }
    }
  });
};