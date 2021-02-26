require('dotenv').config()
const { PORT = 3000, NODE_ENV = "development"} = process.env

const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
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

http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})