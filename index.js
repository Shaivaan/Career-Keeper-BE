const express = require('express');
const cors = require('cors');
const router = require('./routes/userRoutes');
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors());
app.use('/details',router);

app.listen(PORT);