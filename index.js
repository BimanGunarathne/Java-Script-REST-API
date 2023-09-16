// Bring in the express server and create application
let express = require('express');
let app = express();
let cakeRepo = require("./repos/cakeRepo");

// Use the express Router object
let router = express.Router();


// Create GET to return a list of all cakes
router.get('/', function(req, res, next) {
    cakeRepo.get(function(data) {
        res.status(200).json({
            status: 200,
            statusText: "OK",
            message: "All cakes retrieved.",
            data: data
        });
    }, function(err) {
        next(err);
    })
});

// Create GET/search>id=n&name=str= to search for cakes by 'id' and/or 'name
router.get('/search', function(req, res, next) {
    let searchObject = {
        id: req.query.id,
        name: req.query.name
    };
    cakeRepo.search(searchObject, function(data) {
        res.status(200).json({
            status: 200,
            statusText: "OK",
            message: "All cakes retrieved.",
            data: data
        });
    }, function(err) {
        next(err);
    });
});

// Create GET/id to return a single cakes
router.get('/:id', function(req, res, next) {
    cakeRepo.getById(req.params.id, function(data) {
        if (data) {
            res.status(200).json({
                status: 200,
                statusText: "OK",
                message: "Single cakes retrieved.",
                data: data
            })
        } else {
            res.status(404).json({
                status: 404,
                statusText: "Not Found",
                message: "The cake '" + req.params.id + "' could not be found",
                error: {
                    code: "NOT_FOUND",
                    message: "The cake '" + req.params.id + "' could not be found."
                }
            });
        }
    }, function(err) {
        next(err);
    })
})

// Configure router so all routes are prefixed with /api/v1
app.use('/api/', router);

// Create server to listen on port 5000
var server = app.listen(5000, function() {
    console.log('Node server is running on http://localhost:5000..');
});