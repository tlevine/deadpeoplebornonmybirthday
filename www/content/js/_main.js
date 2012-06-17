/* Author: Thomas Levine

*/



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
  death.table_row_template = '<tr><td>%(' +
    death.table_keys.join(')s</td><td>%(') +
    ')s</td></tr>';
  death.table = function(people){
    var rows = people.map(function(person){
      var died = new Date(person.date_of_death);
      person.died = died.toDateString();
      person.age = Math.floor(
        (person.died - new Date(death.DATESTAMP))
        /31536000000
      )
      return sprintf(death.table_row_template, person)
    });
    $('#deadpeople > tbody').html(rows.join(''));
  };

  death.plot = function(d){
    console.log(d);
  };

  // Render the page
  death.render_dead_people = function(datestamp){
    // Only do something if there is a datestamp.
    if (datestamp != null){
      $.get('/data/people/' + death.DATESTAMP + '.json', death.table);
      $.get('/data/counts/' + death.DATESTAMP + '.json', death.plot);
    };
  };

  death.main = function(){
    death.render_dead_people(death.DATESTAMP);
  };

  return death;
})();

$(function(){
  death.main()
})
