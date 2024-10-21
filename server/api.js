const express = require('express');
const { getAllFromDatabase, getFromDatabaseById } = require('./db');
const apiRouter = express.Router();


function getRequestAll (req, res, next) {
    const modelName = req.baseUrl.substring(req.baseUrl.lastIndexOf('/')+1);
    const response = getAllFromDatabase(modelName);
    if (response) {
        res.status(200).send(response);
    } else {
        res.status(400).send('Something went wrong');
    }
}

function validateID (req, res, next, id, name) {
    const elementId = id;
    const modelName = (name === 'workId') ? 'work' : name.slice(0, -2) + 's';
    const element = getFromDatabaseById(modelName, elementId);
    if (element) {
        req.elementId = elementId;
        next();
    } else {
        res.status(404).send();
    }
}

/**
 * Valida si todas las keys requeridas están presentes en el objeto dado.
 *
 * @param {Array<string>} keys - Lista de keys requeridas.
 * @param {Object} object - El objeto que será validado.
 * @returns {boolean} - Retorna true si todas las keys están presentes, de lo contrario false.
 */
function validateObjectKeys(object, keys) {
    return keys.every(key => key in object);
}

module.exports = { apiRouter, getRequestAll, validateID, validateObjectKeys };
