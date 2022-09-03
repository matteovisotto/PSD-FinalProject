'use strict';


/**
 * Get information about a disease
 * This API allows to get relevant information about a disease
 *
 * id Integer Disease SSN identifier
 * returns DiseaseInfo
 **/
exports.getDisease = function(id) {
  return new Promise(function(resolve, reject) {
    var resp = {};
    if(id === 18493934){
      resp = {
        "id" : 18493934,
        "name" : "Diabetes",
        "description" : "",
        "forbidden_food" : [ {
          "id" : 10,
          "name" : "Sugar"
        }, {
          "id" : 11,
          "name" : "Brown Sugar"
        } ]
      };
    } else if (id === 18493935){
      resp = {
        "id" : 18493934,
        "name" : "Allergy",
        "description" : "",
        "forbidden_food" : [ {
          "id" : 12,
          "name" : "Apple"
        }, {
          "id" : 13,
          "name" : "Carrots"
        }, {
          "id" : 14,
          "name" : "Pineapple"
        } ]
      };
    }
    resolve(resp);
  });
}

