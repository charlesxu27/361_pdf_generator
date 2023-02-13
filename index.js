const express = require('express');
const router = require('./routes')

const app = express();
app.use(express.json());
app.use(router);
app.listen(5555, () => console.log('Server running on http://localhost:5555'))

