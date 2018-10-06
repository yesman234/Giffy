//JavaScript doesn't get run until the HTML is finished loading
$(document).ready(function () {

   
    var myKey = config.MY_KEY;
   
    //animal array
    var animal = ["Dog", "Cat", "Lizard", "Tiger", "Monkey", "Cheetah"];

       
    buttonCreate();

   
    function buttonCreate() {
        $("#button-display").empty();
        for (var i = 0; i < animal.length; i++) {
            var animalButton = $("<button class='btn btn-danger'>");
            animalButton.addClass("animal");
            animalButton.attr("animal-data", animal[i]);
            animalButton.text(animal[i]);
            $("#button-display").append(animalButton);
        }
    }

  
    
    $("#gif-button").on("click", function () {
        // Grabbing and storing the property value from the button
        var animalNew = $("#animal-input").val().toUpperCase();
        animal.push(animalNew);
        buttonCreate();
        return false;  
    });

    
    //on click to call GifDisplay function
    $(document).on("click", ".animal", gifDisplay);

    //queryURL using the animal name
    function gifDisplay() {
        $("#populate-gifs").html("");
        var creature = $(this).attr("animal-data");
        var random = Math.floor(Math.random() * 21);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + creature + "&limit=10&offset=" + random + "&api_key=" + myKey;

        // Performing an AJAX request with the queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // After data comes back from the request
            .then(function (response) {
                // storing the data from the AJAX request in the results variable
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    // Div tag is created and strored
                    var animalDiv = $("<div>");
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    // Image tag is created and stored
                    var animalImage = $("<img>");
                    // Setting the src attribute of the image to a property pulled off the result item
                    animalImage.addClass("gif");
                    animalImage.attr("src", results[i].images.fixed_height_still.url);
                    animalImage.attr("data-state", "still");
                    animalImage.attr("animateUrl", results[i].images.fixed_height.url);
                    animalImage.attr("stillUrl", results[i].images.fixed_height_still.url);
                    //Appending the paragraph and image tag to the animalDiv
                    animalDiv.append(p);
                    animalDiv.append(animalImage);

                    // The animalDiv is prepended to the HTML under populate-gifs
                    $("#populate-gifs").prepend(animalDiv);
                };
            });
    };
});

// If the clicked image's state is still then animate, if anmiated then change to still
$(document).on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("animateURL"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("stillURL"));
        $(this).attr("data-state", "still");
    }
})