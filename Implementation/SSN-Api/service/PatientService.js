'use strict';

const fs = require('fs');

/**
 * Get the list of diseases of a patient
 * This API allows to get all the diseases a patient is affected with
 *
 * id Integer Patient SSN identifier
 * returns PatientDiseases
 **/
exports.getPatientDiseases = function(id) {
  return new Promise(function(resolve, reject) {
      let data = fs.readFileSync('patient_diseases.json');
      let all_data = JSON.parse(data);
      var resp = [];
      all_data.forEach(d => {
          if(d.patient_id === id){
              resp = d.diseases;
          }
      });
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
    var resp = {};
    let data = fs.readFileSync('patients.json');
    let all_data = JSON.parse(data);
    all_data.forEach(d => {
       if(d.fiscal_code === cf){
           resp = d.data;
       }
    });
    resolve(resp);
  });
}

