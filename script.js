function searchCity(city){

    var apiKey = "wbf55l3tkQ9RJGxEQhCH0cvdoCkqRCeLkoEssIp6"
    var queryURL1 = "https://developer.nps.gov/api/v1/parks?limit=10&q=" + city + "&api_key=" + apiKey;
    console.log(queryURL1);
        $.ajax({
            url: queryURL1,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            
            $("#rec-content").empty();
           
            for (var i=0; i<response.data.length; i++) {
    
                var natureCard = $("<div>");
                natureCard.addClass("card rec-card");
                $("#rec-content").append(natureCard);
    
                var imgURL = response.data[i].images[0].url;
                var imgDiv = $("<div>").addClass("card-image");
                natureCard.append(imgDiv);
                var cardImg = $("<img>");
                cardImg.attr("src", imgURL);
                imgDiv.append(cardImg);
    
                var cardBody = $("<div>");
                cardBody.addClass("card-content");
                natureCard.append(cardBody);
    
    
                // console.log(response.data[i].fullName);
                var natureTitle = $('<span>');
                natureTitle.text(response.data[i].fullName);
                natureTitle.addClass("card-title");
                imgDiv.append(natureTitle);
    
    
                // console.log(response.data[i].description);
                var natureDescription = $("<p>");
                natureDescription.addClass("nature-description");
                natureDescription.text(response.data[i].description);
                cardBody.append(natureDescription);
    
                
    
                // console.log(response.data[i].directionsUrl);
                var cardLinksSection = $("<div>").addClass("card-action");
                natureCard.append(cardLinksSection);
                var directionsLink = $("<a>").text("Directions");
                directionsLink.attr("href", response.data[i].directionsUrl);
                cardLinksSection.append(directionsLink);
    
               
            }
    
        })
        $("#city-input").val('');
    }
    
    
    
    
    
    
    function searchRestaurants(inputCity){
        
    
    $("#rec-content").empty();
    
    
    $.ajax({  
        // Get city id
        url: "https://developers.zomato.com/api/v2.1/cities?q=" + inputCity,
        dataType: 'json',
        async: true,
        beforeSend: function(xhr){xhr.setRequestHeader('user-key', 
        '697e437df909db860acfd5c95e25e978');},  // This inserts the api key into the HTTP header
        success: function(response) { console.log(response) 
            var cityID = response.location_suggestions[0].id
            console.log(cityID);
        
            // Get colection of "top rated restaurants"
            $.ajax({  
                url: "https://developers.zomato.com/api/v2.1/search?entity_id=" +cityID+ "&entity_type=city&collection_id=1",
                dataType: 'json',
                async: true,
                beforeSend: function(xhr){xhr.setRequestHeader('user-key', 
                '697e437df909db860acfd5c95e25e978');}, 
                success: function(response) { console.log(response)
                    
                    
                    for (var i=0; i<7; i++) {
                        
                     var restaurantCard = $("<div>")
                     restaurantCard.addClass("card rest-card");
                     restaurantCard.draggable();
                     restaurantCard.addClass("ui-widget-content");
                     $("#rec-content").append(restaurantCard);
    
    
              
        var imgURL = "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg";
                console.log(imgURL);
                var imgDiv = $("<div>").addClass("card-image");
                restaurantCard.append(imgDiv);
                var cardImg = $("<img>");
                cardImg.attr("src", imgURL);
                imgDiv.attr("width", 100)
                imgDiv.append(cardImg);
    
    
    
    
                        // Get restaurant name
                       let restaurantName = response.restaurants[i].restaurant.name;
                       
                        // Create element to hold restaurant name
                       var restNameEl = $("<span>"); 
                       restNameEl.addClass("card-title");
                         // Add restaurant name text to the restaurant name element
                       $(restNameEl).text(restaurantName);
                      
                    //    Add restaurant name element to imgDiv
                       imgDiv.append(restNameEl);
                  
                       console.log(restaurantName);
    
    
                        var cardBody = $("<div>");
                        cardBody.addClass("card-content");
                        restaurantCard.append(cardBody);
    
    // //build the save
    //    const addButtonDiv = $('<button>',{
    //        type: 'submit'
    //    });
    //    addButtonDiv.text("Add to your day!")
    //    addButtonDiv.addClass('col s3');
    //    addButtonDiv.addClass('addButton');
       
      
     
       
    // // append to card 
    //    cardBody.append(addButtonDiv);
                       
    
                     // Get restaurant cuisine type
                       let restaurantCuisine = response.restaurants[i].restaurant.cuisines;
                       // Create element to hold restaurant cuisine type
                       var restCuisineEl = $("<p>").addClass("rest-cuisine")
                       //    Add restaurant cuisine element to card body
                       cardBody.append(restCuisineEl);
                    //    Add restaurant cuisine type text to the restaurant cuisine element
                       $(restCuisineEl).text("Cuisine type: " + restaurantCuisine)
                       console.log(restaurantCuisine);
    
             
    
                       // Get restaurant cuisine user rating
                       let restaurantRating = response.restaurants[i].restaurant.user_rating.aggregate_rating;
                       // Create element to hold restaurant user rating
                       var restaurantRatingEl = $("<p>").addClass("rest-hours")
                        // Create element to hold restaurant user rating type
                       cardBody.append(restaurantRatingEl);
                        //    Add restaurant user rating text to the restaurant user rating element 
                       $(restaurantRatingEl).text("Rating: " + restaurantRating )
                       console.log(restaurantRating );
    
                       let restaurantMenu = response.restaurants[i].restaurant.menu_url;
                       var restMenuEl = $("<a>");
                       restMenuEl.attr("href", restaurantMenu);
                       restMenuEl.attr("title", "Menu");
                       restMenuEl.text("View the Menu");
                       cardBody.append(restMenuEl);
                      
                       console.log(restaurantMenu);
      
         }       
    
    
            }})
        
        } });
    
    
    
    }
    
        // search click event
    
    $("#search-button").on("click", function(event){
    
       event.preventDefault();
      var recRadio = $("input[id='recreation']:checked").val();
      var restaurantRadio= $("input[id='restaurants']:checked").val();
      
      var inputCity = $('#city-input').val().trim();
      
      if(recRadio){
      searchCity(inputCity);
      } else if (restaurantRadio){
        searchRestaurants(inputCity);
      }
      
    })
      
      
      
      
      // search click event
      
    //   $("#search-button").on("click", function(event){
      
    //      event.preventDefault();
    //       var inputCity = $('#city-input').val().trim();
        
    //     searchRestaurants(inputCity);
        
    //   })
    
    // Create schedule
    // Define Variables
    let currentDate = moment().format("dddd, MMMM Do YYYY");
    let globalHour = moment().format("HH");
    
    const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
    const container = $('#planner-body');
    
    
    
    // Sets current date at the header
    $("#currentDay").text(currentDate);
    
    
    
    
    
    hours.forEach(function (hour) {
        // Build the row
        const rowDiv = $('<form>');
        rowDiv.addClass('row');
        rowDiv.addClass('time-block');
        // build the hour div
        const hourDiv = $('<div>');
       
        hourDiv.attr('id', 'hour-' + hour);
        const currentHour = hour === 12 ? 12 : hour % 12;
        const amOrPm = (hour > 11) ? 'PM' : 'AM';
        hourDiv.text(currentHour + ' ' + amOrPm);
        hourDiv.addClass('col s3');
        hourDiv.addClass('hour');
    
    
    // append to row div
        rowDiv.append(hourDiv);
    
        // build the input
     const inputDiv = $('<input>', {
     type: 'Text',})
     inputDiv.addClass('col s6');
     inputDiv.attr('id', 'taskHour' + hour);
     
     inputDiv.val(localStorage.getItem("taskHour" + hour));
         // Add classes based on current time
       if (hour === globalHour) {
           inputDiv.addClass('present');
       }
       if (hour < globalHour) {
        inputDiv.addClass('past');
    }
    if (hour > globalHour) {
        inputDiv.addClass('future');
    }
     
     
     // append to row div
     rowDiv.append(inputDiv);
            
        //build the save
        const saveDiv = $('<button>',{
            type: 'submit'
        });
        saveDiv.addClass('col s3');
        saveDiv.addClass('saveBtn');
        saveDiv.addClass("fa fa-plus-circle fa-2x");
        
     // append to row div  
        rowDiv.append(saveDiv);
    
    // append to container div
        container.append(rowDiv);
     
    })