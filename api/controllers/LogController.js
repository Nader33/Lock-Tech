/**
 * LogController
 *
 * @description :: Server-side logic for managing Logs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index: function (req, res) {

    Log.find({user: req.user.id}).populate('lock').populate('user').exec(function (err, logs) {
      if(err) return res.json(401, {err: 'Logs not retrieved:'+err});

      console.log('er', logs);
      return res.json(logs);
    });
  },

  create: function (req, res) {
    var user = req.user || false;

    var params = _.extend(req.query || {}, req.params || {}, req.body || {}, {user: user.id});

    Log.create(params).exec(function (err, newLog) {

      if(err) return res.json(401, {err: 'Log not created:'+err});


      Log.findOne({id: newLog.id}).populate('lock').exec(function(err, log){

        if(err) return res.json(403, {err: 'forbidden'});
        if(!log) return res.json(401, {err: 'Log could not be created'});

        console.log(log);
        return res.json({
          log: log
        });

      });
    });
  },

  destroy: function (req,res) {
    var id = req.param('id');
    if (!id) return res.send("No id specified.",500);


    Log.find(id, function (err, log) {
      if (err) return res.sender(err, 500);
      if (!log) return res.send("Log " + id + " not found", 404);


      Log.destroy(id, function (err) {
        if (err) return res.send(err, 500);


        return res.json({
          log: 'Log destroyed'
        });
      });
    });
  }
};


