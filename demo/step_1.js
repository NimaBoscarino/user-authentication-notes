/*
  Setting a hardcoded cookie
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

app.use(morgan('dev'));

app.get('/cookies', (req, res) => {
  console.log('COOKIES', req.cookies)

  res.json(req.cookies)
})

app.get('/', (req, res) => {
  res.cookie('test', 'haha')
  res.send('Hello World!')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))