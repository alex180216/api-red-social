const express = require('express')
const bodyParser = require('body-parser')

const router = require('./network/routes')
const config = require('./config')

const app = express()
const port =config.PORT


app.use(express.json())
router(app)

app.listen(port, ()=>{
    console.log(`Escuchando por ${config.LOCALHOST}:${port}`)
})