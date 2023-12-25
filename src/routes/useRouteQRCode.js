const express = require('express')
const useQRCodeController = require('../controllers/useQRCodeController')
const router = express.Router();

router.get('/allQRCode', async (req, res) => {
    try {
        const QRCodes = await useQRCodeController.getAllQRCode()
        res.json(QRCodes)
    } catch (error) {
        console.error('Error: ', error.message);
        res.status(500).send('Internal Server')
    }
})
router.post('/checkQRCode', async (req, res) => {
    try {
        await useQRCodeController.checkQRCode(req)
        res.send('Update status successfully')
    } catch (error) {
        console.error('Error: ', error.message);
        res.status(500).send('Internal Server')
    }
})
module.exports = router;