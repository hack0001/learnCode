/**
 * GET     /fruits              ->  index
 * POST    /fruits              ->  create
 * GET     /fruits/:id          ->  show
 * PUT     /fruits/:id          ->  update
 * DELETE  /fruits/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Question = require('./question-model');

// Get list of questions
exports.index = function (req, res) {
  //Here is the database operation
  Question.find(function (err, questions) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(questions);
  });
};

// Get a single fruit by id
exports.show = function (req, res) {
  Question.findById(req.params.id, function (err, questions) {
    if (err) { return handleError(res, err); }
    if (!questions) { return res.sendStatus(404); }
    return res.json(questions);
  });
};

// Creates a new fruit
exports.create = function (req, res) {
  Question.create(req.body, function(err, questions) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(questions);
  });
};

// Updates an existing fruit
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Question.findById(req.params.id, function (err, questions) {
    if (err) { return handleError(res, err); }
    if (!questions) { return res.sendStatus(404); }
    var updated = _.merge(questions, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(questions);
    });
  });
};

// Deletes a fruit
exports.destroy = function (req, res) {
  Question.findById(req.params.id, function (err, questions) {
    if (err) { return handleError(res, err); }
    if (!questions) { return res.sendStatus(404); }
    questions.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.sendStatus(204);
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
