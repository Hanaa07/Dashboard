const { Router } = require('express');
const User = require('../Models/user');
const Solde = require('../Models/solde');
const Absence = require('../Models/absence');
const {authenticateToken} = require("./authenticateToken");
const router = Router();



router.get('/', authenticateToken, (req, res) => {
    User.find((err,savedData) => {
        if (err) return res.send({"success": false, isAuthorised: req.isAuthorised, "message": err.message ,"data": null});

        return res.send({"success": true, isAuthorised: req.isAuthorised, "message": "Votre opération a été exécutée avec succès !" ,"data": savedData})
    })
    return null;
});

router.post('/new', authenticateToken, (req,res) => {

    if (!req.isAuthorised) {
        return res.send({"success": false, isAuthorised: req.isAuthorised, "message": 'Vous devez être connecté pour effectuer cette action !' ,"data": null});
    }

    const data = req.body;
    const user = new User ();
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.adresse = data.adresse;
    user.email = data.email;
    user.phone = data.phone;
    user.joinedIn = data.joinedIn;
    user.statut = data.statut;
    user.exp_pro = data.exp_pro;
    user.exp_mit = data.exp_mit;
    user.birth = data.birth;
    user.password = data.password;

    user.save(function(err, savedData) {
        if (err) return res.send({"success": false, isAuthorised: req.isAuthorised, "message": err.message ,"data": null});

        return res.send({"success": true, isAuthorised: req.isAuthorised, "message": "Votre opération a été exécutée avec succès !" ,"data": savedData})
    })
    return null;
});

router.get('/:id', authenticateToken, (req, res) => {
    const {id} = req.params;
    User.findOne({ _id:  id },
    (err, savedData) => {
        if (err) return res.send({"success": false, isAuthorised: req.isAuthorised, "message": err.message ,"data": null});

        return res.send({"success": true, isAuthorised: req.isAuthorised, "message": "Votre opération a été exécutée avec succès !" ,"data": savedData})
    });
    return null;
});

router.get('/:id/delete', authenticateToken, async (req, res) => {

    const data = req.params.id;
    try {
        const user = await User.findByIdAndDelete(data);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await Solde.deleteMany({ user: data });

        return res.status(200).json({ isAuthorised: req.isAuthorised, message: 'User and associated posts deleted' });
    } catch (err) {
        return res.status(500).json({ isAuthorised: req.isAuthorised, error: 'Internal server error' });
    }
});

router.get('/:id/soldes', authenticateToken, (req, res) => {
    Solde.find().populate({path: 'user', match: {'_id': req.params.id}}).exec((err,soldes) => {
        if (err) return res.send({"success": false, isAuthorised: req.isAuthorised, "message": err.message ,"data": null});

        soldes = soldes.filter(solde => solde.user );

        return res.send({"success": true, isAuthorised: req.isAuthorised, "message": "Votre opération a été exécutée avec succès !" ,"data": soldes})
    })
    return null;
});

router.get('/:id/lastSolde', authenticateToken, (req, res) => {

    Solde.find().populate({path: 'user', match: {'_id': req.params.id}}).sort({createdAt: -1}).exec((err,savedData) => {
        if (err) return res.send({"success": false, isAuthorised: req.isAuthorised, "message": err.message ,"data": null});

        let lastSolde = null;

        for (const solde of savedData) {
            if (JSON.stringify(solde.user?._id) === JSON.stringify(req.params.id)) {
                lastSolde = solde;
                break;
            }
        }

        return res.send({"success": true, isAuthorised: req.isAuthorised, "message": "Votre opération a été exécutée avec succès !" ,"data": lastSolde})
    })

    return null;
});

router.get('/:id/absences', authenticateToken, (req, res) => {
    const userId = req.params.id;

    Absence.find().populate({path: 'solde', match: {'user': userId}, populate: {path: 'user'}}).exec((err, absences) => {
        if (err) return res.send({"success": false, isAuthorised: req.isAuthorised, "message": err.message ,"data": null});

        absences = absences.filter(absence => absence.solde);

        return res.send({"success": true, isAuthorised: req.isAuthorised, "message": "Votre opération a été exécutée avec succès !" ,"data": absences})
    })

    return null;
});
router.post('/:id/solde/new', authenticateToken, (req, res) => {

    if (!req.isAuthorised) {
        return res.send({"success": false, isAuthorised: req.isAuthorised, "message": 'Vous devez être connecté pour effectuer cette action !' ,"data": null});
    }

    const data = req.body;
    const solde = new Solde ();
    solde.balanceStartedAt = data.balanceStartedAt;
    solde.balanceEndedAt = data.balanceEndedAt;
    solde.initialDays = data.initialDays;
    solde.remainingDays = data.remainingDays;
    solde.user= req.params.id;

    solde.save(function(err, savedData) {
        if (err) return res.send({"success": false, isAuthorised: req.isAuthorised, "message": err.message ,"data": null});

        return res.send({"success": true, isAuthorised: req.isAuthorised, "message": "Votre opération a été exécutée avec succès !" ,"data": savedData})

    });
    return null;
});

router.post('/absence/new', authenticateToken, (req,res) => {

    if (!req.isAuthorised) {
        return res.send({"success": false, isAuthorised: req.isAuthorised, "message": 'Vous devez être connecté pour effectuer cette action !' ,"data": null});
    }
//create a new user object with our model and pass with it the request data from Postman.
    const data = req.body;

    const absence = new Absence();
    absence.days = data.days;
    absence.absenceStartedAt = data.absenceStartedAt;
    absence.absenceEndedAt = data.absenceEndedAt;
    absence.solde = data.soldeId;

//save to the database

    absence.save((err, savedData) => {
        if (err) return res.send({"success": false, isAuthorised: req.isAuthorised, "message": err.message ,"data": null});

        return res.send({"success": true, isAuthorised: req.isAuthorised, "message": "Votre opération a été exécutée avec succès !" ,"data": savedData})
    })

    return null;
});

//Just like with the delete request, we’ll be using the _id to target the correct item.
router.put('/:id/edit', authenticateToken, async (req, res) => {

    if (!req.isAuthorised) {
        return res.send({"success": false, isAuthorised: req.isAuthorised, "message": 'Vous devez être connecté pour effectuer cette action !' ,"data": null});
    }

    const data = req.params.id;
    await User.findByIdAndUpdate(data, req.body,
            (err, savedData) => {
                if (err) return res.send({"success": false, isAuthorised: req.isAuthorised, "message": err.message ,"data": null})
                return res.send({"success": true, isAuthorised: req.isAuthorised, "message": "Votre opération a été exécutée avec succès !" ,"data": savedData})
            });
    return null;
});

module.exports = router;