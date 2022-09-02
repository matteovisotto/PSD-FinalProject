'use strict';

var utils = require('../utils/writer.js');
var Disease = require('../service/DiseaseService');

module.exports.getDisease = function getDisease (req, res, next, id) {
  Disease.getDisease(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
