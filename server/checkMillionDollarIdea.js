const checkMillionDollarIdea = (req, res, next) => {
    const object = req.body;
     if(Number(object.numWeeks) * Number(object.weeklyRevenue) >= 1000000) {
        next();
    } else {
        res.status(400).send('Failed. Idea isn\'t worth 1MM');
    }
}

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
