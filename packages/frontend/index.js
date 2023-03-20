const fallback = require('express-history-api-fallback')
const { join } = require('path')
const express = require('express')

const app = express()
const root = join(__dirname, 'dist')
app.use(express.static(root))
app.use(fallback('index.html', { root }))
app.listen(process.env.PORT || 4000)
