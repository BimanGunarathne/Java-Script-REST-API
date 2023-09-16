// Bring in the express server and create application
let express = require('express');
let app = express();

// Use the express Router object
let router = express.Router();
let cakes = [
    { "id": 1, "name": "Coffe" },
    { "id": 2, "name": "Ribon" },
    { "id": 3, "name": "Butter" }
]

// Create GET to return a list of all cakes
router.get('/', function(req, res, next) {
    res.status(200).json({
        status: 200,
        statusText: "OK",
        message: "All cakes retrieved.",
        data: cakes
    });
});

// Configure router so all routes are prefixed with /api/v1
app.use('/api/', router);

// Create server to listen on port 5000
var server = app.listen(5000, function() {
    console.log('Node server is running on http://localhost:5000..');
});