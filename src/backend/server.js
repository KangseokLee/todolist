const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = { 
    origin: 'http://localhost:8080',
    credentials: true
};
const PORT = process.env.PORT || 3000;

// Set CORS option
app.use(cors(corsOptions));

// Parse requests of content-type: application/json 
app.use(express.json()); 

// Parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// RESTful API route for DB
app.use('/', require('./route/route.js'));

// DB Connection
const db = require('./model/index.js');

db.mongoose .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(() => {
    console.log('db.url', db.url);
    console.log('db.mongoose', db.mongoose);
    console.log('db.todolist.db', db.todolist.db);
    console.log('Database Connection Success.'); 
})
.catch(err => {
    console.log('Database Connection Failure.', err);
    process.exit();
});

// Default route for server status
app.get('/', (req, res) => { 
    res.json({ message: `Server is running on port ${PORT}` });
});

// Set listen port for request
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});