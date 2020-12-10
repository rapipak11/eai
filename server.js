var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');

app.use(bodyParser.urlencoded(
    {extended: true}
    ));
app.use(bodyParser.json());

app.get('/', function(req,res){
    return res.send({
        error: true, message: "selamat datang di API SAIA"})
      
});

var dbConn= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'psnet',
    database: 'sales'
});

dbConn.connect();

// Menampilkan data all promosi
app.get('/promotion', function (req, res) {
    dbConn.query('SELECT * FROM promosi', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'List data promosi.' });
    });
});

// Menampilkan data promosi detail
app.get('/promotion/:id', function (req, res) {
  
    let promo_id = req.params.id;
  
    if (!promo_id) {
        return res.status(400).send({ error: true, message: 'Silakan isikan parameter promo_id' });
    }
  
    dbConn.query('SELECT * FROM promosi where promotion_id=?', promo_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Detail list promosi.' });
    });
 /* 
// Menambahkan promosi baru 
app.post('/promotion', function (req, res) {
  
    let name_promotion = req.body.name_promotion;
  
    if (!name_promotion) {
        return res.status(400).send({ error:true, message: 'Silakan isikan parameter promosi' });
    }
  
    dbConn.query("INSERT INTO promosi SET ? ", { 
        name_promotion: req.body.name_promotion,
        desc_promotion: req.body.desc_promotion,
        duedate_promotion : req.body.duedate_promotion, 
        expired_promotion : req.body.expired_promotion }, 
        function (error, results, fields) {
        if (error) throw error;
        return res.status(201).send({ error: false, data: results, message: 'User baru berhasil ditambahkan.' });
    });
});

//  Update detail user id
app.put('/promotion', function (req, res) {
  
    let promotion_id = req.body.promotion_id;
    let name_promotion = req.body.name_promotion;
    let desc_promotion = req.body.desc_promotion;
    let duedate_promotion = req.body.duedate_promotion;
    let expired_promotion = req.body.expired_promotion;
  
    if (!promotion_id || !name_promotion) {
        return res.status(400).send({ error: name_promotion, message: 'Silakan isikan parameter promosi dan promosi_id' });
    }
  
    dbConn.query("UPDATE promosi SET name_promotion = ?, desc_promotion = ?, duedate_promotion = ?, expired_promotion = ? WHERE promotion_id = ?", 
                [name_promotion, desc_promotion, duedate_promotion,expired_promotion, promotion_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Data promosi berhasil diperbaharui.' });
    });
});
//  Delete user
app.delete('/promotion', function (req, res) {
  
    let promotion_id = req.body.promotion_id;
  
    if (!promotion_id) {
        return res.status(400).send({ error: true, message: 'Silakan isikan parameter promotion_id' });
    }
    dbConn.query('DELETE FROM promosi WHERE promotion_id = ?', [promotion_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'promosi berhasil dihapus.' });
    });
}); 
*/
});

app.listen(3000, function(){
    console.log("bisa di 3000");
});

module.exports = app;

