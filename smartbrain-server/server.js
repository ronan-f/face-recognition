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
    DB('login').select('*').where({ email })
        .then(async response => {
            const isValid = bcrypt.compareSync(password, response[0].hash);
            if(isValid) {
                const user = await DB('users').select('*').where({ email })
                res.json(user[0]);
            } else response.status(400).json("Couldn't sign in")
        })
        .catch(e => res.status(400).json("Couldn't sign in"))
})

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    DB('users').select('*').where({ id })
        .then(user => user.length ? res.json(user[0]) : res.status(400).json('User not found'))
        .catch(e => res.status(400).json('User not found'));
})

app.post('/register', (req, res) => {
    const {email, name, password} = req.body;
    const hash = bcrypt.hashSync(password, saltRounds);
    DB.transaction(t => {
        t('login')
        .insert({
            hash,
            email
        })
        .returning('email')
        .then(loginEmail => {
            return t('users')
            .returning('*')
            .insert({
                name: name,
                email: loginEmail[0],
                joined: new Date()
            })
            .then(user => res.json(user[0]))
        })
        .then(t.commit)
        .catch(t.rollback)
    }).catch(e => res.status(400).json("Couldn't register user"))
})

app.put('/image', (req, res) => {
    const {id} = req.body;
    DB('users').where({ id })
        .increment('entries', 1)
        .returning('entries')
        .then(entries => entries.length ? res.json(entries[0]) : res.status(400).json("Couldn't increment entries"))
        .catch(e => res.status(400).json("Couldn't increment entries"));
})

app.listen(3000, () => {
    console.log('Listening on 3000')
})