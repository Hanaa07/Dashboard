const { Router } = require('express');
const User = require('../Models/user.js');


const router = Router();



/*router.get('/save', (req,res) => {
    const Admin1 = new User({
        user_id: 1,
        firstName: "salim",
        lastName: "el bouanani",
        username: "MIT",
        password: "MIT123",
        email: "mit@gmail.com",
        phone: 0612345145,
        createdAt: '2023-02-03',
        JoinedIn: '2020-01-01',
        Dept: "Dev",
    });
    Admin1.save((err,data) => {
        (err) ? console.log(err) : res.send('Data inserted');
    });
});

const { hashPwd, comparePwd } = require('../utils/helpers.js')



router.post('/login', async (req, res) => {
    const { email, password } = req.body
    if(!email || !password) return res.send(400)
    const userDB = await User.findOne({ email })
    if(!userDB) return res.send(401)
    const isValid = comparePwd(password, userDB.password)
    if(isValid){
        console.log('Authenticated successfully!')
        req.session.user = userDB
        return res.send(200)
    }
    else{
        console.log('Authentication failed')
        return res.send(401)
    }
})

router.post('/register', async (req, res) => {
    const { username, password, email } = req.body
    const userDB = await User.findOne({ $or: [{ username }, { email }] })

    if (userDB) {
        res.status(400).send({msg : 'User already exists!' })
    }
    else {
        const newUser = await User.create({ username, password, email })
        res.send(201)
    }
})*/


module.exports = router