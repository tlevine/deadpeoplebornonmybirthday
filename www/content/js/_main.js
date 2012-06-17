/* Author: Thomas Levine

*/



$(function(){
  var death = {};

  // Get datestamp from URL
  death.DATESTAMP = document.URL.replace(
      /.*(\d{4}-\d{2}-\d{2}).*/,
      function(junk, datestamp){return datestamp}
    );
  if (death.DATESTAMP===document.URL){
    death.DATESTAMP = null
  };

  // Render the page
  death.render_dead_people = function(datestamp){
    // Only do something if there is a datestamp.
    if (datestamp != null){
      $.get('/data/people/' + death.DATESTAMP + '.json', function(d){
        death.plot(d);
      });
      $.get('/data/table/' + death.DATESTAMP + '.json', function(d){
        death.table(d);
      });
    };
  };

  death.table = function(d){
    console.log(d);
  };

  death.plot = function(d){
    console.log(d);
  };

  death.main = function(){
    death.render_dead_people(death.DATESTAMP);
  };

  death.main()
})
