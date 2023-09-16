let fs = require('fs');
const FILE_NAME = "./assets/cakes.json";

let cakeRepo = {
    get: function(resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    },
    getById: function(id, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            } else {
                let cake = JSON.parse(data).find(c => c.id == id);
                resolve(cake);
            }
        });
    },
    search: function(searchObject, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            } else {
                let cakes = JSON.parse(data);
                // Perform search
                if (searchObject) {
                    // let searchObject = {
                    //     id: 1,
                    //     name: "C"
                    // };
                    cakes = cakes.filter(
                        c => (searchObject.id ? c.id == searchObject.id : true) && (searchObject.name ? c.name.toLowerCase().indexOf(searchObject.name.toLowerCase()) >= 0 : true));
                }
                resolve(cakes);
            }
        })
    }
};

module.exports = cakeRepo;