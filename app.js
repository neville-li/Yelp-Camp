const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));
const port = process.env.PORT || 3000;

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Cat camp", 
//         image: "https://images.unsplash.com/photo-1546975490-e8b92a360b24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
//         description: "This is a huge granite hill"
//     },(err, campground) => {
//         if(err){
//             console.log(err);
//         } else {
//             console.log("Newly created campground");
//             console.log(campground);
//         }
// });


app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {
    Campground.find({}, (err, campgrounds) => {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds});
        }
    });
});

app.post("/campgrounds", (req, res) => {
    let {name} = req.body;
    let {image} = req.body;
    let {description} = req.body;
    var newCampground = {name, image, description};
    Campground.create(newCampground, (err, newlyCreated) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});

app.get("/campgrounds/:id", (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render("show", {campground: foundCampground});
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})