const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const bodyparser = require("body-parser");
const mysql = require("mysql");

//mysql연결
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "chang_man",
});

connection.connect();
//bodyparser및 cors 사용
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyparser.json());

//3001/Signup 포트로 보내기
app.post("/Signup", (req, res) => {
  //회원가입
  const _id = req.body._id;
  const mail = req.body.email;
  const pass = req.body.pass;
  const pass2 = req.body.pass2;
  const nickname = req.body.nick;
  connection.query(
    "insert into user_info (user_id,user_password, user_nickname, user_email) values (?,?,?,?)",
    [_id, pass, nickname, mail],
    function (err, rows, fields) {
      if (err) {
        res.send(false);
      } else {
        res.send(true);
      }
    }
  );

  // connection.query('select * from user',function (err,rows,fields){
  //    res.send(rows[0]);
  // })
});
//닉네임 중복검사 하는거
app.post("/CheckNick", (req, res) => {
  const checkingNick = req.body.check_Nick;
  connection.query(
    "SELECT user_nickname FROM user_info WHERE user_nickname =(?)",
    [checkingNick],
    function (err, rows, fields) {
      console.log(rows[0]);
      if (rows[0] === undefined) {
        res.send(true); //중복 없음 사용가능
      } else {
        res.send(false); // 중복 있음 사용안됨
      }
    }
  );
});
//ID 중복검사 하는거
app.post("/CheckId", (req, res) => {
  const checkingId = req.body.check_Id;
  connection.query(
    "SELECT user_id FROM user_info WHERE user_id =(?)",
    [checkingId],
    function (err, rows, fields) {
      console.log(rows[0]);
      console.log(checkingId);
      if (rows[0] === undefined) {
        res.send(true); //중복 없음 사용가능
      } else {
        res.send(false); // 중복 있음 사용안됨
      }
    }
  );
});

app.post("/login", (req, res) => {
  const name = req.body.name;
  const pass = req.body.pass;
  const box = {
    namebool: false,
    passbool: false,
  };
  connection.query(
    "SELECT name1 FROM user WHERE name1 = (?)",
    [name],
    function (err, rows, fields) {
      if (rows[0] === undefined) {
        res.send(box);
      } else {
        box.namebool = true;
        connection.query(
          "SELECT name1, pass FROM user WHERE  name1 = (?) AND pass =(?)",
          [name, pass],
          function (err, rows, fields) {
            if (rows[0] === undefined) {
              res.send(box);
            } else {
              box.passbool = true;
              res.send(box);
            }
          }
        );
      }
      //console.log(rows);
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});