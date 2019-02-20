var mongoose = require("mongoose");
var Concert = require("./models/concert");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Coldplay @ Glasglow", 
        image: "https://www.billboard.com/files/styles/article_main_image/public/media/coldplay-performs-in-Sydney-dec-2016-billboard-1548.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Travis Scott @ The Forum", 
        image: "https://images1.phoenixnewtimes.com/imager/u/745xauto/11072705/travis-scott-phoenix-december-18-talking-stick-resort-arena.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Kali Uchis @ The Den", 
        image: "https://aestheticmag.files.wordpress.com/2017/09/kali-uchis-danforth-toronto-2017-7.jpg?w=750",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]

function seedDB(){
   //Remove all concerts
   Concert.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed concerts!");
         //add sample concerts
        data.forEach(function(seed){
            Concert.create(seed, function(err, concert){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a concert");
                    //create a comment
                    Concert.create(
                        {
                            text: "Really enjoyed the show and the visuals were stunning",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                concert.comments.push(comment);
                                concert.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;
