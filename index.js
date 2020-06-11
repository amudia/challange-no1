require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const user = require('./src/route/user')

const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())
app.use('/user',user)

app.post('/',(req,res)=>{
    res.send(req.body)
})

const port = process.env.APP_PORT

app.listen(port,()=>{
    console.log('App Listen on port '+ port)
})