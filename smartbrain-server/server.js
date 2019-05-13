const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const testDb = {
    users: [
        {
            id: 123,
            name: 'john',
            email: 'j@j.com',
            password: 'test',
            entries: 0,
            joined: new Date()
        },

        {
            id: 124,
            name: 'sally',
            email: 's@s.com',
            password: 'testing',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send(testDb.users)
})

app.post('/signin', (req, res) => {
    req.body.email === testDb.users[0].email ? res.json('SUCCESS') : res.status(400).json('error user not found');
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

app.listen(3000, () => {
    console.log('Listening on 3000')
})