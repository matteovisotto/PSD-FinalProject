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
    var examples = {};
    examples['application/json'] = {
  "id" : 18493934,
  "name" : "Diabetes",
  "description" : "",
  "forbidden_food" : [ {
    "id" : 10,
    "name" : "Sugar"
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

