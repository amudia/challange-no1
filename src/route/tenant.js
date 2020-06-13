require('dotenv').config()
const router = require('express').Router()
const mysql = require('../config')
const jwt = require('jsonwebtoken')
const bcrypt=require('bcryptjs')

const {auth} = require('../middleware')

    /* GET DETAIL TENANT */
    router.get('/',auth,(req, res)=>{
        const sql = `SELECT * FROM tbl_tenant`
        mysql.execute(sql,(err,result, field)=>{
            console.log(err)
            res.send({success:true,data:result})
        })
    })
    /* GET DETAIL TENANT */
    router.get('/:id',auth,(req, res)=>{
        const {id} = req.params
        const sql = `SELECT * FROM tbl_tenant WHERE id_tenant=?`
        mysql.execute(sql,[id],(err,result, field)=>{
            console.log(err)
            res.send({success:true,data:result})
        })
    })
    /*ADD DATA*/
    router.post('/',auth,(req,res)=>{
        const {name_tenant} =req.body
        const created_on = new Date()
        const updated_on = new Date()
        const sql = 'INSERT INTO tbl_tenant (name_tenant, created_on,updated_on) VALUES (?,?,?)'
        mysql.execute(sql,
            [name_tenant,created_on,updated_on],
            (err,result,field)=>{
            res.send({success:true,data:result})
        })
    })
    /*EDIT DATA */
    router.put('/:id',auth,(req,res)=>{
    const {name_tenant} = req.body
    const {id} = req.params
    const updated_on = new Date()
    const sql =`UPDATE tbl_tenant SET name_tenant=?, updated_on=? WHERE id_tenant=?`
    mysql.execute(sql,
        [name_tenant,updated_on,id],
        (err,result,field)=>{
            res.send({succes:true,data:result})
        })
    })

    /*DELETE DATA */
    router.delete('/:id',auth,(req,res)=>{
    const {id} = req.params
    const sql = `DELETE FROM tbl_tenant where id_tenant=?`
    mysql.execute(sql,
        [id],(err,result,field)=>{
            res.send({succes:true,data:result})
        })
})

module.exports =router