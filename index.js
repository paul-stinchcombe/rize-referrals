require('dotenv').config()

const app = require('express')()
const mysql = require('mysql')
const conn = mysql.createConnection({
  host: '127.0.0.1',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
})

conn.connect((err) => {
  if (err) {
    console.error(err.message)
    process.exit(1)
  }
  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
  })
})

app.get('/:referral_code', async (req, res) => {
  const { refCode } = req.params
  const ok = await addReferral(refCode)
  res.status(ok ? 200 : 400).json({ success: ok })
})

async function addReferral(refCode) {
  const referral = { referral_code: refCode }
  conn.query('INSERT INTO referrals SET ?', author, (err, res) => {
    if (err) {
      console.error(err.message)
      return false
    }
    console.log('Last insert ID:', res.insertId)
    return true
  })
}
