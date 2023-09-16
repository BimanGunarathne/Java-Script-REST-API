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
                let cake = JSON.parse(data).find(p => p.id == id);
                resolve(cake);
            }
        })
    }
};

module.exports = cakeRepo;