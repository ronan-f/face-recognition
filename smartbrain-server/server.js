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
      connectionString : process.env.DATABASE_URL,
      ssl: true
    }
  });

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("It's working")
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
    if(!email || !name || !password) {
        return res.status(400).json("Invalid submission");
    }
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

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on ${process.env.PORT || 3000}`)
})