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
      document.location = datestamp + '/';
    }
  };
  return search;
})();

window.death = (function(){
  var death = {};

  death.table_keys = [
    'first', 'middle', 'last', 'died', 'age', 'date_of_death', 'state'
  ];

  // Table-writer
  death.table = function(people){
    var rows = people.map(function(person){
      return sprintf(death.table_row_template, person)
    });
    $('#deadpeople > tbody').html(rows.join(''));
    var t = $('#deadpeople').dataTable({
      "bJQueryUI": true,
      "aoColumnDefs": [
        { "bVisible": false, "aTargets": [5] },
        { "iDataSort": 5, "aTargets": [3] },
        { "iDataSort": 5, "aTargets": [4] }
      ],
      "sDom": '<"H"pl>rt<"F"pl><"clear">'
    });

    log(1)
    $("#deadpeople > tfoot input").keyup( function () {
    	/* Filter on the column (the index) of this element */
    	t.fnFilter( this.value, $("#deadpeople > tfoot input").index(this) );
    log(2)
    });
  };

  // Table row template
  death.table_row_template = '<tr><td>%(' +
    death.table_keys.join(')s</td><td>%(') +
    ')s</td></tr>'
  death.table_row_template = death.table_row_template.replace(
    '%(age)s', '%(age)d').replace(
    '<td>%(date_of_death)s','<td class="date_of_death">%(date_of_death)s'
  );
  death.ageplot = function(people){
    var ages = people.map(function(person){return person.age});

    var thisyear = new Date().getFullYear();
    var max_age = thisyear - new Date(death.DATESTAMP).getFullYear();

    // Allocate histogram.
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
    //log(datestamp)
    if (datestamp != null){
      $.get('data/' + death.DATESTAMP + '.json', function(people_raw){
        //log(people_text);
        //log(people_raw);
        var people = people_raw.map(function(person){
          var died = new Date(person.date_of_death);
          person.died = died.strftime('%A, %B %d, %Y');
          person.age = Math.floor((died - new Date(death.DATESTAMP))/31536000000);
          person.date_of_death = died.getTime();
          return person;
        });
        death.table(people);
        death.ageplot(people);
      });
    };
  };

  death.main = function(){
    // Get datestamp from URL
    death.DATESTAMP = document.location.search.replace(
        /.*(\d{4}-\d{2}-\d{2}).*/,
        function(junk, datestamp){return datestamp}
      );

    if (death.DATESTAMP[1] == '8'){
      var d = JSON.parse(JSON.stringify(death.DATESTAMP));
      d[1] = '9'
      birthday_words = new Date(d).strftime('%A, %B %d, 18%y');
    } else {
      birthday_words = new Date(death.DATESTAMP).strftime('%A, %B %d, %Y');
    }
    $('.birthday-words').text(birthday_words);
    death.render_dead_people(death.DATESTAMP);
  };

  return death;
})();


$(function(){
  if (document.location.pathname == '/'){
    $('#submit').click(search.submit);
  } else {
    death.main();
  }
});
