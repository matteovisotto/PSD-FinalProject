'use strict';

var utils = require('../utils/writer.js');
var Patient = require('../service/PatientService');

module.exports.getPatientDiseases = function getPatientDiseases (req, res, next, id) {
  Patient.getPatientDiseases(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.verifyPatient = function verifyPatient (req, res, next, body) {
  Patient.verifyPatient(body)
    .then(function (response) {
        utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
