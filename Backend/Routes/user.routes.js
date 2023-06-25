const { Router } = require('express');
const User = require('../Models/user');
const Solde = require('../Models/solde');

const router = Router();



router.get('/', (req, res) => {
    User.find((err,savedData) => {
        if (err) return res.send({"success": false, "message": err.message ,"data": null});

        return res.send({"success": true, "message": "Votre opération a été exécutée avec succès !" ,"data": savedData})
    })
    return null;
});

router.post('/new', (req,res) => {
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


    user.save(function(err, savedData) {
        if (err) return res.send({"success": false, "message": err.message ,"data": null});

        return res.send({"success": true, "message": "Votre opération a été exécutée avec succès !" ,"data": savedData})
    })
    return null;
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    User.findOne({ _id:  id },
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
        const user = await User.findByIdAndDelete(data);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find and delete all posts authored by the user
        await Solde.deleteMany({ author: data });

        return res.status(200).json({ message: 'User and associated posts deleted' });
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});




//Just like with the delete request, we’ll be using the _id to target the correct item.
router.put('/edit/:id', async (req, res) => {
    const data = req.params.id;
    const user = await User.findByIdAndUpdate(data, req.body,
            (err, savedData) => {
                if (err) return res.send({"success": false, "message": err.message ,"data": null})
                return res.send({"success": true, "message": "Votre opération a été exécutée avec succès !" ,"data": savedData})
            });
    return null;
});

module.exports = router;