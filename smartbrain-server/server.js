const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const testDb = {
    users: [
        {
            id: '123',
            name: 'john',
            email: 'j@j.com',
            password: 'test',
            entries: 0,
            joined: new Date()
        },

        {
            id: '124',
            name: 'sally',
            email: 's@s.com',
            password: 'testing',
            entries: 0,
            joined: new Date()
        }
    ]
}

const findUser = (id) => {
    const db = testDb.users;
    for(let i = 0; i < db.length; i ++){
        if(db[i].id === id){
            return db[i];
        }
    }
    return false;
}

app.get('/', (req, res) => {
    res.send(testDb.users)
})

app.post('/signin', (req, res) => {
    req.body.email === testDb.users[0].email ? res.json('SUCCESS') : res.status(400).json('error user not found');
})

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    const user = findUser(id);
    if(user){
        res.json(user);
    } else {
        res.status(404).json('user not found')
    }

})

app.post('/register', (req, res) => {
    const {email, name, password} = req.body;
    testDb.users.push({
        id: 125,
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(testDb.users[testDb.users.length - 1])
})

app.post('/image', (req, res) => {
    const {id} = req.body;
    const user = findUser(id);
    if(user){
        user.entries ++;
        return res.json(user.entries)
    } else {
        res.status(404).json('user not found');
    }


})

app.listen(3000, () => {
    console.log('Listening on 3000')
})