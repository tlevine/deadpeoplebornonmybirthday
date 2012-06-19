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
    var t = $('#deadpeople').dataTable({
      "bJQueryUI": true,
      "sDom": '<"H"p>rt<"F"i>l<"clear">'
    });
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
  death.stateplot = function(people){
    var states_init = [
      ["AL", 0],  ["AK", 0],  ["AZ", 0],  ["AR", 0],  ["CA", 0],
      ["CO", 0],  ["CT", 0],  ["DE", 0],  ["FL", 0],  ["GA", 0], 
      ["HI", 0],  ["ID", 0],  ["IL", 0],  ["IN", 0],  ["IA", 0],
      ["KS", 0],  ["KY", 0],  ["LA", 0],  ["ME", 0],  ["MD", 0], 
      ["MA", 0],  ["MI", 0],  ["MN", 0],  ["MS", 0],  ["MO", 0],
      ["MT", 0],  ["NE", 0],  ["NV", 0],  ["NH", 0],  ["NJ", 0], 
      ["NM", 0],  ["NY", 0],  ["NC", 0],  ["ND", 0],  ["OH", 0],
      ["OK", 0],  ["OR", 0],  ["PA", 0],  ["RI", 0],  ["SC", 0], 
      ["SD", 0],  ["TN", 0],  ["TX", 0],  ["UT", 0],  ["VT", 0],
      ["VA", 0],  ["WA", 0],  ["WV", 0],  ["WI", 0],  ["WY", 0]
    ]
    var states = people.map(function(person){return person.state});
  }
  death.ageplot = function(people){
    var ages = people.map(function(person){return person.age});

    var thisyear = new Date().getFullYear();
    var max_age = thisyear - new Date(death.DATESTAMP).getFullYear();

    // Allocate histogram and ticks.
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
      $('#age-plot'),
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
        death.ageplot(people);
        death.stateplot(people);
    //  $(window).resize(function(){
    //    $('#age-plot').html('');
    //    death.ageplot(people);
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
  if ($('#age-plot').length > 0) {
    death.main();
    $(window).resize(function(){
      if ($(this).width() < 960) {     // or $(this).height() for height check
        setTimeout(function(){
          window.location.href=window.location.href
       }, 500);
      }
    });
  } else {
    $('#submit').click(search.submit);
  }
});
