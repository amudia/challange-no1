require('dotenv').config()
const router = require('express').Router()
const mysql = require('../config')
const jwt = require('jsonwebtoken')
const bcrypt=require('bcryptjs')

// const {auth,admin,restaurant,customer} = require('../middleware')
const {add} = require('../model/user')

/* LOGIN*/
router.post('/login',(req,res)=>{
    const {username,password}=req.body
    const users = 'SELECT * FROM tbl_user WHERE username=?'
    mysql.execute(users,[username], (err,result,field)=>{
        if(result.length>0){
            if(bcrypt.compareSync(password,result[0].password)){
                const roles = result[0].id_role
                const id = result[0].id_user
                const auth = jwt.sign({username, id, roles},process.env.APP_KEY)
                const token = auth
                const is_revoked = 0
                const created_on = new Date()
                const updated_on = new Date()
                const revoked = `INSERT INTO revoked_token (token, is_revoked, created_on, updated_on) VALUES (?,?,?,?)`
                mysql.execute(revoked, [token,is_revoked,created_on,updated_on], (err, result, field)=>{
                    res.send({
                        success: true,
                        auth,
                    })
                }) 
            }else{                
                console.log(password)
                res.send({
                    success:false,
                    msg: "Incorrect password"
                })
            }
        }else{
            res.send({
                success:false,
                msg: "username not found"
            })
        }
    })
})
/* REGISTER USER #ADMIN ACCESS */
router.post('/add',(req,res)=>{
    const {id_role, fullname, username, password} =req.body
    const enc_pass = bcrypt.hashSync(password);
    const created_on = new Date()
    const updated_on = new Date()
    const sql = `SELECT username from tbl_user WHERE username =?`
    mysql.execute(sql, [username], (err,result1, field)=>{
        if(result1 == ''){
            mysql.execute(add,
                [id_role,fullname, username, enc_pass,  created_on, updated_on],
                (err,result,field)=>{
                res.send({success:true,data:result})
            })
        
        }else {
            res.send({success:false, msg:'Email Does Exist'})
        }
    })
})
module.exports =router