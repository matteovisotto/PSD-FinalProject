'use strict';

var utils = require('../utils/writer.js');
var Food = require('../service/FoodService');

module.exports.getFood = function getFood (req, res, next, id) {
  Food.getFood(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getFoodDiseases = function getFoodDiseases (req, res, next, id) {
  Food.getFoodDiseases(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
