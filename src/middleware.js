const jwt = require('jsonwebtoken')
const mysql = require('./config/config')
const auth = (req,res,next)=>{
    if(
        req.headers['authorization'] && 
        req.headers['authorization'].startsWith('Bearer')
        ){
            const jwt_token = req.headers['authorization'].substr(7)
            req.headers.auth_token=jwt_token
            mysql.execute('SELECT token FROM _token where token=? and is_revoked=1',[jwt_token],
            (err,result, field)=>{
                if(err){
                    res.send({
                        success:false,
                        msg: err
                    })
                }else{
                    if(result.length > 0){
                        res.send({
                            success:false,
                            msg: 'Token expired'
                        })
                    }else{
                        try{
                            const user=jwt.verify(jwt_token,process.env.APP_KEY)
                            next()
                        }catch(e){
                            res.send({success:false,msg:e})
                        }
                    }
                }
            })
        }else{
            res.send({success:false,msg:'You must be login first'})

        }
}

//superadmin
const superadmin = (req,res,next)=>{
    const {id_role} = req.headers
    if(id_role == '1'|| id_role == '2'|| id_role == '3' || id_role == '4' || id_role == '5' 
    ){
        next()
    }else{
        res.send({success:false,msg:'Access Denied'})
    }
}

//admin
const admin = (req,res,next)=>{
    const {id_role} = req.headers
    if(id_role == '2'|| id_role == '3' || id_role == '4' || id_role == '5'  ){
        next()
    }else{
        res.send({success:false,msg:'Access Denied'})
    }
}

//director
const director = (req,res,next)=>{
    const {id_role} = req.headers
    if(id_role == '3' || id_role == '4' || id_role == '5' ){
        next()
    }else{
        res.send({success:false,msg:'Access Denied'})
    }
}

//head
const head = (req,res,next)=>{
    const {id_role} = req.headers
    if(id_role == '4' || id_role == '5' ){
        next()
    }else{
        res.send({success:false,msg:'Access Denied'})
    }
}

//operator
const operator = (req,res,next)=>{
    const {id_role} = req.headers
    if(id_role == '5' ){
        next()
    }else{
        res.send({success:false,msg:'Access Denied'})
    }
}

module.exports={auth, superadmin, admin, head, operator}
