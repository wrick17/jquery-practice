(function () {

  var mains = $('.mains'),
  optional = $('.optional'),
  selected = $('.selected'),
  totalMains = mains.find('tbody tr td input:checkbox').length,
  selectedMains = 0,
  totalOptional = optional.find('tbody tr td input:checkbox').length,
  selectedOptional = 0;
  subName = null,
  entry = null,
  body = $('body'),
  tabName = null,
  tabs = $('.tab'),
  panes = $('.tab-pane');

  init();

  function init () {

    body.on('click', '.tab', function(event) {
      tabName = '.' + $(this).text().toLowerCase();
      tabs.removeClass('active');
      panes.removeClass('active');
      $(this).addClass('active');
      $(tabName).addClass('active');
    });

    mains.on('click', '.main-sub', function(event) {

      subName = $(this).parent().text();
      if ($(this).is(':checked')) {

        selected.find('tbody tr td label:contains("No Subjects Selected")').parents('tr').remove();
        entry = makeSelectedItemHtml(subName);
        selected.find('tbody').append(entry);
      }
      else {
        selected.find('tbody tr td label:contains('+subName+')').parents('tr').remove();
        checkSelected();
      }

      checkMains();
    });

    optional.on('click', '.optional-sub', function(event) {

      subName = $(this).parent().text();
      if ($(this).is(':checked')) {
        selected.find('tbody tr td label:contains("No Subjects Selected")').parents('tr').remove();
        entry = makeSelectedItemHtml(subName);
        selected.find('tbody').append(entry);
      }
      else {
        selected.find('tbody tr td label:contains('+subName+')').parents('tr').remove();
        checkSelected();
      }

      checkOptional();
    });

    selected.on('click', function (event) {
      var target = event.target;

      if ($(target).hasClass('move-up')) {
        var el = $(target).parents('tr');
        if (el.index() > 0) {
          el.clone().insertBefore(el.siblings()[el.index()-1]);
          el.remove();
        }
      };

      if ($(target).hasClass('move-down')) {
        var el = $(target).parents('tr');
        if (el.index() < el.siblings().length) {
          el.clone().insertAfter(el.siblings()[el.index()]);
          el.remove();
        }
      };

      if ($(target).hasClass('remove')) {
        var subject = $(target).siblings('label').text();
        var el = $('.tab-pane:not(.selected) label:contains(' + subject + ')');
        el.find('input').attr('checked', false);
        $(target).parents('tr').remove();
        checkSelected();
        checkMains();
        checkOptional();
      }

    });

  }

  function makeSelectedItemHtml(subName) {
    var html = '<tr>'+
          '<td>' +
            '<i class="glyphicon glyphicon-upload move-up"></i>' +
            '<i class="glyphicon glyphicon-download move-down"></i>' +
            '<label>'+subName+'</label>' +
            '<i class="glyphicon glyphicon-remove-circle remove"></i>' +
          '</td>'+
        '</tr>';
    return html;
  }

  function checkMains() {

    selectedMains = mains.find('tbody tr td input:checkbox:checked').length;
    if (selectedMains === 3) {
      mains.find('tbody tr td input:checkbox:not(:checked)').attr('disabled', true);
    }
    else {
      mains.find('tbody tr td input:checkbox:not(:checked)').attr('disabled', false);
    }
  }

  function checkOptional() {

    selectedOptional = optional.find('tbody tr td input:checkbox:checked').length;
    if (selectedOptional === 2) {
      optional.find('tbody tr td input:checkbox:not(:checked)').attr('disabled', true);
    }
    else {
      optional.find('tbody tr td input:checkbox:not(:checked)').attr('disabled', false);
    }
  }

  function checkSelected() {
    if (selected.find('tbody tr').length === 0) {
      entry = '<tr>'+
      '<td><label>No Subjects Selected</label></td>'+
      '</tr>';
      selected.find('tbody').append(entry);
    }
  }


})();