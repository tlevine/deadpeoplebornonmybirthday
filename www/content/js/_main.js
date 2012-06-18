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

  // Table-writer
  death.table = function(people){
    var rows = people.map(function(person){
      var died = new Date(person.date_of_death);
      person.died = died.toDateString();
      person.age = Math.floor((died - new Date(death.DATESTAMP))/31536000000);
      person.date_of_death = died.getTime();
      return sprintf(death.table_row_template, person)
    });
    $('#deadpeople > tbody').html(rows.join(''));
    $('#deadpeople').dataTable();
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
    console.log(people);
  };

  // Render the page
  death.render_dead_people = function(datestamp){
    // Only do something if there is a datestamp.
    if (datestamp != null){
      $.get('/data/people/' + death.DATESTAMP + '.json', function(people){
        death.table(people);
        death.plot(people);
      });
//    $.get('/data/counts/' + death.DATESTAMP + '.json', death.plot);
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
