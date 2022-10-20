const dotenv = require('dotenv')
const express = require('express')
const UserRouter = require('./Routes/UserRouter')
const mongoose = require('mongoose')

//dot env
dotenv.config()

//express
const app = express()   // y5alini nesta3mel el method mta3 el express
app.use(express.json()) // bach tparsi el data on json
const PORT = process.env.PORT
app.listen(PORT,err=> err? console.log(err): console.log(`server is rnning on ${PORT}`))

//userrouter
app.use('/api/theusers',UserRouter) //samih li t7eb el parameter lawel


//magoose
mongoose.connect(process.env.MONGO_URI,err=>err?console.log(err):console.log(`database is connected`))