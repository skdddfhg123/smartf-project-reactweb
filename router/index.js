var express = require('express');
var router = express.Router();
var mysql = require('mysql');
require('dotenv').config();

var db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PW,
    database:process.env.DB_NAME
});

router.get('/topic/add', (req, res)=>{
    var sql = 'SELECT * FROM topic'
    db.query(sql, (err, result)=>{
        if(!err){
            // console.log(result)
            res.render('add', {topics:result})
        }
        else{
            console.log(err)
        }
    })
})

router.post('/topic/add', (req, res)=>{
    console.log(req.body.description)
    var title = req.body.title
    var description = req.body.description
    var author = req.body.author

    var sql = 'INSERT INTO topic (title, description, author) VALUES(?, ?, ?)'
    var params = [title, description, author]
    db.query(sql, params, (err, result)=>{
        if(!err){
            console.log("성공적으로 저장되었습니다.")
            res.redirect('/topic/add')
        }
        else{
            console.log(err)
        }
    })
})

router.get(['/topic','/topic/:id'], (req, res)=>{
    var sql = 'SELECT * FROM topic'
    db.query(sql, (err, results)=>{
        var id = req.params.id
        if(id){
            var sql1 = 'SELECT * FROM topic WHERE id=?'
            db.query(sql1, [id], (err, result)=>{
            if(!err){
                res.render('view', {topics: results, topic: result[0]})
            }else{
                console.log(err)
                res.status(500).send("Internal Server Error")
                }
        }) }
        else{
            res.render('view', {topics:results, topic:undefined})
            }
        })
    })


module.exports = router;