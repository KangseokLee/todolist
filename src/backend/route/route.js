const router = require('express').Router();
const todolist = require('../controller/controller.js');

// Create document
router.post('/api/todolist', todolist.create);
// Retrieve all documents
router.get('/api/todolist', todolist.findAll);
// Retrieve single document by id
router.get('/api/todolist/:id', todolist.findOne);
// Update document by id
router.put('/api/todolist/:id', todolist.update);
// Delete document by id
router.delete('/api/todolist/:id', todolist.delete);

module.exports = router;