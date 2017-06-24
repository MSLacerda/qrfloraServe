var mongoose = require("mongoose");

var TreeSchema = new mongoose.Schema({
    nome_pop: {
        type: String,
        unique: false,
        required: true
    },
    nome_cie: {
        type: String,
        unique: false,
        required: true
    },
    familia: {
        type: String,
        unique: false,
        required: false
    },
    categoria: {
        type: String,
        unique: false,
        required: false
    },
    origem: {
        type: String,
        unique: false,
        required: false
    },
    clima: {
        type: String,
        unique: false,
        required: false
    },
    luminosidade: {
        type: String,
        unique: false,
        required: false
    },
    altura: {
        type: String,
        unique: false,
        required: false
    },
    info: {
        type: String,
        unique: false,
        required: false
    },
    loc: [{
        lat: String,
        lng: String
    }]
});



module.exports = function(app) {
    return mongoose.model('Tree', TreeSchema);
}