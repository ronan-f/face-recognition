const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const saltRounds = 10;
const cors = require('cors');
const knex = require('knex')

const DB = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : '',
      password : '',
      database : 'smart-brain'
    }
  });

app.use(bodyParser.json());
app.use(cors());

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
    const {email, password} = req.body;
    email === testDb.users[0].email ? res.json(testDb.users[0]) : res.status(400).json('error user not found');
    // bcrypt.compare(password, hash).then(function(res) {
    //     // res == true
    // });
})

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    DB('users').select('*').where({ id })
        .then(user => user.length ? res.json(user[0]) : res.status(400).json('User not found'))
        .catch(e => res.status(400).json('User not found'));
})

app.post('/register', (req, res) => {
    const {email, name, password} = req.body;
    bcrypt.hash(password, saltRounds).then(function(hash) {
        DB('users')
            .returning('*')
            .insert({
                name: name,
                email: email,
                joined: new Date()
            })
            .then(user => res.json(user[0]))
            .catch(e => res.status(400).json("Couldn't register user"))
        // testDb.users.push({

        //     password: hash,

        // })
    });
})

app.put('/image', (req, res) => {
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