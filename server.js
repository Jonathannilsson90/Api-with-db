require('dotenv').config()
const express = require('express')
const port = process.env.PORT || 5000
const mongoose = require('mongoose')

const app = express()

app.use(express.json())
app.use('/api/books', require('./routes/bookRoutes.js') )

mongoose.connect(
    process.env.DB_URL, () => console.log('DB connected')
    )
    
app.listen(port, () => console.log(`Server started on port ${port}`))