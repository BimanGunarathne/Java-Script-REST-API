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
    },
    insert: function(newData, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            } else {
                let cakes = JSON.parse(data);
                cakes.push(newData);
                fs.writeFile(FILE_NAME, JSON.stringify(cakes), function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(newData);
                    }
                });
            }
        });
    },
    update: function(newData, id, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            } else {
                let cakes = JSON.parse(data);
                let cake = cakes.find(c => c.id == id);
                if (cake) {
                    Object.assign(cake, newData);
                    fs.writeFile(FILE_NAME, JSON.stringify(cakes), function(err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(newData)
                        }
                    })
                }
            }
        })
    },
    delete: function(id, resolve, reject) {
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            } else {
                let cakes = JSON.parse(data);
                let index = cakes.findIndex(c => c.id == id);
                if (index != -1) {
                    cakes.splice(index, 1);
                    fs.writeFile(FILE_NAME, JSON.stringify(cakes), function(err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(index);
                        }
                    })
                }
            }
        })
    }
};

module.exports = cakeRepo;