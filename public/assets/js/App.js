$(document).on("click", "#my-article", function () {

  $.ajax({
    method: "GET",
    url: "/articles"
  }).then(function (data) {
    for (var i = 0; i < data.length; i++) {

      var newCardContainer = $("<div>");
      newCardContainer.addClass("col-md-9 card border-secondary mb-3 mycard");

      var newCardBodyContainer = $("<div>");
      newCardBodyContainer.addClass("card-body");

      var newTitleContainer = $("<h4>");
      newTitleContainer.addClass("card-header");
      newTitleContainer.append(data[i].title);

      var newLinkContainer = $("<p>");
      newLinkContainer.addClass("card-text");
      newLinkContainer.append(data[i].link);

      var newSummaryContainer = $("<p>");
      newSummaryContainer.addClass("card-text");
      newSummaryContainer.append(data[i].summary);

      newCardBodyContainer.append(newTitleContainer, newSummaryContainer, newLinkContainer);

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
      btnN.attr("data-id", data[i].title);

      var newDiv = $("<div>");
      newDiv.addClass("row");
      newDiv.append(newCardContainer, btnD, btnN);

      $("#display-articles").append(newDiv);
      // $("#display-articles").css({
      //   "transition-timing-function": "ease-in",
      //   "transition-delay": "1s",
      //   "transition-duration": "2s"
      // });
    }

    setTimeout(function () { location.href = "#display-articles"; }, 500);
  });
});

$(document).on("click", "#scrape", function () {
  $.get("/scrape", function (data) {

  });
  //   $.get("/count", function(data){
  //     alert("You have " + data + "articles");
  //   });
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

  }).catch(function (err) {
    console.log(err);
  })
});


// $(document).on("click", ".btnAdd", function () {
//   // this.attr("data-target", "#note-modal");
//   // this.attr("data-toggle", "modal");
//   var modalTitle = $("<p>");
//   modalTitle = this.attr("data-id");
//   $(".modal-title").append(modalTitle);
// });


$(document).on("click", "#save-note", function (e) {
  e.preventDefault();
  $.ajax({
    method: "POST",
    url: "/articles/" + Id,// I dont have the id
    data: {
      title: $("#form-note-title").val().trim(),
      body: $("#form-note-body").val().trim()
    }
  }).then(function (data) {
  });

  $("#form-note-title").val("");
  $("#form-note-body").val("");
});