const { Router } = require('express');
const Absence = require('../Models/absence.js');


const router = Router();

router.get('/', (req, res) => {
    Absence.find((err,data) => {
        if (err){
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
});

router.post('/new', (req,res) => {
//create a new user object with our model and pass with it the request data from Postman.
    const attendance = new Absence();
        attendance.AbsenceInDays = req.body.AbsenceInDays;
        attendance.createdAt = req.body.createdAt;
        attendance.TypeOfAbsence = req.body.TypeOfAbsence;
        attendance.startedAt = req.body.startedAt;
        attendance.endedAt = req.body.endedAt;
        attendance.balance = req.body.balance;
        attendance.soldeId = req.body.soldeId;
//save to the database
    attendance.save((err, savedData) => {
        if (err) res.send({"success": false, "message": err.message ,"data": null});

        res.send({"success": true, "message": "Votre opération a été exécutée avec succès !" ,"data": savedData})
    })

    return null;
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    User.findOne({ _id:  id },
        (err, savedData) => {
            if (err){
                res.send({"success": false, "message": err.message ,"data": null});
            }
            else {
                res.send({"success": true, "message": "Votre opération a été exécutée avec succès !" ,"data": savedData})
            }
        });
});

router.get('/delete/:id', (req, res) => {
    const data = req.params.id;
    Absence.findByIdAndDelete(data,
        (err, savedData) => {
            if (err){
                res.send({"success": false, "message": err.message ,"data": null});
            }
            else {
                res.send({"success": true, "message": "Votre opération a été exécutée avec succès !" ,"data": savedData})
            }
        });
});



//Just like with the delete request, we’ll be using the _id to target the correct item.
router.put('/edit/:id', async (req, res) => {
    const data = req.params.id;
    const absence = await Absence.findByIdAndUpdate(data, req.body,
        (err, savedData) => {
            if (err){
                res.send({"success": false, "message": err.message ,"data": null});
            }
            else {
                res.send({"success": true, "message": "Votre opération a été exécutée avec succès !" ,"data": savedData})
            }
        });
});

module.exports = router;