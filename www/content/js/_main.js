/* Author: Thomas Levine

*/

window.search = (function(){
  var search = {};
  search.submit = function(){
    var datestamp = [
      $('select#search-year').val(),
      $('select#search-month').val(),
      $('select#search-day').val()
    ].join('-');
    if (
        new Date(datestamp) == 'Invalid Date' /* wtf? */ ||
        $('select#search-year').val()==='' ||
        $('select#search-month').val()==='' ||
        $('select#search-day').val()===''
      ) {
      $('#error').html('Select a date.');
    } else {
      document.location = datestamp;
    }
  };
  return search;
})();

window.death = (function(){
  var death = {};

  // Get datestamp from URL
  death.DATESTAMP = document.URL.replace(
      /.*(\d{4}-\d{2}-\d{2}).*/,
      function(junk, datestamp){return datestamp}
    );
  if (death.DATESTAMP===document.URL){
    death.DATESTAMP = null
  };

  death.table_keys = [
    'first', 'middle', 'last', 'died', 'age', 'date_of_death', 'state'
  ];

  // Table-writer
  death.table = function(people){
    var rows = people.map(function(person){
      return sprintf(death.table_row_template, person)});
    $('#deadpeople > tbody').html(rows.join(''));
    var t = $('#deadpeople').dataTable();
  //$(window).resize(function(){
  //  t.fnReloadAjax();
  //  $('#deadpeople').attr('style', '');
  //});
  };

  // Table row template
  death.table_row_template = '<tr><td>%(' +
    death.table_keys.join(')s</td><td>%(') +
    ')s</td></tr>'
  death.table_row_template = death.table_row_template.replace(
    '%(age)s', '%(age)d').replace(
    '<td>%(date_of_death)s','<td class="date_of_death">%(date_of_death)s'
  );

  // Plot
  death.plot = function(people){
    var ages = people.map(function(person){return person.age});

    var thisyear = new Date().getFullYear();
    var max_age = thisyear - new Date(death.DATESTAMP).getFullYear();

    // Allocate histogram list.
    var ages_hist = [];
    var i = 0;
    while (i < max_age){
      ages_hist.push([i, 0]);
      i++;
    }

    // Create it.
    i = 0;
    while (i < ages.length){
      ages_hist[ages[i]][1]++;
      i++;
    }

    $.plot(
      $('#plot'),
      [ages_hist],
      {
        xaxes: [{
          axisLabel: 'Age at death'
        }],
        yaxes: [{
          position: 'left',
          axisLabel: 'Number of people'
        }]
      }
    );
  };

  // Render the page
  death.render_dead_people = function(datestamp){
    // Only do something if there is a datestamp.
    if (datestamp != null){
      $.get('/data/people/' + death.DATESTAMP + '.json', function(people_raw){
        var people = people_raw.map(function(person){
          var died = new Date(person.date_of_death);
          person.died = died.toDateString();
          person.age = Math.floor((died - new Date(death.DATESTAMP))/31536000000);
          person.date_of_death = died.getTime();
          return person;
        });
        death.table(people);
        death.plot(people);
    //  $(window).resize(function(){
    //    $('#plot').html('');
    //    death.plot(people);
    //  });
      });
    };
  };

  death.main = function(){
    death.render_dead_people(death.DATESTAMP);
  };

  return death;
})();

$(function(){
  if ($('#plot').length > 0) {
    death.main();
    $(window).resize(function(){
      setTimeout(function(){
        window.location.href=window.location.href
     }, 500);
    });
  } else {
    $('#submit').click(search.submit);
  }
});
