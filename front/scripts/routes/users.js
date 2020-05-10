const router = require("express").Router();
const User = require('../userSchema');

/*getUsers con Callbacks
router.get('/', (req,res)=>{
    console.log('Entra a get /api/users');
    User.getUsers((docs)=>{
        res.json();
    }, (err)=>{
        res.status(400).json({error: err})
    })
    res.send("Usuarios");
})
*/

router.get('/', async (req,res)=>{
    console.log('Entra a get /api/users');
    
    let docs = await User.getUsersAsync();
    console.log(docs);
    res.json(docs);
})

router.get('/:id', (req,res)=>{
    console.log(req.params.id);
    console.log(req.query);

    res.send("Usuarios");
})

//app.use('/api/users',usersRouter);