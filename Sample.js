import { print } from 'util';

// var http = require('http');

// var server = http.createServer(function(req, res){
//     res.writeHead(200);
//     res.end('hiiiiiiiiiiiiiiii');
// });

// server.listen(8080);


// ......................................................

// var express = require('express');
// var pg = require("pg");
// var app = express();

// var connectionString = "postgres://postgres:root@localhost:5432/Test";
// app.get('/', function (req, res, next) {
//     pg.connect(connectionString,function(err,client,done) {
//        if(err){
//            console.log("not able to get connection "+ err);
//            res.status(400).send(err);
//        }
//        client.query('SELECT * FROM persons', [1],function(err,result) {
//            done(); // closing the connection;
//            if(err){
//                console.log(err);
//                res.status(400).send(err);
//            }
//            res.status(200).send(result.rows);
//        });
//     });
// });

// app.listen(4000, function () {
//     console.log('Server is running.. on Port 4000');
// });

// ..............................................................

const pg        = require('pg');
const express   = require('express');
const app       = express();

const config = {
    user: 'postgres',
    database: 'Test',
    password: 'root',
    port: 5432
};

// pool takes the object above -config- as parameter
const pool = new pg.Pool(config);

app.get('/', (req, res, next) => {
   pool.connect(function (err, client, done) {
       if (err) {
           console.log("Can not connect to the DB" + err);
       }
       client.query('SELECT * FROM persons', function (err, result) {
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            res.status(200).send(result.rows);
       })
   })
});

app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});



