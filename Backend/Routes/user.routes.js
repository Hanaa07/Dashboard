const { Router } = require('express');
const User = require('../Models/user.js');


const router = Router();



router.get('/', (req, res) => {
    User.find((err,data) => {
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
    const user = new User ();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.phoneNumber = req.body.phoneNumber;
    user.joinedIn = req.body.joinedIn;
    user.createdAt = req.body.createdAt;
    user.statut = req.body.statut;
    user.balance = req.body.balance;

    user.save(function(err, savedData) {
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
    User.findByIdAndDelete(data,
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
    const user = await User.findByIdAndUpdate(data, req.body,
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