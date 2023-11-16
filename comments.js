// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { check, validationResult } = require('express-validator');

// Create web server
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Connect to database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/comments', { useNewUrlParser: true, useUnifiedTopology: true });

// Define model
const Comment = mongoose.model('Comment', {
    name: String,
    message: String
});

// Define routes
app.get('/comments', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.send(comments);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/comments', [
    check('name').isLength({ min: 1 }),
    check('message').isLength({ min: 1 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array() });
    } else {
        const comment = new Comment({
            name: req.body.name,
            message: req.body.message
        });
        try {
            await comment.save();
            res.send(comment);
        } catch (error) {
            res.status(500).send(error);
        }
    }
});

app.delete('/comments/:id', async (req, res) => {
    try {
        await Comment.deleteOne({ _id: req.params.id });
        res.status(200).send();
    } catch (error) {
        res.status(404).send(error);
    }
});

// Start web server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
