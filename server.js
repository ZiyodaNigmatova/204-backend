const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const userRoute = require("./routes/userRoute")

app.use(express.json())
app.use("/auth", userRoute)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

