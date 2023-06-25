const { Router } = require('express');
const Absence = require('../Models/absence.js');


const router = Router();

//Display all records
router.get('/', (req, res) => {

    Absence.find().populate({
        path: 'solde',
        populate: {
            path: 'user'
        }
    }).exec((err,data) => {
        if (err) return res.send({"success": false, "message": err.message ,"data": null});

        return res.send({"success": true, "message": "Votre opération a été exécutée avec succès !" ,"data": data})
    });
});

router.post('/new', (req,res) => {
//create a new user object with our model and pass with it the request data from Postman.
    const data = req.body;
    const attendance = new Absence();
    attendance.days = data.days;
    attendance.absenceStartedAt = data.absenceStartedAt;
    attendance.absenceEndedAt = data.absenceEndedAt;
    attendance.solde = data.solde;

//save to the database

    attendance.save((err, savedData) => {
        if (err) return res.send({"success": false, "message": err.message ,"data": null});

        return res.send({"success": true, "message": "Votre opération a été exécutée avec succès !" ,"data": savedData})
    })

    return null;
});

//Display the matching record
router.get('/:id', (req, res) => {
    const {id} = req.params;
    Absence.findOne({ _id:  id },
        (err, savedData) => {
            if (err) return res.send({"success": false, "message": err.message ,"data": null});

            return res.send({"success": true, "message": "Votre opération a été exécutée avec succès !" ,"data": savedData})

        });
    return null;
});

//Delete the matching record
router.get('/delete/:id', (req, res) => {
    const data = req.params.id;
    Absence.findByIdAndDelete(data,
        (err, savedData) => {
            if (err) return res.send({"success": false, "message": err.message ,"data": null});

            return res.send({"success": true, "message": "Votre opération a été exécutée avec succès !" ,"data": savedData})

        });
    return null;
});



//Just like with the delete request, we’ll be using the _id to target the correct item.
router.put('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    await Absence.findByIdAndUpdate(id, data,
        (err, savedData) => {
            if (err) return res.send({"success": false, "message": err.message ,"data": null});

            return res.send({"success": true, "message": "Votre opération a été exécutée avec succès !" ,"data": savedData})

        });
    return null;
});

module.exports = router;