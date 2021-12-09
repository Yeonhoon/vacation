var express = require('express');
const app = require('../app');

const multer = require('multer')
const upload = multer()



var router = express.Router();
// const db = require('../config/dbConfig');
const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'vacations',
  password: 'postgres',
  port: 5432,
})


router.use(express.json())
router.use(express.urlencoded({extended:false}))


/* GET users listing. */
router.get('/users', function(req, res, next) {
    pool.query('select * from users', (err, result)=> {
        if (err) throw err
        console.log(result.rows)
        res.send(result.rows)
    })
});

router.post('/register',  function(req, res, next){
    const {uid, uname, uemail ,upw1 } = req.body
    pool.query('insert into users(rid, name, email, pw) values ($1, $2, $3,$4)',
        [uid, uname, uemail, upw1],
        (err, results)=>{
        if (err) {throw err}
        // console.log(results)
        res.status(201).send('User added') 
        res.end();
    })

});

router.post('/login',upload.none(), (req,res,next)=>{
    console.log("body: ", req.body)
    const {username, password} = req.body
    pool.query('select * from users where rid=$1 and pw=$2',[username, password], (err, result)=>{
        if (err) throw err
        req.session
    })
})

module.exports = router;


