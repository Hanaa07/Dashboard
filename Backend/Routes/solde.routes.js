const { Router } = require('express');
const Solde = require('../Models/solde');
const Absence = require('../Models/absence');


const router = Router();



router.get('/', (req, res) => {
    Solde.find().populate({
        path: 'user'
    }).exec((err, data) => {
        if (err) return res.send({"success": false, "message": err.message ,"data": null});

        return res.send({"success": true, "message": "Votre opération a été exécutée avec succès !" ,"data": savedData})

    });
    return null;
});

router.post('/new', (req,res) => {
    const data = req.body;
    const solde = new Solde ();
    solde.balanceStartedAt = data.balanceStartedAt;
    solde.balanceEndedAt = data.balanceEndedAt;
    solde.initialDays = data.initialDays;
    solde.remainingDays = data.remainingDays;
    solde.user= data.user;

    solde.save(function(err, savedData) {
        if (err) return res.send({"success": false, "message": err.message ,"data": null});

        return res.send({"success": true, "message": "Votre opération a été exécutée avec succès !" ,"data": savedData})

    });
    return null;
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    Solde.findOne({ _id:  id },
        (err, savedData) => {
            if (err) return res.send({"success": false, "message": err.message ,"data": null});

            return res.send({"success": true, "message": "Votre opération a été exécutée avec succès !" ,"data": savedData})

        });
    return null;
});

router.get('/delete/:id', async (req, res) => {
    const data = req.params.id;
    try {
        // Find the user and remove it
        const solde = await Solde.findByIdAndRemove(data);

        if (!solde) {
            return res.status(404).json({ error: 'Solde not found' });
        }

        // Find and delete all posts authored by the user
        await Absence.deleteMany({ author: data });

        return res.status(200).json({ message: 'Balance and associated absences deleted' });
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }

});


//Just like with the delete request, we’ll be using the _id to target the correct item.
router.put('/edit/:id', async (req, res) => {
    const data = req.params.id;
    const solde = await Solde.findByIdAndUpdate(data, req.body,
        (err, savedData) => {
            if (err) return res.send({"success": false, "message": err.message ,"data": null});

            return res.send({"success": true, "message": "Votre opération a été exécutée avec succès !" ,"data": savedData})

        });
    return null;
});

module.exports = router;