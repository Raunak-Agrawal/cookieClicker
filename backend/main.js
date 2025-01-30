const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { updateUserScore } = require('./jobs/utils');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/cookieClicker', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/click', async (req, res) => {
    const { userId } = req.body;
    const result = await updateUserScore(userId, User);
    res.json(result);
});

app.get('/user/:userId', async (req, res) => {
    const user = await User.findOne({ userId: req.params.userId });
    res.json(user);
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});