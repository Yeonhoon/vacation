var express = require('express');
const app = require('../app');

const multer = require('multer')
const upload = multer()



var router = express.Router();
// const db = require('../config/dbConfig');
const Pool = require('pg').Pool;
const passport = require('passport');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'vacations',
  password: 'postgres',
  port: 5432,
})


router.use(express.json())
router.use(express.urlencoded({extended:false}))

router.get('/',(req,res,next)=>{
    if (req.isAuthenticated() && req.user){
        return res.json({user:req.user});
    }
    return res.json({user:null});
})

router.post('/login', (req,res,next)=>{
    console.log(req)
    if (req.isAuthenticated()){
        return res.redirect('/')
    }
    passport.authenticate('local', (authError,user,info)=>{
        if (authError) {
            console.log(authError);
            return next(authError);
        }
        if (!user){
            return res.json(info);
        }
        return req.login(user, (loginError)=>{
            if (loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.json({user});
        })
    })(req, res,next);
})

/* GET users listing. */
// router.get('/users', function(req, res, next) {
//     pool.query('select * from users', (err, result)=> {
//         if (err) throw err
//         console.log(result.rows)
//         res.send(result.rows)
//     })
// });

// router.post('/register',  function(req, res, next){
//     const {uid, uname, uemail ,upw1 } = req.body
//     pool.query('insert into users(rid, name, email, pw) values ($1, $2, $3,$4)',
//         [uid, uname, uemail, upw1],
//         (err, results)=>{
//         if (err) {throw err}
//         // console.log(results)
//         res.status(201).send('User added') 
//         res.end();
//     })

// });

// router.post('/login',upload.none(), (req,res,next)=>{
//     console.log("body: ", req.body)
//     const {username, password} = req.body
//     pool.query('select * from users where rid=$1 and pw=$2',[username, password], (err, result)=>{
//         if (err) throw err
//         req.session
//     })
// })

module.exports = router;


