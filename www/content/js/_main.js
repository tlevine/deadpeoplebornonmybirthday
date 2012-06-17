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

  death.table = function(d){
    document.write(d);
  };

  death.plot = function(d){
    console.log(d);
  };

  // Render the page
  death.render_dead_people = function(datestamp){
    // Only do something if there is a datestamp.
    if (datestamp != null){
      $.get('/data/people/' + death.DATESTAMP + '.json', death.plot);
      $.get('/data/counts/' + death.DATESTAMP + '.json', death.table);
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
