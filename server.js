
const path = require('path')
// const DBNAME = process.env.DBNAME
// const PORT = process.env.PORT
// Server setup
const express = require('express')
const app = express()
const api = require('./server/routes/api')

// Mongoose setup
const mongoose = require('mongoose')
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/SmallBizDB', { useNewUrlParser: true })

//Cross origin
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})


app.use(express.static(path.join(__dirname, 'build')))


app.use('/', api)


app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})



port = 8000
DBname = 'SMS-Services'

mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/${DBname}`, {useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
    app.listen(process.env.PORT || port, () => console.log(`Running server on port ` + port))
})




// const routee = process.env.port

// export default routee



