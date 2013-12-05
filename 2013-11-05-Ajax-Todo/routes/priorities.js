var mongoose = require('mongoose');
var Priority = mongoose.model('Priority');


/*
 * POST /priorities
 */

exports.create = function(req, res){
  new Priority(req.body).save(function(err, priority, count){
    res.send(priority); //send only single priority back
  });

  //console.log(req.body); //will see this in the terminal since on server side (not public)
  // res.send({color: 'red', name: 'high'}); //response data node sends back to browser

};
