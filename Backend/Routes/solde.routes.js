const { Router } = require('express');
const Solde = require('../Models/solde.js');


const router = Router();



router.get('/', (req, res) => {
    solde.find((err,data) => {
        if (err){
            console.log(err);
        }
        else {
            res.send(data);
        }
    });
});

router.post('/new', (req,res) => {
    const data = req.body;
    const solde = new Solde ();
    solde.firstName = req.body.firstName;
    solde.lastName = req.body.lastName;
    solde.startedAt = req.body.startedAt;
    solde.endedAt = req.body.endedAt;
    solde.createdAt = req.body.createdAt;
    solde.RemainingDays = req.body.RemainingDays;
    solde.UserId = req.body.UserId;
    solde.save(function(err, savedData) {
        if (err) res.send({"success": false, "message": err.message ,"data": null});

        res.send({"success": true, "message": "Votre opération a été exécutée avec succès !" ,"data": savedData})
    })

    return null;
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    Solde.findOne({ _id:  id },
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
    Solde.findByIdAndDelete(data,
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
    const solde = await Solde.findByIdAndUpdate(data, req.body,
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