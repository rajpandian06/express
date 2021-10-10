const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()
const port = 3006;
app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({ extended: false }))
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'express'
})

connection.connect(function (err) {
    if (err) throw err;
    console.log('connected');
})


app.post('/submit', function (req, res) {
    
    var sql = "insert into user values('" + req.body.name + "','" + req.body.email + "','" + req.body.city + "','" + req.body.pincode + "')"
    connection.query(sql,function (err) {
        if (err) throw err

        res.render('index', { title: 'data saved', message: 'data saved succssfully' })
    })

    connection.end();
})
app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname })
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})