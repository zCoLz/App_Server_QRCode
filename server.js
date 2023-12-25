require('dotenv').config()

const bodyParser = require('body-parser');
const express = require('express');
const useRouteQRCode = require('./src/routes/useRouteQRCode')
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.get('/test', (req, res) => {
    res.json({ success: true, message: 'Welcome to backend' })
})
app.use('/api', useRouteQRCode)
app.listen(8080, () => {
    console.log("Node API app");
})