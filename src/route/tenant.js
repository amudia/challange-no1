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

module.exports =router