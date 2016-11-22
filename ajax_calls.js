jQuery(document).ready(function() {
 


  $.getJSON("cities.json", function(responseObject, diditwork) {       

    $('input.autocomplete').autocomplete({
       data: responseObject
    });      
  });  // getJSON



  $.getJSON("states.json", function(responseObject, diditwork) {       
    var displayOptions = "<option value='' disabled selected>State</option>"
    for (var i = 0; i<responseObject.states.length; i++) {
       displayOptions +=  "<option value=" + responseObject.states[i].abbreviation+  ">" + responseObject.states[i].name + "</option>";
    }

    $('#state_select').html(displayOptions); 
    //makes the select work with materilize
    $('select').material_select();       
  });  // getJSON


  $('input').keypress(function(e) {
    if (e.which == 13) {
      findTemperature($('select').val(), $('#autocomplete-input').val());
    }
  });


  $('span.lever').click(function() {
     // let ($('#').prop('checked'))
     let idCard = $(this).parent().parent().attr('id');
     let checked = $('#check'+idCard).prop('checked');

     if (checked) {
        $('#h2'+idCard).text($('#'+idCard).data('f')+"°F");
     }
     else {
        $('#h2'+idCard).text($('#'+idCard).data('c')+"°C");
     }

  });

  $('a').click(function() {
     // let ($('#').prop('checked'))
     let idCard = $(this).attr('id').substring(1);
     $('#'+idCard).parent().remove();

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
          createCard(state,city,temp_c,temp_f);
      }
  });

}

function chooseColor() {
  let colors = ['red','blue','green','black','teal','cyan','light-blue','purple','light-green','orange'];
  return colors[Math.floor(Math.random() * colors.length)]
}


function createCard(state, city , tempC, tempF){
  realCity = city;
  city = city.replace(/ /g,'');
  color = chooseColor();
  let html = `<div class='col s12 m3'> <div data-f='${tempF}' data-c='${tempC}' class='card ${color}' id='${state+city}'> <div class='card-content white-text'> <span class='card-title'> ${state}, ${realCity}</span>
                            <h2 id='h2${state+city}'>${tempF}°F</h2>
                            <div class="switch" id='${state+city}'>
                                <label>
                                  °F
                                  <input type="checkbox" id='check${state+city}'>
                                  <span class="lever"></span>
                                  °C
                                </label>
                            </div>
                        </div>
                        <div class="card-action">
                            <a id='a${state+city}'>close</a>
                        </div>
                    </div>
                </div>`
  $('#temperatures').append(html);
  $('span.lever').click(function() {
     // let ($('#').prop('checked'))
     let idCard = $(this).parent().parent().attr('id');
     let checked = $('#check'+idCard).prop('checked');

     if (checked) {
        $('#h2'+idCard).text($('#'+idCard).data('f')+"°F");
     }
     else {
        $('#h2'+idCard).text($('#'+idCard).data('c')+"°C");
     }

  });
  $('a').click(function() {
     // let ($('#').prop('checked'))
     let idCard = $(this).attr('id').substring(1);
     $('#'+idCard).parent().remove();

  });

}






