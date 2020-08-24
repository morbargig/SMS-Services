
import 'dotenv/config'
import express from 'express'
import router from './server/routes/api'
import mongoose from 'mongoose'
import path from 'path'

(async () => {
    const app = express()
    const PORT = process.env.PORT || 3030

    // if i want to use mongodb database but i used firebase
    // const DBname = "SMS-Services
    // const MONGO_URL = process.env.MONGODB_URI || `mongodb://localhost/${DBname}`
    // const connection = await mongoose
    //     .connect(MONGO_URL, {
    //         useUnifiedTopology: true,
    //         useNewUrlParser: true
    //     })
    //     .catch(err => console.error('Error connecting db:', err.message))

    app.get('/health', (req, res) => res.json({ UP: !!connection }))

    // if (!connection) {
    //     app.use((req, res) => {
    //         res.status(500)
    //         res.json({ error: 'Server is unavailable at the moment' })
    //         console.error('Server is unavailable at the moment')
    //     })
    // } 
    // else {
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
        next()
    })
    app.use(express.static(path.join(__dirname, 'build')))
    app.use('/', router)
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'))
    })
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
    // }
})()