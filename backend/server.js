const express = require('express')
const PORT = 5000

const app = express()

app.listen(PORT)

app.listen(PORT, () => console.log(`server started on port ${PORT}`))