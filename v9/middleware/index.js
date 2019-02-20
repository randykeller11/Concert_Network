//all the middleware goees here
var middlewareObj = {};
var Concert = require("../models/concert");
var Comment = require("../models/comment");

middlewareObj.checkConcertOwnership = function(req, res, next){
   //is the user logged in
   if(req.isAuthenticated()){
        Concert.findById(req.params.id, function(err, foundConc){
         if(err){
             req.flash("error", "Concert not found!")
            res.redirect("back");
         } else if(foundConc.author.id.equals(req.user._id)){
            next();           
        } else{
            req.flash("error", "You can only edit concerts that you created");
            res.redirect("back");
        } 
        }); 
} else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
   //is the user logged in
   if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
         if(err){
             req.flash("error", "Comment not found");
            res.redirect("back");
         } else if(foundComment.author.id.equals(req.user._id)){
            next();           
        } else{
            req.flash("error", "You can only edit comments you created");
            res.redirect("back");
        } 
        }); 
} else {
        req.flash("error", "you need to be logged in to do that!");
        res.redirect("back");
        }    
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
};

module.exports = middlewareObj;