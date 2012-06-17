/* Author: Thomas Levine

*/

(function(){
  var datestamp = document.URL.replace(
    /.*(\d{4}-\d{2}-\d{2}).*/,
    function(junk, datestamp){return datestamp}
  );
  alert(datestamp);
})()
