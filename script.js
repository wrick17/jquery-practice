(function () {

  var totalMains = $('.table.mains tbody tr td input:checkbox').length,
      selectedMains = 0,
      totalOptional = $('.table.optional tbody tr td input:checkbox').length,
      selectedOptional = 0;
      subName = null,
      entry = null;

  $('.table.mains tbody tr td input:checkbox').on('click', function(event) {

    selectedMains = $('.table.mains tbody tr td input:checkbox:checked').length;

    // console.log($(this).is(':checked'));

    subName = $(this).parent().text();
    if ($(this).is(':checked')) {

      $('.table.selected tbody tr td label:contains("No Subjects Selected")').parents('tr').remove();
      entry = '<tr>'+
                '<td>' +
                    '<i class="glyphicon glyphicon-circle-arrow-up move-up"></i>' +
                    '<i class="glyphicon glyphicon-circle-arrow-down move-down"></i>' +
                    '<label>'+subName+'</label>' +
                  '</td>'+
              '</tr>';
      $('.table.selected tbody').append(entry);
    }
    else {
      $('.table.selected tbody tr td label:contains('+subName+')').parents('tr').remove();
      if ($('.table.selected tbody tr').length === 0) {
        entry = '<tr>'+
                  '<td><label>No Subjects Selected</label></td>'+
                '</tr>';
        $('.table.selected tbody').append(entry);
      }
    }

    if (selectedMains === 3) {
      $('.table.mains tbody tr td input:checkbox:not(:checked)').attr('disabled', true);;
    }
    else {
     $('.table.mains tbody tr td input:checkbox:not(:checked)').attr('disabled', false);;
    }
  });

  $('.table.optional tbody tr td input:checkbox').on('click', function(event) {

    selectedOptional = $('.table.optional tbody tr td input:checkbox:checked').length;

    subName = $(this).parent().text();
    if ($(this).is(':checked')) {
      $('.table.selected tbody tr td label:contains("No Subjects Selected")').parents('tr').remove();
      entry = '<tr>'+
                '<td>' +
                    '<i class="glyphicon glyphicon-circle-arrow-up move-up"></i>' +
                    '<i class="glyphicon glyphicon-circle-arrow-down move-down"></i>' +
                    '<label>'+subName+'</label>' +
                  '</td>'+
              '</tr>';
      $('.table.selected tbody').append(entry);
    }
    else {
      $('.table.selected tbody tr td label:contains('+subName+')').parents('tr').remove();
      if ($('.table.selected tbody tr').length === 0) {
        entry = '<tr>'+
                  '<td><label>No Subjects Selected</label></td>'+
                '</tr>';
        $('.table.selected tbody').append(entry);
      }
    }

    if (selectedOptional === 2) {
      $('.table.optional tbody tr td input:checkbox:not(:checked)').attr('disabled', true);;
    }
    else {
     $('.table.optional tbody tr td input:checkbox:not(:checked)').attr('disabled', false);;
    }
  });

  $('body').on('click', 'i.move-up', function (event) {

    var el = $(this).parents('tr');
    if (el.index() > 0) {
      el.clone().insertBefore(el.siblings()[el.index()-1]);
      el.remove();
    }
  });

  $('body').on('click', 'i.move-down', function (event) {

    var el = $(this).parents('tr');
    if (el.index() < el.siblings().length) {
      el.clone().insertAfter(el.siblings()[el.index()]);
      el.remove();
    }
  });

})();