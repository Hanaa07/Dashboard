const { Router } = require('express');
const User = require('../Models/user.js');


const router = Router();



router.post('/save', (req,res) => {
//create a new user object with our model and pass with it the request data from Postman.
    const Admin1 = new User({
        user_id: 1,
        firstName: "salim",
        lastName: "el bouanani",
        username: "MIT",
        password: "MIT123",
        email: "mit@gmail.com",
        phoneNumber: 0612345145,
        createdAt: '2023-02-03',
        JoinedIn: '2020-01-01',
        Dept: "Dev",
    });
//save to the database
    Admin1.save((err,data) => {
        (err) ? console.log(err) : res.send('Data inserted');
    });
});

router.get('/findall', (req, res) => {
//To retrieve records from a database collection using .find() function.
    User.find((err,data) => {
        if (err){
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
});

router.get('/findfirst', (req, res) => {
//To retrieve a single record or the first matched document using findOne(). 
    User.findOne({ user_id: { $lt : "3" } }, 
    (err, data) => {
        if (err){
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
});
//To delete a record from the database using .remove()
router.get('/delete', (req,res) => {
    User.remove({ username: "MIT" },
    (err, data) => {
        if (err){
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
});

//we can also use .findByIdAndDelete() to easily remove a record from the db
/*
router.post('/delete', (req, res) => {
    User.findByIdAndDelete((req.body.user_id),
    (err, data) => {
        if (err){
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
});
*/


//Just like with the delete request, we’ll be using the _id to target the correct item.
router.put('/update', (req, res) => {
    User.findByIdAndUpdate(req.body.user_id, 
        {username : req.body.username}, 
            (err, data) => {
                if (err){
                    console.log(err);
                }
                else {
                    res.send(data);
                }
            });
});

module.exports = router;