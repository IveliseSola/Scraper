
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/dbScraper";

// mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI, {
//   useMongoClient: true
// });

//My heroku link: https://limitless-peak-92095.herokuapp.com

var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
// var request = require("request");
var axios = require("axios");
var path = require("path");
var db = require("./models");

var PORT = 3000;
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost/dbScraper");


app.get("/scrape", function (req, res) {
  axios.get("http://www.charlotteobserver.com/sports/").then(function (response) {
    var $ = cheerio.load(response.data);

    $(".teaser").each(function (i, element) {

      var result = {};

      result.title = $(this).find("a").text();
      result.link = $(this).find("a").attr("href");
      result.summary = $(this).children("p").text();

      db.Article.create(result)
        .then(function (dbArticle) {
          console.log(dbArticle);
        })
        .catch(function (err) {
          return res.json(err);
        });

    });

    res.send("Scrape Complete");
  });
});

app.get("/articles", function(req, res) {
  db.Article.find({})
    .then(function(dbArticle) {
      // res.json(dbArticle);
      res.sendFile(path.join(__dirname, "../public/index.html"))
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/articles/:id", function(req, res) {

  db.Article.findOne({ _id: req.params.id })

    .populate("note")
    .then(function(dbArticle) {

      res.json(dbArticle);
    })
    .catch(function(err) {
  
      res.json(err);
    });
});


app.post("/articles/:id", function(req, res) {
 
  db.Note.create(req.body)
    .then(function(dbNote) {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {
   
      res.json(dbArticle);
    })
    .catch(function(err) {
  
      res.json(err);
    });
});


app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});