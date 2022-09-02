'use strict';


/**
 * Get the list of diseases of a patient
 * This API allows to get all the diseases a patient is affected with
 *
 * id Integer Patient SSN identifier
 * returns PatientDiseases
 **/
exports.getPatientDiseases = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "id" : 18493934,
  "name" : "Diabetes",
  "description" : ""
}, {
  "id" : 18493934,
  "name" : "Diabetes",
  "description" : ""
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Verify patient identity
 * This API allows to submit a request in order to verify the correctness of a patient information and get his own unique identifier
 *
 * body VerifyPatientRequest Information about the patient and the structure he is in.
 * returns Patient
 **/
exports.verifyPatient = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "id" : 18493934,
  "name" : "Mario",
  "surname" : "Rossi",
  "birth_date" : "13/05/1965"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

