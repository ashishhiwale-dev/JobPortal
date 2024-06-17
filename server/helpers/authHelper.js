const bcyrpt = require('bcrypt');

// Hash function
exports.hashPassword = (password) => {
    return new Promise((resolve,reject) =>{
        bcyrpt.genSalt(10, (err,salt) => {
            if(err){
                reject(err);
            }
            bcyrpt.hash(password,salt, (err,hash) => {
                if(err){
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
};


// Compare // DeCrpt Passwords

exports.comparePassword = (password, hashed) => {
    return bcyrpt.compare(password, hashed);
};