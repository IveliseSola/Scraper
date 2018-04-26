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
            newTitleContainer.attr("data-id", i++);
    
            var newSummaryContainer = $("<p>");
            newSummaryContainer.addClass("card-text");
            newSummaryContainer.append(data[i].summary);
    
            newCardBodyContainer.append(newTitleContainer, newSummaryContainer);
    
            newCardContainer.append(newCardBodyContainer);
    
            var btnD = $("<button>");
            btnD.addClass("col-md-1 btn btn-danger btnDelete h-25");
            btnD.text("Delete");
            btnD.attr("data-id", i++);
    
            var btnN = $("<button>");
            btnN.addClass("col-md-1 btn btn-primary btnAdd h-25");
            btnN.text("Add Note");
    
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
    
      // $("#home").on("click", function () {
      //   $("#display-articles").empty();
      // });
    
      // $(".btnDelete").on("click," function() {
      //   var id = this.attr("data-id");
      //   $.get("/delete", function(id){
      //   });
      // })
    
    });