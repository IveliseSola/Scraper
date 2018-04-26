$(document).ready(function () {

  $("#my-article").on("click", function () {
    $.get("/articles", function (data) {
      alert("articles");
      for (var i = 0; i < data.length; i++) {

        var newCardContainer = $("<div>");
        newCardContainer.addClass("col-md-9 card border-secondary mb-3 mycard");

        var newCardBodyContainer = $("<div>");
        newCardBodyContainer.addClass("card-body");

        var newTitleContainer = $("<h4>");
        newTitleContainer.addClass("card-header");
        newTitleContainer.append(data[i].title);
        // newTitleContainer.attr("data-id", i++);

        var newSummaryContainer = $("<p>");
        newSummaryContainer.addClass("card-text");
        newSummaryContainer.append(data[i].summary);

        newCardBodyContainer.append(newTitleContainer, newSummaryContainer);

        newCardContainer.append(newCardBodyContainer);

        var btnD = $("<button>");
        btnD.addClass("col-md-1 btn btn-danger btnDelete h-25");
        btnD.text("Delete");
        btnD.attr("data-id", data[i].title);


        var btnN = $("<button>");
        btnN.addClass("col-md-1 btn btn-primary btnAdd h-25");
        btnN.text("Add Note");
        btnN.attr("data-target", "#note-modal");
        btnN.attr("data-toggle", "modal");

        var newDiv = $("<div>");
        newDiv.addClass("row");
        newDiv.append(newCardContainer, btnD, btnN);

        $("#display-articles").append(newDiv);

        // $("#display-articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link  + "<br />" + data[i].summary +"</p>");
      }
    });
  });


  $("#scrape").on("click", function () {
    $.get("/scrape", function (data) {
    })
  });

});

$(document).on("click", "#home", function () {
  $("#display-articles").empty();
});

$(document).on("click", ".btnDelete", function () {
  var title = $(this).attr("data-id");
  $.ajax({
    method: "DELETE",
    url: "/delete/" + title
  }).then(function (data) {
  });
});

$(document).on("click", "")


$(document).on("click", "#save-note", function (e) {
  e.preventDefault();
  var title = $("#form-note-title").val().trim();
  var body = $("#form-note-body").val().trim();
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});