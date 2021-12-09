const pool = require('../config/dbConfig')
const getUsers = (res) => {
    pool.query('select * from users', (err, result)=> {
        if (err) throw err
        console.log(result.rows)
        res(result.rows)
    })
}

const getUserByName = (req, res) => {
  const name = req.params.name
  
  pool.query('SELECT * FROM users WHERE name = $1', [name], (err, results) => {
    if (err) throw err
    res.status(200).json(results.rows)
})
}

const createUser = (req, res) => {
    // const { rid, name, email } = req.body
    // console.log(rid,name,email,pw)
    
    pool.query('insert into users (rid, name, email) values ($1, $2, $3)',[rid,name,email],
     (err, results)=>{
        if (err) throw err
        res.status(201).send('User added') 
     }
    )
}

module.exports = {
  getUsers,
  getUserByName,
  createUser,
}