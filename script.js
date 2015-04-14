(function () {

  var totalMains = $('.mains tbody tr td input:checkbox').length,
  selectedMains = 0,
  totalOptional = $('.optional tbody tr td input:checkbox').length,
  selectedOptional = 0;
  subName = null,
  entry = null,
  body = $('body'),
  tableName = null,
  tabs = $('.tab'),
  panes = $('.tab-pane');

  init();

  function init () {

    body.on('click', '.tab', function(event) {
      tableName = '.' + $(this).text().toLowerCase();
      tabs.removeClass('active');
      panes.removeClass('active');
      $(this).addClass('active');
      $(tableName).addClass('active');
    });

    body.on('click', '.main-sub', function(event) {

      subName = $(this).parent().text();
      if ($(this).is(':checked')) {

        $('.selected tbody tr td label:contains("No Subjects Selected")').parents('tr').remove();
        entry = '<tr>'+
        '<td>' +
        '<i class="glyphicon glyphicon-circle-arrow-up move-up"></i>' +
        '<i class="glyphicon glyphicon-circle-arrow-down move-down"></i>' +
        '<label>'+subName+'</label>' +
        '<i class="glyphicon glyphicon-remove-sign remove"></i>' +
        '</td>'+
        '</tr>';
        $('.selected tbody').append(entry);
      }
      else {
        $('.selected tbody tr td label:contains('+subName+')').parents('tr').remove();
        checkSelected();
      }

      checkMains();
    });

    body.on('click', '.optional-sub', function(event) {

      subName = $(this).parent().text();
      if ($(this).is(':checked')) {
        $('.selected tbody tr td label:contains("No Subjects Selected")').parents('tr').remove();
        entry = '<tr>'+
        '<td>' +
        '<i class="glyphicon glyphicon-circle-arrow-up move-up"></i>' +
        '<i class="glyphicon glyphicon-circle-arrow-down move-down"></i>' +
        '<label>'+subName+'</label>' +
        '<i class="glyphicon glyphicon-remove-sign remove"></i>' +
        '</td>'+
        '</tr>';
        $('.selected tbody').append(entry);
      }
      else {
        $('.selected tbody tr td label:contains('+subName+')').parents('tr').remove();
        checkSelected();
      }

      checkOptional();
    });

    body.on('click', '.move-up', function (event) {

      var el = $(this).parents('tr');
      if (el.index() > 0) {
        el.clone().insertBefore(el.siblings()[el.index()-1]);
        el.remove();
      }
    });

    body.on('click', '.move-down', function (event) {

      var el = $(this).parents('tr');
      if (el.index() < el.siblings().length) {
        el.clone().insertAfter(el.siblings()[el.index()]);
        el.remove();
      }
    });

    body.on('click', '.remove', function(event) {
      var subject = $(this).siblings('label').text();
      var el = $('.tab-pane:not(.selected) label:contains(' + subject + ')');
      el.find('input').attr('checked', false);
      $(this).parents('tr').remove();
      checkSelected();
      checkMains();
      checkOptional();
    });

  }

  function checkMains() {

    selectedMains = $('.mains tbody tr td input:checkbox:checked').length;
    if (selectedMains === 3) {
      $('.mains tbody tr td input:checkbox:not(:checked)').attr('disabled', true);
    }
    else {
      $('.mains tbody tr td input:checkbox:not(:checked)').attr('disabled', false);
    }
  }

  function checkOptional() {

    selectedOptional = $('.optional tbody tr td input:checkbox:checked').length;
    if (selectedOptional === 2) {
      $('.optional tbody tr td input:checkbox:not(:checked)').attr('disabled', true);
    }
    else {
      $('.optional tbody tr td input:checkbox:not(:checked)').attr('disabled', false);
    }
  }

  function checkSelected() {
    if ($('.selected tbody tr').length === 0) {
      entry = '<tr>'+
      '<td><label>No Subjects Selected</label></td>'+
      '</tr>';
      $('.selected tbody').append(entry);
    }
  }


})();