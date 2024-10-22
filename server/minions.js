const express = require('express');
const { addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');
const { getRequestAll, validateID, validateObjectKeys } = require('./api');
const minionsRouter = express.Router({mergeParams: true});

const minonObjectKeys = ['name', 'title', 'salary', 'weaknesses'];

minionsRouter.param('minionId', validateID);

minionsRouter.get('/', getRequestAll);

minionsRouter.post('/', (req, res, next) => {
    const minionObject = req.body;
    if(validateObjectKeys(minionObject, minonObjectKeys)) {
        const newMinion = addToDatabase('minions', minionObject);
        res.status(201).send(newMinion);
    } else {
        res.status(400).send('Failed to create a minion. Check minion\'s attributes');
    }
});

minionsRouter.get('/:minionId', (req, res, next) => {
    //console.log(req.params.minionId);
    const ResponseMinion = getFromDatabaseById('minions', req.params.minionId);
    res.status(200).send(ResponseMinion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
    const minionObject = req.body;
    minionObject.id = req.params.minionId;
    const updatedMinion = updateInstanceInDatabase('minions', minionObject);
    if (updatedMinion) {
        res.send(updatedMinion);
    } else {
        res.status(400).send('Failed to update minion. Check minion\'s attributes');
    }
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('minions', req.params.minionId);
    if (deleted) {
        res.status(204).send();
    }
});

module.exports = minionsRouter;