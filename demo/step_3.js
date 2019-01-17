/*
  - getting username and password from form, and setting in cookies
  - if username cookie exists, display the username
  - if no username cookie, make the user log in
*/

const express = require('express')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())

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
  res.cookie('username', req.body.username)
  res.cookie('password', req.body.password)

  res.redirect('/')
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))