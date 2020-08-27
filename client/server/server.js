const express = require('express')
const app = express()
const port = 3001
const cors = require('cors');
const bodyparser = require('body-parser');
const mysql = require('mysql');


//mysql연결
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'dydtnqkqh',
    database:'dydtn'
});

connection.connect();
//bodyparser및 cors 사용
app.use(bodyparser.urlencoded({extended : false}));
app.use(cors());
app.use(bodyparser.json());


//3001/ 포트로 보내기
app.post('/',(req, res) => {

  //회원가입
  const name = req.body.name;
  const mail = req.body.email;
  const pass = req.body.pass;
  const pass2 =req.body.pass2;
  const nickname = req.body.nick;
  connection.query('insert into user (name1,pass1,nickname,email1) values (?,?,?,?)', [name,pass,nickname,mail], function (err,rows,fields) {
      if(err){
          res.send(false);
      }else{
          res.send(true);
      }
  })

    // connection.query('select * from user',function (err,rows,fields){
    //    res.send(rows[0]);
    // })
})

app.post('/login',(req, res) => {
  const name = req.body.name;
  const pass = req.body.pass;
  const box = {
    namebool:false,
    passbool:false
  }
  connection.query('SELECT name1 FROM user WHERE name1 = (?)',[name], function(err, rows, fields){
    if(rows[0]===undefined){
      res.send(box);
    }
    else{
      box.namebool = true ;
      connection.query('SELECT name1, pass FROM user WHERE  name1 = (?) AND pass =(?)', [name,pass], function(err,rows,fields){
        if(rows[0]===undefined){
          res.send(box);
        }else{
          box.passbool = true;
          res.send(box);
        }
      })
    }
    //console.log(rows);
  })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

