/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Question = require('../api/questions/question-model');

// Question.find({}).remove(function() {
//   Question.create({
//   {question : 'Banana'},
//   {answer : 'Clementine'},
//   {subject : 'Kiwi'}},
//   {{answer : 'Melon'},
//   {question : 'Plum'},
//   {subject : 'Watermelon'}},
//   function () {
//     console.log('>> Finished populating answers');
//   });
//
// });
// console.log("Questions");
// console.log(Question);

// Question.find({});
// console.log(Question);
