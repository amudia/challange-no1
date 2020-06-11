require('dotenv').config()
const router = require('express').Router()
const mysql = require('../config')
const jwt = require('jsonwebtoken')
const bcrypt=require('bcryptjs')

const {auth,superadmin,admin,director, head, operator, alluser, superadmint, admint, directort, headt, operatort, allusert } = require('../middleware')
const {add,list} = require('../model/user')

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


/* ADD USER */
router.post('/add',auth,superadmin,(req,res)=>{
    const {id_role,id_tenant, fullname, username, password} =req.body
    const enc_pass = bcrypt.hashSync(password);
    const created_on = new Date()
    const updated_on = new Date()
    const sql = `SELECT username from tbl_user WHERE username =?`
    mysql.execute(sql, [username], (err,result1, field)=>{
        if(result1 == ''){
            mysql.execute(add,
                [id_role,id_tenant,fullname, username, enc_pass,  created_on, updated_on],
                (err,result,field)=>{
                res.send({success:true,data:result})
            })
        
        }else {
            res.send({success:false, msg:'Username Does Exist'})
        }
    })
})

/* GET LIST USER */
router.get('/:id_tenant',auth,(req, res)=>{
    const {id_role} = req.headers
    const {id_tenant} = req.params
        if(id_role == "1") {
            const sql = `SELECT * from tbl_user where id_tenant > 0 && id_role BETWEEN 1 AND 5`
            mysql.execute(sql,[id_tenant],(err1,result1,field1)=>{
                res.send({success:true,data:result1})
            })
        }
        else if(id_role == "2"){
            const sql = `SELECT * from tbl_user where id_tenant=? && id_role BETWEEN 2 AND 5 `
            mysql.execute(sql,[id_tenant],(err1,result1,field1)=>{
                res.send({success:true,data:result1})
            })
        }
        else if(id_role == "3"){
            const sql = `SELECT * from tbl_user where id_tenant=? && id_role BETWEEN 3 AND 5`
            mysql.execute(sql,[id_tenant],(err1,result1,field1)=>{
                res.send({success:true,data:result1})
            })
        }
        else if(id_role == "4"){
            const sql = `SELECT * from tbl_user where id_tenant=? && id_role BETWEEN 4 AND 5`
            mysql.execute(sql,[id_tenant],(err1,result1,field1)=>{
                res.send({success:true,data:result1})
            })
        }
        else if (id_role == "5"){
            const sql = `SELECT * from tbl_user where id_tenant=? && id_role = 5`
            mysql.execute(sql,[id_tenant],(err1,result1,field1)=>{
                res.send({success:true,data:result1})
            })
        }
    
})

module.exports =router