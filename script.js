// Use pushpin to fix position of planner
var pushpinDiv = document.getElementById('planner-body');
var pushpinDivOptions = {
    top: 60,
    offset: 20,

}
var instancePushpinDiv = M.Pushpin.init(pushpinDiv, pushpinDivOptions);




function searchCity(inputCity) {
  $("#main-content").empty();
    // API query for nearby recreational activites
    var apiKey = "wbf55l3tkQ9RJGxEQhCH0cvdoCkqRCeLkoEssIp6"
    var queryURL1 = "https://developer.nps.gov/api/v1/parks?limit=10&q=" + inputCity + "&api_key=" + apiKey;
    console.log(queryURL1);
    $.ajax({
        url: queryURL1,
        method: "GET"
    }).then(function (response) {
        console.log(response);


      

        if (response.total === "0") {



            console.log("no results in your area");

            var noResults = $("<h5>");
            noResults.text("No recreation search results found. Please try again")
            $("#main-content").append(noResults);

            var hint = $("<p>");
            hint.text("(Try to broaden your search by entering the next nearby major city or try searching by state.)");
            $("#main-content").append(hint);


            for (var i = 0; i < response.data.length; i++) {

                var natureCard = $("<div>");
                natureCard.addClass("card rec-card");
                $("#main-content").append(natureCard);

                var imgURL = response.data[i].images[0].url;
                var imgDiv = $("<div>").addClass("card-image");
                natureCard.append(imgDiv);
                var cardImg = $("<img>");
                cardImg.attr("src", imgURL);

                var addButton = $("<a>").addClass("btn-floating halfway-fab waves-effect waves-light red")
                addButton.attr("id", "addButton");
                var addIcon = $("<i>").addClass("material-icons").text("add")
                addButton.append(addIcon)
                imgDiv.append(addButton)
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




                addBtn.on("click", function (event) {
                    event.preventDefault();

                    // var recPlan = $(this).val();
                    var recPlan = event.currentTarget.value;
                    console.log("add me");
                    console.log(recPlan);

                    var newListItem = $('<li>');
                    newListItem.draggable();
                    newListItem.addClass("ui-widget-content");
                    $(newListItem).append(recPlan);
                    $('ul').append(newListItem);



                    // var input9 = $("#taskHour9");
                    // var input10 = $("#taskHour10");
                    // var input11 = $("#taskHour11");
                    // var input12 = $("#taskHour12");
                    // var input1 = $("#taskHour13");
                    // var input2 = $("#taskHour14");
                    // var input3 = $("#taskHour15");
                    // var input4 = $("#taskHour16");
                    // var input5 = $("#taskHour17");

                    // if (input9.val() === "") {
                    //     input9.val(input9.val() + recPlan);
                    // } else if (input10.val() === "") {
                    //     input10.val(input10.val() + recPlan);
                    // } else if (input11.val() === "") {
                    //     input11.val(input11.val() + recPlan);
                    // } else if (input12.val() === "") {
                    //     input12.val(input12.val() + recPlan);
                    // } else if (input1.val() === "") {
                    //     input1.val(input1.val() + recPlan);
                    // } else if (input2.val() === "") {
                    //     input2.val(input2.val() + recPlan);
                    // } else if (input3.val() === "") {
                    //     input3.val(input3.val() + recPlan);
                    // } else if (input4.val() === "") {
                    //     input4.val(input4.val() + recPlan);
                    // } else if (input5.val() === "") {
                    //     input5.val(input5.val() + recPlan);
                    // }
                })




            }
        }

    })
    // $("#city-input").val('');
}





function searchRestaurants(inputCity) {


    $("#main-content").empty();


    $.ajax({
        // Get city id
        url: "https://developers.zomato.com/api/v2.1/cities?q=" + inputCity,
        dataType: 'json',
        async: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('user-key',
                '697e437df909db860acfd5c95e25e978');
        },  // This inserts the api key into the HTTP header
        success: function (response) {
            console.log(response)
            var cityID = response.location_suggestions[0].id
            console.log(cityID);

            // Get colection of "top rated restaurants"
            $.ajax({
                url: "https://developers.zomato.com/api/v2.1/search?entity_id=" + cityID + "&entity_type=city&collection_id=1",
                dataType: 'json',
                async: true,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('user-key',
                        '697e437df909db860acfd5c95e25e978');
                },
                success: function (response) {
                    console.log(response)

                    

                    for (var i = 0; i < 7; i++) {
                        // Create a div 
                        // Add to rest-content 
                        var restaurantCard = $("<div>")
                        restaurantCard.addClass("card rest-card");
                       
                        $("#main-content").append(restaurantCard);


                        // Retrieve image
                        // Create image div
                        // Add image div to card
                        // Create image element
                        // Set attributes
                        // Add to image div
                        var imgURL = "https://loremflickr.com/320/240/restaurant" + [i];
                        var imgDiv = $("<div>").addClass("card-image");
                        restaurantCard.append(imgDiv);
                        var cardImg = $("<img>");
                        cardImg.attr("src", imgURL);
                        imgDiv.append(cardImg);

                        let restaurantName = response.restaurants[i].restaurant.name;
                      




                        // Get restaurant name
                        // Create element to hold restaurant name
                        // Add restaurant name text to the restaurant name element
                        // Add restaurant name element to imgDiv 

                        var restNameEl = $("<span>");
                        restNameEl.addClass("card-title");
                        restNameEl.attr("id", "restaurant-name")
                        $(restNameEl).text(restaurantName);
                        imgDiv.append(restNameEl);

                        // Create card body
                        var cardBody = $("<div>");
                        cardBody.addClass("card-content");
                        restaurantCard.append(cardBody);

                        // Get restaurant cuisine type
                        // Create element to hold restaurant cuisine type
                        // Add restaurant cuisine element to card body
                        // Add restaurant cuisine type text to the restaurant cuisine element
                        let restaurantCuisine = response.restaurants[i].restaurant.cuisines;
                        var restCuisineEl = $("<p>").addClass("rest-cuisine")
                        cardBody.append(restCuisineEl);
                        $(restCuisineEl).text("Cuisine type: " + restaurantCuisine)

                        // Get restaurant cuisine user rating
                        // Create element to hold restaurant user rating
                        // Create element to hold restaurant user rating type
                        //Add restaurant user rating text to the restaurant user rating element 
                        let restaurantRating = response.restaurants[i].restaurant.user_rating.aggregate_rating;
                        var restaurantRatingEl = $("<p>").addClass("rest-hours")
                        cardBody.append(restaurantRatingEl);
                        $(restaurantRatingEl).text("Average Zomato Rating: " + restaurantRating)


                        // Create link section of card
                        // Add link section to main card
                        // Create menu link
                        // Add menu link to links section
                        var cardLinksSection = $("<div>").addClass("card-action");
                        restaurantCard.append(cardLinksSection);
                        var menuLink = $("<a>").text("View the Menu");
                        menuLink.attr("href", response.restaurants[i].restaurant.menu_url);
                        cardLinksSection.append(menuLink);

                        var addButtonText = $("<p>").text("Click the button to add to your list")
                        cardLinksSection.append(addButtonText);

                        // Create red 'addbutton' and add to card
                        var addButton = $("<a>").addClass("btn-floating waves-effect  red ");
                        addButton.addClass("add-button");
                        addButton.addClass("right")
                        addButton.attr("rest-name", restaurantName);
                        var addIcon = $("<i>").addClass("material-icons center-align").text(restaurantName)

                        addButtonText.append(addButton)
                        addButton.append(addIcon)
                   





                    }
                    // Add button function
                    $(".add-button").click(function (e) {
                        event.preventDefault();

                        var textToMove = e.currentTarget.text
                        console.log(textToMove);

                        newListItem = $('<li>');
                        newListItem.draggable();
                        newListItem.addClass("ui-widget-content");
                        $(newListItem).append(textToMove);
                        $('ul').append(newListItem);



                    })

                }
            })

        }
    });



}

// search click event

$("#search-button").on("click", function (event) {

    event.preventDefault();


    $('#sel-title').empty();

    var recRadio = $("input[id='recreation']:checked").val();
    var restaurantRadio = $("input[id='restaurants']:checked").val();

    var inputCity = $('#city-input').val().trim();

    if (recRadio) {
        searchCity(inputCity);
    } else if (restaurantRadio) {
        searchRestaurants(inputCity);
    }
    // Create heading for selections
    selContentTitle = $("<h5>Selected Activities</h5>");
    $('#sel-content').prepend(selContentTitle);

    
})



// Create schedule
// Define Variables
let currentDate = moment().format("dddd, MMMM Do YYYY");
let globalHour = moment().format("HH");

const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
const container = $('#planner-body');



// Sets current date at the header
$("#currentDay").text(currentDate);





hours.forEach(function (hour) {
    // Build the row
    const rowDiv = $('<form>');
  

    rowDiv.addClass('row time-block ui-widget-header');
    // build the hour div
    const hourDiv = $('<div>');

    hourDiv.attr('id', 'hour-' + hour);
    const currentHour = hour === 12 ? 12 : hour % 12;
    const amOrPm = (hour > 11) ? 'PM' : 'AM';
    hourDiv.text(currentHour + ' ' + amOrPm);
    hourDiv.addClass('col s3');
    hourDiv.addClass('hour');


    // append to row div
    // hourDiv.addClass("ui-widget-header");
    rowDiv.append(hourDiv);

    // build the input
    const inputDiv = $('<input>', {
        type: 'Text',
    })
    inputDiv.addClass('col s6');
    // inputDiv.addClass("ui-widget-header");



    inputDiv.val(localStorage.getItem("taskHour" + hour));


    // append to row div
    rowDiv.append(inputDiv);
    container.append(rowDiv);

})

$(function () {
    $(".ui-widget-content").draggable();
    $(".ui-widget-header").droppable(
        {
            hoverClass: "drop-hover",
            accept: ".ui-widget-content",

            drop: function (ev, ui) {
               
                 var plannerText =$(ui.draggable).text()
                $(this).find("input").val(plannerText)
                $(ui.draggable).detach().css({top: 0,left: 0}).appendTo("input");
               
              




            }
        }
    )
})




