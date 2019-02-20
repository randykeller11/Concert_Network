var express = require("express");
var router  = express.Router();
var Concert = require("../models/concert");
var middleware = require("../middleware");

//INDEX - show all concerts
router.get("/", function(req, res){
    // Get all concerts from DB
    Concert.find({}, function(err, allConcerts){
       if(err){
           console.log(err);
       } else {
          res.render("concerts/index",{concerts:allConcerts});
       }
    });
});

//CREATE - add new concert to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to concerts array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newConcert = {name: name, image: image, description: desc, author:author}
    // Create a new concert and save to DB
    Concert.create(newConcert, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to concerts page
            console.log(newlyCreated);
            res.redirect("/concerts");
        }
    });
});

//NEW - show form to create new concert
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("concerts/new"); 
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the concert with provided ID
    Concert.findById(req.params.id).populate("comments").exec(function(err, foundConcert){
        if(err){
            console.log(err);
        } else {
            console.log(foundConcert)
            //render show template with that campground
            res.render("concerts/show", {concert: foundConcert});
        }
    });
});

//edit concert route
router.get("/:id/edit", middleware.checkConcertOwnership, function(req, res) {
        Concert.findById(req.params.id, function(err, foundConc){
            res.render("concerts/edit", {concert: foundConc});           
        });
});

//update concert route

router.put("/:id", middleware.checkConcertOwnership, function(req, res){
   //find and update correct concert
   Concert.findByIdAndUpdate(req.params.id, req.body.concert, function(err){
       if(err){
           console.log(err);
           res.redirect("/concerts");
       } else {
           res.redirect("/concerts/" + req.params.id);
       }
   });
   //redirect somewhere
});


//destroy concert route
router.delete("/:id", middleware.checkConcertOwnership, function(req, res){
   //find and delete concert
   Concert.findByIdAndRemove(req.params.id, function(err){
      if(err){
          console.log(err);
          res.redirect("/concerts");
      } else {
          res.redirect("/concerts");
      }
   });
   //redirect to show page
});


module.exports = router;

