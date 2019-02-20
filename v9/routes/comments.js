var express = require("express");
var router  = express.Router({mergeParams: true});
var Concert = require("../models/concert");
var Comment = require("../models/comment");
var middleware = require("../middleware");


//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
    // find concert by id
    console.log(req.params.id);
    Concert.findById(req.params.id, function(err, concert){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {concert: concert});
        }
    })
});

//Comments Create
router.post("/",middleware.isLoggedIn,function(req, res){
   //lookup concert using ID
   Concert.findById(req.params.id, function(err, concert){
       if(err){
           console.log(err);
           res.redirect("/concerts");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               comment.save();
               concert.comments.push(comment);
               concert.save();
               console.log(comment);
               req.flash("success", "New comment created");
               res.redirect('/concerts/' + concert._id);
           }
        });
       }
   });
});

//comment edit
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err, comment){
       if(err){
           res.redirect("back");
       } else {
            res.render("comments/edit", {concert_id: req.params.id, comment: comment}); 
       }
   });
});


//comment update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
      if(err){
          res.redirect("back");
      } else{
          req.flash("success", "Comment successfuly updated");
          res.redirect("/concerts/" + req.params.id);
      }
  }); 
});

//destroy comment
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Comment deleted!");
           res.redirect("/concerts/" + req.params.id);
       }
   });
});



module.exports = router;