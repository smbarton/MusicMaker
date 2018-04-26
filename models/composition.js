var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompositionSchema = new Schema({
	title: String,
    user: String,
    bpm: Number,
    notes: [[Number]]
});

module.exports = mongoose.model('Composition', CompositionSchema);