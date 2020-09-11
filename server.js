const path = require("path");
const express = require("express");
const app = express(); // create express app

const port = process.env.PORT || 3000 // Heroku will need the PORT environment variable

app.use(express.static('client/build'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client','build','index.html'));
})

// start express server on port 5000
app.listen(port, () => console.log(`App is live on port ${port}!`))
