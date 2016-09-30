jQuery(document).ready(function($) {
  $.ajax({
      // https API request for jsonp data
      url : "https://api.wunderground.com/api/2e568790d4726776/geolookup/conditions/q/MA/Lexington.json",
      dataType : "jsonp",
      // if parsed_json / jsonp is returned, continue with this function
      success : function(parsed_json) {
          // relevant values stored in variables 
          var location = parsed_json['location']['city'];
          var state = parsed_json['location']['state'];
          var temp_f = parsed_json['current_observation']['temp_f'];
          // write the data from API into HTML using div id's
          $("#infoArea").html("<p>Current temperature in " + location + " " + state + " is: </p>");
          $("#temp").html("<p>" + temp_f + "°F</p>")
      }
  });
});

function findTemperature(state, city) {
  $.ajax({
      // https API request for jsonp data
      url : "https://api.wunderground.com/api/2e568790d4726776/geolookup/conditions/q/"+state+"/"+city+".json",
      dataType : "jsonp",
      // if parsed_json / jsonp is returned, continue with this function
      success : function(parsed_json) {
          // relevant values stored in variables 
          let location = parsed_json['location']['city'];
          let state = parsed_json['location']['state'];
          let temp_f = parsed_json['current_observation']['temp_f'];
          let temp_c = parsed_json['current_observation']['temp_c'];
          // write the data from API into HTML using div id's
          // $("#infoArea").html("<p>Current temperature in " + location + " " + state + " is: </p>");
          // $("#temp").html("<p>" + temp_f + "°F</p>")
          console.log(temp_f)
      }
  });
}

//makes the select work with materilize
$(document).ready(function() {
    $('select').material_select();
  });