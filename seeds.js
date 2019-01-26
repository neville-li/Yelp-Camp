const mongoose = require("mongoose");
const {Campground} = require("./models/campground");
const {Comment} = require("./models/comment");

const data = [
    {
        name: "Cloud's Rest",
        image: "https://images.unsplash.com/photo-1515408320194-59643816c5b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description: "Consequat pariatur labore in reprehenderit amet nostrud voluptate amet officia voluptate cillum dolor deserunt eiusmod. Est incididunt nostrud ullamco nulla non enim veniam consequat mollit proident duis laborum minim. Incididunt deserunt sint proident aute amet aliqua incididunt esse Lorem elit officia sit. Enim id dolore aliqua exercitation mollit sunt. Nulla amet ex id in mollit qui officia mollit ea laboris enim reprehenderit. Sunt commodo consequat pariatur esse esse est fugiat irure ex duis consequat nostrud id."
    },
    {
        name: "Dessert Masa",
        image: "https://images.unsplash.com/photo-1440262206549-8fe2c3b8bf8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description: "Dolor cillum nulla aliqua cupidatat aliqua nisi ex laboris qui irure qui qui. Eu nulla eiusmod fugiat ad eiusmod nulla reprehenderit officia magna excepteur. Enim elit consectetur commodo anim consectetur aliqua ex voluptate nostrud ut. Laboris labore magna ea ea proident officia. Ex minim quis veniam velit nostrud cupidatat nisi excepteur ullamco ullamco reprehenderit in. Proident eu duis dolore aliquip nisi amet irure."
    },
    {
        name: "Mother Nature",
        image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        description: "Dolor veniam veniam proident nulla velit elit aliquip cillum velit ipsum deserunt minim Lorem. Ad nostrud dolor consequat velit est laborum laboris elit. Reprehenderit consequat cupidatat tempor non non sit ut nulla tempor quis ipsum ullamco sit quis. Laborum consequat dolor dolore minim Lorem sint est fugiat amet dolor tempor. Qui commodo minim ad non. Cillum aliquip et irure duis aliqua pariatur ipsum enim tempor."
    }
]

function seedDB() {

    new Promise((resolve, reject) => {
        Campground.deleteMany({}, (err) => {
            if(err) console.log(err);
            console.log("removed campgrounds!");
        });
    
        Comment.deleteMany({}, (err) => {
            if(err) console.log(err);
            console.log("removed comments!");
            resolve();
        });
    }).then(() => {
        data.forEach((seed) => {
            Campground.create(seed, (err, campground) => {
                if(err) return console.log(err);
                console.log("Added Campground");
                Comment.create({
                    text: "Proident voluptate aliquip minim voluptate nisi adipisicing commodo aliquip tempor enim sit. Amet qui ad quis reprehenderit nostrud irure ipsum eu minim sunt in. Non nostrud laboris aliqua nostrud qui veniam dolore et.",
                    author:"Homer"
                }, (err, comment) => {
                    if(err) console.log(err);
                    campground.comments.push(comment);
                    campground.save();
                    console.log("Created new comment");
                });
            });
        });
    });
}

module.exports = {
    seedDB
}