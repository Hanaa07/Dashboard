const {Router} = require('express');
const Absence = require('../Models/absence.js');
const User = require('../Models/user.js');
const {authenticateToken} = require("./authenticateToken");


const router = Router();


//Display all records
router.get('/', authenticateToken, (req, res) => {

    User.find().exec(async (err, data) => {
        if (err) return res.send({
            "success": false,
            isAuthorised: req.isAuthorised,
            "message": err.message,
            "data": null
        });

        let lastAbsencesByUsers = [];


        for (const user of data) {
            console.log('user_id', user._id)
            const absences = await Absence.find().populate({
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
    Absence.findOne({_id: id},
        (err, savedData) => {
            if (err) return res.send({
                "success": false,
                isAuthorised: req.isAuthorised,
                "message": err.message,
                "data": null
            });

            return res.send({
                "success": true,
                isAuthorised: req.isAuthorised,
                "message": "Votre opération a été exécutée avec succès !",
                "data": savedData
            })

        });
    return null;
});

//Delete the matching record
router.get('/:id/delete', authenticateToken, (req, res) => {

    if (!req.isAuthorised) {
        return res.send({
            "success": false,
            isAuthorised: req.isAuthorised,
            "message": 'Vous devez être connecté pour effectuer cette action !',
            "data": null
        });
    }

    const data = req.params.id;
    Absence.findByIdAndDelete(data,
        (err, savedData) => {
            if (err) return res.send({
                "success": false,
                isAuthorised: req.isAuthorised,
                "message": err.message,
                "data": null
            });

            return res.send({
                "success": true,
                isAuthorised: req.isAuthorised,
                "message": "Votre opération a été exécutée avec succès !",
                "data": savedData
            })

        });
    return null;
});


//Just like with the delete request, we’ll be using the _id to target the correct item.
router.put('/:id/edit', authenticateToken, async (req, res) => {

    if (!req.isAuthorised) {
        return res.send({
            "success": false,
            isAuthorised: req.isAuthorised,
            "message": 'Vous devez être connecté pour effectuer cette action !',
            "data": null
        });
    }

    const id = req.params.id;
    const data = req.body;
    await Absence.findByIdAndUpdate(id, data,
        (err, savedData) => {
            if (err) return res.send({
                "success": false,
                isAuthorised: req.isAuthorised,
                "message": err.message,
                "data": null
            });

            return res.send({
                "success": true,
                isAuthorised: req.isAuthorised,
                "message": "Votre opération a été exécutée avec succès !",
                "data": savedData
            })

        });
    return null;
});

router.post('/stats', async (req, res) => {

    const data = req.body;
    const {userId, intervalType} = data;

    let user = null;
    // if user is defined
    if (userId) {
        user = await User.findOne({_id: userId},
            (err, savedData) => {
                if (err) return null;

                return savedData
            });
    }

    const nbrDaysByMonthsByUser = 20;
    const nbrAbsenceByMonthsByUser = 1.5;

    let nbrPresence = 0;
    let nbrAbsenceAuthorized = 0;
    let startDate = new  Date();

    switch (intervalType) {
        case 1:
            startDate.setDate(1);
            nbrPresence = nbrDaysByMonthsByUser;
            nbrAbsenceAuthorized = nbrAbsenceByMonthsByUser;
            break;
        case 2:
            startDate.setMonth(startDate.getMonth() - 3);
            nbrPresence = nbrDaysByMonthsByUser * 3;
            nbrAbsenceAuthorized = nbrAbsenceByMonthsByUser * 3;
            break;
        case 3:
            startDate.setMonth(startDate.getMonth() - 6);
            nbrPresence = nbrDaysByMonthsByUser * 6;
            nbrAbsenceAuthorized = nbrAbsenceByMonthsByUser * 6;
            break;
        case 4:
            startDate.setMonth(0);
            startDate.setDate(1);
            nbrPresence = nbrDaysByMonthsByUser * 12;
            nbrAbsenceAuthorized = nbrAbsenceByMonthsByUser * 12;
            break;
        default:
            startDate.setDate(1);
            nbrPresence = nbrDaysByMonthsByUser;
            nbrAbsenceAuthorized = nbrAbsenceByMonthsByUser;
            break;
    }

    // if user is not defined
    const nbrUsers = await User.count();

    let nbrTotalPresences = user ? nbrPresence : (nbrPresence * nbrUsers);
    let nbrTotalAbsenceAuthorized = user ? nbrAbsenceAuthorized : (nbrAbsenceAuthorized * nbrUsers);

    console.log(intervalType, nbrTotalAbsenceAuthorized, nbrTotalPresences)

    let userPopulate = {
        path: 'solde',
    }


    if (user) {
        userPopulate = {
            path: 'solde',
            populate: {
                path: 'user',
                match: {'_id': user._id},
            }
        }
    }

    console.log(userPopulate)
    const userAbsences = [];

    const absences = await Absence.find({
        absenceStartedAt: {$gte: startDate}
    }).populate({...userPopulate}).sort({absenceStartedAt: 1})

    if (user) {
        for (const absence of absences) {
            if (JSON.stringify(absence.solde?.user?._id) === JSON.stringify(user?._id)) {
                userAbsences.push(absence)
            }
        }
    }

    return res.send({
        "success": true,
        isAuthorised: req.isAuthorised,
        "message": "Votre opération a été exécutée avec succès !",
        "data": {
            'nbrTotalPresences' : nbrTotalPresences,
            'nbrTotalAbsenceAuthorized' : nbrTotalAbsenceAuthorized,
            'absences' : user ? userAbsences : absences,
            'nbrUsers': nbrUsers
        }
    })

})

module.exports = router;