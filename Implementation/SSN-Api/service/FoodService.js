'use strict';


/**
 * Get information about a food
 * This API allows to get the information about a food
 *
 * id Integer Food SSN identifier
 * returns Food
 **/
exports.getFood = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "id" : 10,
  "name" : "Sugar"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get information about a food
 * This API allows to get relevant information about a food and related diseases
 *
 * id Integer Food SSN identifier
 * returns FoodRelatedDiseases
 **/
exports.getFoodDiseases = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "id" : 10,
  "name" : "Sugar",
  "diseases" : [ {
    "id" : 18493934,
    "name" : "Diabetes",
    "description" : ""
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

