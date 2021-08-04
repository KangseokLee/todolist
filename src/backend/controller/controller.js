const db = require('../model/index.js'); 
const Todolist = db.todolist;

// Create document 
exports.create = (req, res) => { 
    // Validate request 
    if (!req.body.content) { 
        res.status(400).send({ 
            message: 'content is empty!' 
        }); 
        return; 
    } 
    
    // Set document 
    const todolist = new Todolist({ 
        content: req.body.content,
        completed: req.body.completed ? req.body.completed : false
    }); 
    
    // Save document 
    todolist
    .save(todolist)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Create document failure.'
        });
    });
};
    
// Retrieve all documents
exports.findAll = (req, res) => {
    const content = req.query.content;
    const condition = content ? { content: { $regex: new RegExp(title), $options: 'i' } } : {};
    
    // Retrieve all documents        
    Todolist.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Retrieve document failure.'
        });
    });
};
        
// Retrieve single document
exports.findOne = (req, res) => {
    const id = req.params.id;
    
    // Retrieve single document by id
    Todolist.findById(id)
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: 'Cannot find document. (id: ' + id + ')'
            });
        } else {
            res.send(data);
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Retrieve single document failure. (id: ' + id + ')'
        });
    });
};
        
// Update document by id
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Data is empty!'
        });
    }
    
    // Set id
    const id = req.params.id;
    // Update document by id
    Todolist.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: 'Cannot update document. (id: ' + id + ')'
            });
        } else {
            res.send({ message: 'Document updated.' });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Update document failure. (id: ' + id + ')'
        });
    });
};
            
// Delete document by id
exports.delete = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Data is empty!'
        });
    }
    
    // Set id
    const id = req.params.id;
    // Delete document by id
    Todolist.findByIdAndRemove(id)
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: 'Cannot delete document. (id: ' + id + ')'
            });
        } else {
            res.send({
                message: 'Document deleted.'
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Delete document failure. (id: ' + id + ')'
        });
    });
};