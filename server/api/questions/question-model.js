'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  question: {type: String, required: true},
  answer: {type: String, required: true},
  subject: {type: String, required: true},
});

//Mongoose model is a class which we construct documents
//In the below model each document will be a question with properties declared in Schema
module.exports = mongoose.model('questions', QuestionSchema);
