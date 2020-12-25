if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(routes)
app.use(errorHandler)


app.listen(PORT, _=> {
    console.log(`listening port ${PORT}🔥 `);
})