// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  $(".create-form").on("submit", function (event) {
    event.preventDefault();

    var newBurger = {
      burger_name: $("#addBurger")
        .val()
        .trim(),
      devoured: 0
    };

    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(function () {
      console.log("Added new burger");
      location.reload();
    });
  });

  $(".eatbutton").on("click", function (event) {
    // event.preventDefault();
    console.log("text");

    var id = $(this).data("id");
    var newDevouredState = $(this).data("newDevoured");

    var devouredState = {
      devoured: newDevouredState
    };

    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: devouredState
    }).then(function () {
      console.log("Burger devoured");
      location.reload();
    });
  });
  $(".delete").on("click", function(event){
    var id = $(this).attr("data-id");
    $.ajax({
      url: "/api/burgers/"+ id,
      method: "DELETE"
    }).then(function(data){
      location.reload();
    });
  });


});