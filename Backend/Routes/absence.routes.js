const { Router } = require('express');
const Abs = require('../Models/absence.js');


const router = Router();



router.get('/save', (req,res) => {
//create a new user object with our model and pass with it the request data from Postman.
    const Abs1 = new Abs({
        AbsId : 1,
        AbsInDays : 3,
        createdAt: '2023-05-02',
        TypeOfAbs: 'congé',
        startedAt: '2023-05-02',
        endedAt: '2023-05-08',
        createdBy: '6454f1e2f9b259374cc7132a',
        UserId: '6454f1e2f9b259374cc7132a',
    });
//save to the database
    Abs1.save((err,data) => {
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
    User.findOne({ Absid: { $lt : "3" } }, 
    (err, data) => {
        if (err){
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
});


router.get('/delete', (req,res) => {
//To delete a record from the database using .remove()
    User.remove({ AbsInDays: 3 },
    (err, data) => {
        if (err){
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
});

router.post('/delete', (req, res) => {

    User.findByIdAndDelete((req.body.Absid),
    (err, data) => {
        if (err){
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
});

//Just like with the delete request, we’ll be using the _id to target the correct item.
router.post('/update', (req, res) => {
    User.findByIdAndUpdate(req.body.Absid, 
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