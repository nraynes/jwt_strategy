const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const app = express()

app.use(express.json());
app.use(cors());
app.use('/api/', routes);

const port = 3001;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
});