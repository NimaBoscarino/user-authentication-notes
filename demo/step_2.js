/*
  Setting a couple hardcoded cookies
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
  console.log(req.cookies)
  res.cookie('test', 'haha')
  res.cookie('woooo', 'ayy_lol_suh_dude')
  res.send('Hello World!')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))