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
    var resp = [ {
  "id" : 18493934,
  "name" : "Diabetes",
  "description" : ""
}, {
  "id" : 18493935,
  "name" : "Allergy",
  "description" : ""
} ];
    resolve(resp);
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
    var cf = body.fiscal_code;
    var hid = body.structure_id;
    if (cf === 'VSTMTT98E13F770H') {
        var obj = {
            "id": 18493934,
            "name": "Matteo",
            "surname": "Visotto",
            "birth_date": "13/05/1998"
        };
        resolve(obj);
    } else {
        reject({});
    }

  });
}

