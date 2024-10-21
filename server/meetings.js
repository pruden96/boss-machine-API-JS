const express = require('express');
const { deleteAllFromDatabase, createMeeting, addToDatabase } = require('./db');
const { getRequestAll } = require('./api');
const meetingsRouter = express.Router({mergeParams: true});


meetingsRouter.get('/', getRequestAll);

meetingsRouter.post('/', (req, res, next) => {
    let newMeeting = createMeeting();
    newMeeting = addToDatabase('meetings', newMeeting);
    res.status(201).send(newMeeting);
});

meetingsRouter.delete('/', (req, res, next) => {
    const deleted = deleteAllFromDatabase('meetings');
    if(deleted) {
        res.status(204).send();
    } else {
        res.status(400).send();
    }
});

module.exports = meetingsRouter;