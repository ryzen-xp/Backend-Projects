const sql = require('mysql');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));

const con = sql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'admin',
  password: '********',
  database : "students_db"
});

con.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected");
  
  }
});


//  app.use(bp.json());
 app.get('/',(req, res)=>{
  res.sendFile(__dirname + '/index.html');
 });

app.post('/submit', (req ,res)=>{
  const { name, dob, class: studentClass, mobile, address } = req.body;
  let qry = `INSERT INTO students (name, dob, class, mobile, address) VALUES (?, ?, ?, ?, ?)`;
  con.query(qry,[name, dob, studentClass, mobile, address],(err, result)=> {
      if(!err){
        res.send(`Data inserted successfully! insert id: ` + result.insertId);
      }else{
          console.log(err);
      }
});
});
// get data from database
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.get('/data',(req,res)=>{
  
  let qry = 'SELECT * FROM students';
  con.query(qry , (err,result)=>{
    if(err) {
      res.status(400).send(" not get any   data  Error!");
      console.log(err);
    }
    else{
      res.json(result);
    }
  })
});



app.listen(port , ()=>{
  console.log(`Server running on port ${port}`);
});
