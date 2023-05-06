require('dotenv').config()

const app = require('express')()
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
})

connection.connect((err) => {
  if (err) {
    console.error(err.message)
    process.exit(1)
  }
  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
  })
})

app.get('/:referral_code', (req, res) => {
  const { refCode } = req.params
  res.send('<h1>Hello</h1>')
})
