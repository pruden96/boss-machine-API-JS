const express = require('express');
const { getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');
const { getRequestAll, validateID, validateObjectKeys } = require('./api');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const ideasRouter = express.Router({mergeParams: true});

const ideaObjectKeys = ['name', 'description', 'numWeeks', 'weeklyRevenue'];

ideasRouter.param('ideaId', validateID);

ideasRouter.get('/', getRequestAll);

ideasRouter.get('/:ideaId', (req, res, next) => {
    const idea = getFromDatabaseById('ideas', req.elementId);
    res.status(200).send(idea);
});

ideasRouter.post('/', (req, res, next) => {
    const ideaObject = req.body;
    if(validateObjectKeys(ideaObject, ideaObjectKeys)) {
        next();
    } else {
        res.status(400).send('Failed to create an Idea. Check idea\'s attributes');
    }
}, checkMillionDollarIdea, (req, res) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

ideasRouter.put('/:ideaId', (req, res, next) => {
    const ideaObject = req.body;
    if (validateObjectKeys(ideaObject, ideaObjectKeys)) {
        next();
    } else {
        res.status(400).send('Failed to update idea. Check idea\'s attributes');
    }
}, checkMillionDollarIdea, (req, res) => {
    const ideaObject = req.body;
    ideaObject.id = req.elementId;
    const updatedIdea = updateInstanceInDatabase('ideas', ideaObject);
    if(updatedIdea) {
        res.send(updatedIdea);
    } else {
        res.status(400).send('Failed to update idea. Check idea\'s attributes\'s values (str, number, etc)');
    }
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.elementId);
    if(deleted) {
        res.status(204).send();
    }
});

module.exports = ideasRouter;