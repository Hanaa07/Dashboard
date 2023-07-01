const { Router } = require('express');
const Solde = require('../Models/solde');
const Absence = require('../Models/absence');
const {authenticateToken} = require("./authenticateToken");

const router = Router();



router.get('/', authenticateToken, (req, res) => {
    Solde.find().populate({
        path: 'user'
    }).exec((err, data) => {
        if (err) return res.send({"success": false, isAuthorised: req.isAuthorised, "message": err.message ,"data": null});

        return res.send({"success": true, isAuthorised: req.isAuthorised, "message": "Votre opération a été exécutée avec succès !" ,"data": savedData})

    });
    return null;
});


router.get('/:id', authenticateToken, (req, res) => {
    const {id} = req.params;
    Solde.findOne({ _id:  id },
        (err, savedData) => {
            if (err) return res.send({"success": false, isAuthorised: req.isAuthorised, "message": err.message ,"data": null});

            return res.send({"success": true, isAuthorised: req.isAuthorised, "message": "Votre opération a été exécutée avec succès !" ,"data": savedData})

        });
    return null;
});

router.get('/:id/delete', authenticateToken, async (req, res) => {

    if (!req.isAuthorised) {
        return res.send({"success": false, isAuthorised: req.isAuthorised, "message": 'Vous devez être connecté pour effectuer cette action !' ,"data": null});
    }

    const data = req.params.id;
    try {
        const solde = await Solde.findByIdAndRemove(data);

        if (!solde) {
            return res.status(404).json({ error: 'Solde not found' });
        }

        await Absence.deleteMany({ solde: data });

        return res.status(200).json({ isAuthorised: req.isAuthorised, message: 'Balance and associated absences deleted' });
    } catch (err) {
        return res.status(500).json({ isAuthorised: req.isAuthorised, error: 'Internal server error' });
    }

});


//Just like with the delete request, we’ll be using the _id to target the correct item.
router.put('/:id/edit', authenticateToken, async (req, res) => {

    if (!req.isAuthorised) {
        return res.send({"success": false, isAuthorised: req.isAuthorised, "message": 'Vous devez être connecté pour effectuer cette action !' ,"data": null});
    }

    const data = req.params.id;
    await Solde.findByIdAndUpdate(data, req.body,
        (err, savedData) => {
            if (err) return res.send({"success": false, isAuthorised: req.isAuthorised, "message": err.message ,"data": null});

            return res.send({"success": true, isAuthorised: req.isAuthorised, "message": "Votre opération a été exécutée avec succès !" ,"data": savedData})

        });
    return null;
});

module.exports = router;