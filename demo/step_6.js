/*
  bring in bcrypt!
*/

const express = require('express')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt');
const saltRounds = 10;

console.log()

const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())

let usersDatabase = {
}

app.get('/', (req, res) => {
  let username = req.cookies.username
  if (username) {
    let templateVars = {
      username: username
    }
    res.render('index', templateVars)
  } else {
    res.redirect('/login')
  }
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.post('/login', (req, res) => {
  let password = req.body.password
  let username = req.body.username

  let check
  
  if (usersDatabase[username]) {
    check = bcrypt.compareSync(password, usersDatabase[username]);
  }
  
  if (check) {
    res.cookie('username', username)
    res.redirect('/')
  } else {
    res.redirect('/login')
  }
})

app.get('/register', (req, res) => {
  res.render('register')
})

app.post('/users', (req, res) => {
  let username = req.body.username
  let password = req.body.password

  if (usersDatabase[username]) {
    res.redirect('/register')
  } else {
    // hash the password
    var hashedPassword = bcrypt.hashSync(password, saltRounds);

    // add that user to the database (w/ hashed pw)
    usersDatabase[username] = hashedPassword
    res.redirect('/login')
  }
})

app.get('/users', (req, res) => {
  res.json(usersDatabase)
})

app.get('/logout', (req, res) => {
  res.clearCookie('username')
  res.redirect('/login')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))