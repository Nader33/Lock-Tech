/**
 * LockController
 *
 * @description :: Server-side logic for managing locks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index: function (req, res) {

    Lock.findAll(function(err, users){
      if (err) return res.send(err, 500);

      //res.view({
      //  model: locks
      //});
    });
  },

  create: function (req, res) {
    var user = req.user || false;

    var params = _.extend(req.query || {}, req.params || {}, req.body || {}, {users: user.id});

    Lock.create(params).exec(function (err, newLock) {

      Lock.findOne({id: newLock.id}).populate('users').exec(function(err, lock){

        if(err) return res.json(403, {err: 'forbidden'});
        if(!lock) return res.json(401, {err: 'Lock could not be created'});

        return res.json({
            lock: lock
          });

      });
    });
  },


  show: function (req,res) {

    var id = req.param('id');

    if (!id) return res.send("No id specified.", 500);


    Lock.find(id, function (err, lock) {
      if(err) return res.sender(err,500);
      if(!lock) return res.send("Lock "+id+" not found", 404);

       return res.json({
        lock:lock
      });
    });
  },

  destroy: function (req,res) {
    var id = req.param('id');
    if (!id) return res.send("No id specified.",500);


    Lock.find(id, function (err, lock) {
      if (err) return res.sender(err, 500);
      if (!lock) return res.send("Lock " + id + " not found", 404);


      Lock.destroy(id, function (err) {
        if (err) return res.send(err, 500);


        return res.json({
          lock: 'Lock destroyed'
        });
      });
    });
  },

   update: function (req,res) {

     var id = req.param('id');

     if (!id) return res.send("No id specified.", 500);

     var params = _.extend(req.query || {}, req.params || {}, req.body || {});
     delete params.id;

     Lock.find(id, function (err, lock) {
       if (err) return res.sender(err, 500);
       if (!lock) return res.send("Lock " + id + " not found", 404);


       Lock.update(id,params).exec(function (err, lock) {

         if (err) return res.send(err, 500);


         return res.json({
           lock: lock
         });
       });
     });
   }
};

