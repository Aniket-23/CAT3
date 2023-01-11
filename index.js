const express = require('express')
const app = express()
var cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const port = 3000
const hostname = 'localhost'

const db = "infosys"
const tbl = "spring"

app.use(cors())

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

var corsOptions = {
    origin: '*',
    methods: "GET",
    optionsSuccessStatus: 200 
}
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: db
});

connection.connect((err) => {
    if (err)
        throw (err)
    console.log("MySql Connected")
})

app.get('/', (req, res) => {
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    connection.query("SELECT * from " + tbl, function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})

app.post('/new', (req,res) => {
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    var resp = req.body
    console.log(resp['id'])
    connection.query("INSERT into " + tbl + " VALUES (" + resp['id'] + ",\'" + resp['name'] + "\',\'" + resp['phone_num'] + "\',\'" + resp['email'] + "\',\'" + resp['booking_status'] + "\')", function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})

app.post('/update', (req,res) => {
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    var resp = req.body
    console.log(resp['id'])
    connection.query("UPDATE " + tbl + " SET name= \'" + resp['name'] + "\', phone_num=\'" + resp['phone_num'] + "\', email=\'" + resp['email'] + "\',booking_status=\'" + resp['booking_status'] + "\' where id = " + resp['id'], function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})

app.post('/search', (req, res) => {
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    var getStatus = req.body;
    console.log("hello")
    console.log(req.body)
    connection.query("SELECT * from " + tbl + " where booking_status = \'" + getStatus['booking_status'] + "\'", function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})

app.post('/delete', (req,res) => {
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    var delId = req.body['delID']

    connection.query("DELETE from " + tbl + " where id = " + delId, function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})

app.get('/*', (req, res) => {
    res.status(404)
    res.end("<h1>404 Error</h1>")
})
app.listen(port, hostname, () => {
    console.log(`App listening at http://${hostname}:${port}`)
})