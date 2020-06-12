require('dotenv').config()
const router = require('express').Router()
const mysql = require('../config')
const jwt = require('jsonwebtoken')
const bcrypt=require('bcryptjs')

const {auth,superadmin, admin, director, head, operator} = require('../middleware')
const {add,edit} = require('../model/user')

/* LOGIN*/
router.post('/login',(req,res)=>{
    const {username,password}=req.body
    const users = 'SELECT * FROM tbl_user WHERE username=?'
    mysql.execute(users,[username], (err,result,field)=>{
        if(result.length>0){
            if(bcrypt.compareSync(password,result[0].password)){
                const roles = result[0].id_role
                const iduser = result[0].id_user
                const id = result[0].id_tenant
                const auth = jwt.sign({username, iduser, roles, id},process.env.APP_KEY)
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


/* LOGOUT */
router.get('/logout', auth,(req, res)=>{
    const token = req.headers.auth_token
    // const is_revoked = 1
    const sql = 'UPDATE revoked_token SET is_revoked=1 where token=?'
    mysql.execute(sql, [ token], (err, result, field)=>{
        res.send({
            result,
            success:true,
            msg:req.headers.auth_token
        })

    })
})


/* GET LIST USER */
router.get('/:id',auth,superadmin,(req, res)=>{
    const {id_role} = req.headers
    const {id} = req.params
    if(id_role == 1) {
            const sql = `SELECT tbl_role.id_role, tbl_role.name_role, tbl_tenant.id_tenant, tbl_tenant.name_tenant, tbl_user.id_user, tbl_user.fullname, tbl_user.created_on, tbl_user.updated_on FROM tbl_user INNER JOIN tbl_role ON tbl_user.id_role=tbl_role.id_role INNER JOIN tbl_tenant ON tbl_user.id_tenant=tbl_tenant.id_tenant WHERE tbl_user.id_tenant > 0 && tbl_user.id_role BETWEEN 1 AND 5`
            mysql.execute(sql,[id],(err1,result1,field1)=>{
                res.send({success:true,data:result1})
            })
        }
        else if(id_role == 2){
            const sql = `SELECT tbl_role.id_role, tbl_role.name_role, tbl_tenant.id_tenant, tbl_tenant.name_tenant, tbl_user.id_user, tbl_user.fullname, tbl_user.created_on, tbl_user.updated_on FROM tbl_user INNER JOIN tbl_role ON tbl_user.id_role=tbl_role.id_role INNER JOIN tbl_tenant ON tbl_user.id_tenant=tbl_tenant.id_tenant WHERE tbl_user.id_tenant =? && tbl_user.id_role BETWEEN 2 AND 5 `
            mysql.execute(sql,[id],(err1,result1,field1)=>{
                res.send({success:true,data:result1})
            })
        }
        else if(id_role == 3){
            const sql = `SELECT tbl_role.id_role, tbl_role.name_role, tbl_tenant.id_tenant, tbl_tenant.name_tenant, tbl_user.id_user, tbl_user.fullname, tbl_user.created_on, tbl_user.updated_on FROM tbl_user INNER JOIN tbl_role ON tbl_user.id_role=tbl_role.id_role INNER JOIN tbl_tenant ON tbl_user.id_tenant=tbl_tenant.id_tenant WHERE tbl_user.id_tenant =? && tbl_user.id_role BETWEEN 3 AND 5`
            mysql.execute(sql,[id],(err1,result1,field1)=>{
                res.send({success:true,data:result1})
            })
        }
        else if(id_role == 4){
            const sql = `SELECT tbl_role.id_role, tbl_role.name_role, tbl_tenant.id_tenant, tbl_tenant.name_tenant, tbl_user.id_user, tbl_user.fullname, tbl_user.created_on, tbl_user.updated_on FROM tbl_user INNER JOIN tbl_role ON tbl_user.id_role=tbl_role.id_role INNER JOIN tbl_tenant ON tbl_user.id_tenant=tbl_tenant.id_tenant WHERE tbl_user.id_tenant =? && tbl_user.id_role BETWEEN 4 AND 5`
            mysql.execute(sql,[id],(err1,result1,field1)=>{
                res.send({success:true,data:result1})
            })
        }
        else if (id_role == 5){
            const sql = `SELECT tbl_role.id_role, tbl_role.name_role, tbl_tenant.id_tenant, tbl_tenant.name_tenant, tbl_user.id_user, tbl_user.fullname, tbl_user.created_on, tbl_user.updated_on FROM tbl_user INNER JOIN tbl_role ON tbl_user.id_role=tbl_role.id_role INNER JOIN tbl_tenant ON tbl_user.id_tenant=tbl_tenant.id_tenant WHERE tbl_user.id_tenant =? && tbl_user.id_role = 5`
            mysql.execute(sql,[id],(err1,result1,field1)=>{
                res.send({success:true,data:result1})
            })
        }
        
    })
 
    /* GET DETAIL USER */
    router.get('/profile/:iduser',auth,(req, res)=>{
        const {iduser} = req.params
        const sql = `SELECT tbl_role.id_role, tbl_role.name_role, tbl_tenant.id_tenant, tbl_tenant.name_tenant, tbl_user.id_user, tbl_user.fullname, tbl_user.created_on, tbl_user.updated_on FROM tbl_user INNER JOIN tbl_role ON tbl_user.id_role=tbl_role.id_role INNER JOIN tbl_tenant ON tbl_user.id_tenant=tbl_tenant.id_tenant WHERE tbl_user.id_user=?`
        mysql.execute(sql,[iduser],(err,result, field)=>{
            console.log(err)
            res.send({success:true,data:result})
        })
    })
    
/* ADD USER */
router.post('/',auth,superadmin,(req,res)=>{
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

/* UPDATE USER */
router.put('/:id',auth,superadmin,(req,res)=>{
    const {id_tenant, fullname,username,password} =req.body
    const {id} = req.params
    const {id_role}=req.headers
    const enc_pass = bcrypt.hashSync(password)
    const updated_on = new Date()
    if(id_role == 1) {
        const sql = `SELECT username from tbl_user WHERE username =?`
        mysql.execute(sql, [username], (err,result1, field)=>{
            if(result1 == ''){
                mysql.execute(edit,
                    [id_role, id_tenant, fullname,username,enc_pass,updated_on,id],(err,result,field)=>{
                    res.send({
                        success:true,
                        msg:'Update Success',
                        data:result
                    })
                })         
            }else {
                res.send({
                    success:false, 
                    msg:'Username Does Exist'
                })
            }
        })
    }
    else if(id_role == "2") {
        const sql = `SELECT username from tbl_user WHERE username =?`
        mysql.execute(sql, [username], (err,result1, field)=>{
            if(result1 == ''){
                mysql.execute(edit,
                    [id_role, id_tenant, fullname,username,enc_pass,updated_on,id],(err,result,field)=>{
                    res.send({
                        success:true,
                        msg:'Update Success',
                        data:result
                    })
                })          
            }else {
                res.send({
                    success:false, 
                    msg:'Username Does Exist'
                })
            }
        })
    }
    else if (id_role == "3" || id_role == "4" || id_role == "5" ) {
        res.send({
            success:false, 
            msg:"Access Denied"
        })   
    }

   
})
module.exports =router