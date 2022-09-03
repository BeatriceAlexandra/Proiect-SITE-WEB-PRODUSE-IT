const express = require ('express');
const app = express();
const bodyParser = require ('body-parser');
const mysql = require ('mysql2');
const cors = require ('cors');

const db = mysql.createPool ({
    host: "localhost",
    user: "root",
    password: "Gametron1990!",
    database: "gametron_database",
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM users";
    db.query (sqlGet, (error, result) => {
        res.send(result);
    });
});
app.post("/api/post", (req, res) => {
      const {firstName, lastName, username, email, password} = req.body;
      const sqlInsert = "INSERT INTO users (firstName, lastName, username, email, password) VALUES (?,?,?,?,?)";
      db.query(sqlInsert, [firstName, lastName, username, email, password], (error, result) => {
        if(error) {
            console.log(error);
        }
        });
      });
      app.get("/order/getOrder", (req, res) => {
        const sqlGet = "SELECT * FROM orderform";
        db.query (sqlGet, (error, result) => {
            res.send(result);
        });
    });    
    app.post("/order/postOrder", (req, res) => {
        const {name, surname, phone, email, city, address} = req.body;
        const sqlInsert = "INSERT INTO orderform (name, surname, phone, email, city, address) VALUES (?,?,?,?,?,?)";
        db.query(sqlInsert, [name, surname, phone, email, city, address], (error, result) => {
          if(error) {
              console.log(error);
          }
          });
        });
app.listen(5000, () => {
    console.log ("Server is running on port 5000");
});
