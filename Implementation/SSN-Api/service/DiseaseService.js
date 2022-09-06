'use strict';
 const fs = require('fs');

/**
 * Get information about a disease
 * This API allows to get relevant information about a disease
 *
 * id Integer Disease SSN identifier
 * returns DiseaseInfo
 **/
exports.getDisease = function(id) {
  return new Promise(function(resolve, reject) {
    let data = fs.readFileSync('Disease.json');
    let all_data = JSON.parse(data);
    var resp = {};
    all_data.forEach(d => {
      if(d.id === id){
        resp = d;
      }
    });
    resolve(resp);
  });
}

