const db = require('../config/db');
const QRCode = require('../models/useModelQRCode')
const { DateTime } = require('luxon')

function formatTime(time) {
    const minutes = ('0' + time.getMinutes()).slice(-2);
    const seconds = ('0' + time.getUTCSeconds()).slice(-2);
    const hours = ('0' + time.getUTCHours()).slice(-2)
    return `${hours}:${minutes}:${seconds}`;
}
async function getAllQRCode() {
    try {
        const pool = await db.connect();
        const result = await pool.request().query('Select * from Code')
        console.log('Data: ', result.recordset);
        const data = result.recordset.map((row) => {
            const id = row.Id;
            const qrcode = row.QR_Code;
            const time = row.DateTime_Check ? formatTime(row.DateTime_Check) : null
            const check = row.Checked
            return new QRCode(id, qrcode, time, check)
        })
        return data
    } catch (error) {
        throw new Error(`Query error ${error.message}`)

    }
}
async function checkQRCode(req) {
    try {
        const pool = await db.connect();
        const isChecked = 0;
        const result = await pool.request().query(`Select ID, QR_Code From Code where Checked  = ${isChecked}`)
        if (result.recordset.length > 0) {
            const { QRCode } = req.body;
            if (isChecked === null || isChecked === 0) {
                await pool.request().query(`Update Code SET Checked = 1 , DateTime_Check = GETDATE() WHERE QR_Code = ${QRCode} `)
            }
        } else {
            console.log('No records found with Checked = 0');
        }
        // console.log(result.recordset);
    } catch (error) {
        throw new Error(`Query error ${error.message}`)
    }
}
module.exports = { getAllQRCode, checkQRCode }