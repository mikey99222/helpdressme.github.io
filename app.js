console.log("I am ERROR!");

$(document).ready(function(){
	$.ajax({
    		url: "http://api.openweathermap.org/data/2.5/weather",

    		jsonp: "callback",
    		dataType: "jsonp",
 		
    		data: {
			q: "Eastleigh",
        		mode: "jsonp"
    		},
 		
    		// Work with the response
    		success: function( response ) {
			$('body').addClass( 'weather_'+response.weather[0].main );
			$('.weather-text').text(response.weather[0].description );
			$('.weather-temp').text(Math.round(response.main.temp-273.16) );
		//	$('.weather-debug').text( JSON.stringify( response ) );
    		}
	});

});

function myFunction() {
    current_location = document.getElementById("location_input").value;
    console.log(current_location);

	$.ajax({
    		url: "http://api.openweathermap.org/data/2.5/weather",

    		jsonp: "callback",
    		dataType: "jsonp",
 		
    		data: {
			q: current_location,
			// lat: 50.9, long: -1.4,
			//zip: "UK",
			//zip: "UK",
        		mode: "jsonp"
    		},
 		
    		// Work with the response
    		success: function( response ) {
			$('body').addClass( 'weather_'+response.weather[0].main );
			$('.weather-text').text(response.weather[0].description );
			$('.weather-temp').text(Math.round(response.main.temp-273.16) );
		//	$('.weather-debug').text( JSON.stringify( response ) );

clothes = 'something';
temperature= (Math.round(response.main.temp-273.16));
if (temperature >20) {
clothes= 't-shirt';
} else if (temperature <20 && temperature >1){
clothes= 'jumper';
} else if (temperature <-20 && temperature >-30){
clothes= 'body bag';
} else {
clothes= 'body bag';
}
$('.weather-clothes').text(clothes);


   }
	});


    document.getElementById("loc_temp").innerHTML = current_location;



}
 var appid ="oM6g5QU41NKGl2PGlqxhQxV51WEYqPkj2EkuDXdJ"  ;
  var apikey ="ma2Lgv3C4DjDUgNOv12ghmd82Ou60ZQpGsr3ubPx";
  var javakey ="CLw7NNxumkyJBvOJ2h2LJFJyq4nZZb8FnV8RFAIt"
  $(function() {
    var file;
	Parse.initialize(appid, javakey);
	var Clothing = Parse.Object.extend("Clothing");
    // Set an event listener on the Choose File field.
    $('#fileselect').bind("change", function(e) {
      var files = e.target.files || e.dataTransfer.files;
      // Our file var now holds the selected file
      file = files[0];
    });

	
	
	
    // This function is called when the user clicks on Upload to Parse. It will create the REST API request to upload this image to Parse.
    $('#uploadbutton').click(function() {
      var serverUrl = 'https://api.parse.com/1/files/' + file.name;
     var form = document.getElementById("Bodypart");
	   var Itemcloth = (form.elements["Body part"].value);
	   var typecloth = (form.elements["Clothingtype"].value);
	   var weatherType = (form.elements["weatherType"].value);
	   var eventClassification = (form.elements["eventClassification"].value);
      $.ajax({
        type: "POST",
        beforeSend: function(request) {
          request.setRequestHeader("X-Parse-Application-Id", appid);
          request.setRequestHeader("X-Parse-REST-API-Key", apikey);
          request.setRequestHeader("Content-Type", file.type);
        },
        url: serverUrl,
        data: file,
        processData: false,
        contentType: false,
        success: function(data) {
			
		  var clothing = new Clothing();
		  clothing.set("type", Itemcloth)
		  clothing.set("picture", data.url)		  
		  clothing.set("clothingtype", typecloth);
		  clothing.set("weatherType", weatherType);
		  clothing.set("eventClassification", eventClassification)
		//  console.log(clothing)
		  clothing.save(null, {success: function(data){
		  console.log("This has been saved :) " + data);}
	  });
		   alert("File available at: " + data.url);
		  console.log("File available at: " + data.url);
        },
        error: function(data) {
          var obj = jQuery.parseJSON(data);
          alert(obj.error);
    }
      });
    });


  });
  

  