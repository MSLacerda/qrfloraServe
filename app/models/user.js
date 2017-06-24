var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
    img: String,
    ativo: false,
    admin: Boolean,
});

module.exports = function(app) {

    return mongoose.model('User', UserSchema);

}