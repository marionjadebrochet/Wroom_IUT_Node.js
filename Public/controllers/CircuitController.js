let model = require('../models/circuit.js');

// ////////////////////// D E T A I l     C I R C U I T S ////////////////////

module.exports.DescCircuit = 	function(request, response){
  response.title = " Circuits du grand prix";
  let data = request.params.num;

  async.parallel ([
    function (callback) {
      model.getListeCircuit( function (err, result) {
        callback(null, result) });
    }, // result[0] : liste circuit
    function(callback) {
      model.getDetCircuit(data, function (err, result) {
        callback(null, result) });
    }, // result[1] : details circuit
  ],
    function (err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }

      response.listeCircuit = result[0];
      response.detailsCircuits = result[1][0];
      response.render('detailsCircuit', response);
    }
  ); //fin async
};
