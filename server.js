

var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");
var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// mongoose.connect("mongodb://localhost/dbScraper");


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/dbScraper";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

//My heroku link: https://limitless-peak-92095.herokuapp.com
//My MONGODB_URI: mongodb://heroku_z2t6frx4:9bg9m2gfr419p62o2o7iv1p4lc@ds153869.mlab.com:53869/heroku_z2t6frx4

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
        })
        .catch(function (err) {
          return res.json(err);
        });
    });
  });
});

app.get("/count", function (req, res) {
  db.Article.count().then(function (thecount) {
    return thecount;
  });
});

app.get("/articles", function (req, res) {
  db.Article.find({})
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.post("/articles/:id", function (req, res) {
  db.Note.create(req.body)
    .then(function (dbNote) {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function (dbArticle) {

      res.json(dbArticle);
    })
    .catch(function (err) {

      res.json(err);
    });
});

app.delete("/delete/:title", function (req, res) {
  db.Article.deleteOne({'title': req.params.title })
  .then(function(dbArticle) {
   res.json(dbArticle);
  })
  .catch(function(err){
    res.json(err);
  })
});


app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});