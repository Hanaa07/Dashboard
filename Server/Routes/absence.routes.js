const { Router } = require('express');
const Absence = require('../Models/absence.js');
const User = require('../Models/user.js');
const {data} = require("express-session/session/cookie");
const {authenticateToken} = require("./authenticateToken");


const router = Router();

//Display all records
router.get('/', authenticateToken, (req, res) => {

    User.find().exec( async (err, data) => {
        if (err) return res.send({"success": false, isAuthorised: req.isAuthorised, "message": err.message, "data": null});

        let lastAbsencesByUsers = [];


        for (const user of data) {
            console.log('user_id',user._id)
            const absences =  await Absence.find().populate({
                path: 'solde',
                populate: {
                    path: 'user',
                    match: {'_id': user._id},
                }
            }).sort({absenceStartedAt: -1})

            for (const absence of absences) {
                if (JSON.stringify(absence.solde?.user?._id) === JSON.stringify(user._id)) {
                    lastAbsencesByUsers.push(absence)
                    break;
                }
            }
        }

        return res.send({
            "success": true,
            isAuthorised: req.isAuthorised,
            "message": "Votre opération a été exécutée avec succès !",
            "data": lastAbsencesByUsers
        })
    });
});


//Display the matching record
    router.get('/:id', authenticateToken, (req, res) => {
        const {id} = req.params;
        Absence.findOne({ _id:  id },
            (err, savedData) => {
                if (err) return res.send({"success": false, isAuthorised: req.isAuthorised, "message": err.message ,"data": null});

                return res.send({"success": true, isAuthorised: req.isAuthorised, "message": "Votre opération a été exécutée avec succès !" ,"data": savedData})

            });
        return null;
    });

//Delete the matching record
    router.get('/:id/delete', authenticateToken, (req, res) => {

        if (!req.isAuthorised) {
            return res.send({"success": false, isAuthorised: req.isAuthorised, "message": 'Vous devez être connecté pour effectuer cette action !' ,"data": null});
        }

        const data = req.params.id;
        Absence.findByIdAndDelete(data,
            (err, savedData) => {
                if (err) return res.send({"success": false, isAuthorised: req.isAuthorised, "message": err.message ,"data": null});

                return res.send({"success": true, isAuthorised: req.isAuthorised, "message": "Votre opération a été exécutée avec succès !" ,"data": savedData})

            });
        return null;
    });



//Just like with the delete request, we’ll be using the _id to target the correct item.
    router.put('/:id/edit', authenticateToken, async (req, res) => {

        if (!req.isAuthorised) {
            return res.send({"success": false, isAuthorised: req.isAuthorised, "message": 'Vous devez être connecté pour effectuer cette action !' ,"data": null});
        }

        const id = req.params.id;
        const data = req.body;
        await Absence.findByIdAndUpdate(id, data,
            (err, savedData) => {
                if (err) return res.send({"success": false, isAuthorised: req.isAuthorised, "message": err.message ,"data": null});

                return res.send({"success": true, isAuthorised: req.isAuthorised, "message": "Votre opération a été exécutée avec succès !" ,"data": savedData})

            });
        return null;
    });

    module.exports = router;