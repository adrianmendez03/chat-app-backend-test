require('dotenv').config()
const { PORT = 3000, NODE_ENV = "development"} = process.env

const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ msg: "Default route... Nothing to see here" })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})