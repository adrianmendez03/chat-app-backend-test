require('dotenv').config()
const { PORT = 3000, NODE_ENV = "development"} = process.env

const cors = require('cors')
const express = require('express')
const app = express()
const path = require('path')
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json(path.join(__dirname, '/index.html'))
})

io.on('connection', socket => {
    socket.broadcast.emit('joined', 'User has joined.')
    socket.on('disconnected', () => {
        io.emit('left', 'User has left')
        console.log('User disconnected')
    })
    socket.on('chat message', msg => {
        io.emit('chat message', msg)
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})