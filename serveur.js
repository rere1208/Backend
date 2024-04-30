const express = require('express')
const app = express()
const port = 3000
const version = "v1"
const router = require('./routes/routes')


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(`/api/${version}/`,router)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})