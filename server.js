const express = require('express')
const app = express()

var port = process.env.PORT || 8080

app.use( express.static( "views" ) );

app.set('view engine', 'ejs')

var api = require('./routes/api');
app.use('/', api);


// app.get('/', function (req, res) {
//     res.render('index');
// })

app.listen(port, function () {
  console.log('weather app running')
})

module.exports = app;