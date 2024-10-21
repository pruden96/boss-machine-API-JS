const express = require('express');
const { addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId, getAllFromDatabase } = require('./db');
const { getRequestAll, validateID, validateObjectKeys } = require('./api');
const workRouter = express.Router({mergeParams: true});

const workObjectKeys = ['title', 'description', 'hours', 'minionId'];

workRouter.param(['minionId', 'workId'], validateID);

workRouter.get('/', (req, res, next) => {
    const minionId = req.params.minionId;
    const allWorks = getAllFromDatabase('work');
    if (allWorks) {
        const minionWorks = allWorks.filter(work => work.minionId === minionId);
        if (minionWorks) {
            res.status(200).send(minionWorks);
        } else {
            res.status(404).send('No works found!');
        }
    } else {
        res.status(404).send('No works found!');
    }
});

workRouter.post('/', (req, res, next) => {
    const minionId = req.params.minionId;
    const workObject = req.body;
    workObject.minionId = minionId;
    if (validateObjectKeys(workObject, workObjectKeys)) {
        const newWork = addToDatabase('work', workObject);
        res.status(201).send(newWork);
    } else {
        res.status(400).send('Failed to create a work. Check work\'s attributes');
    }
});

workRouter.put('/:workId', (req, res, next) => {
    const workObject = req.body;
    workObject.id = req.elementId;
    workObject.minionId = req.params.minionId;
    const updatedWork = updateInstanceInDatabase('work', workObject);
    if (updatedWork) {
        res.send(updatedWork);
    } else {
        res.status(400).send('Failed to update work. Check work\'s attributes');
    }
});