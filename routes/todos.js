var express = require('express');
var router = express.Router();

var { v1 } = require('uuid')

const todos = [{ id: 123, name: 'adsf', done: false }]

router.get('/', function (req, res, next) {
    res.json(todos)
});

router.get('/:id', (req, res, next) => {
    const todo = todos.find(todo => todo.id === Number(req.params.id))
    if (!todo) {
        res.status(404);
    }
    res.json(todo)
})

router.post('/', (req, res, next) => {
    const todo = { id:v1(),name: req.body.name,done:false }
    todos.push(req.body);
    res.status(201)
    res.json(todo)
})

module.exports = router;