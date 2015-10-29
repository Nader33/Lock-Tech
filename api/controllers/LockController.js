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

      res.view({
        model: locks
      });
    });
  }

  /*
   'new': function(req,res) {
   res.view();
   },


   create: function(req,res) {
   var params = _.extend(req.query || {}, req.params || {}, req.body || {});

   User.create(params, function userCreated (err, createdUser) {

   if (err) return res.send(err,500);

   res.redirect('/user/show/'+ createdUser.id);
   });
   },

   show: function (req,res) {

   var id = req.param('id');

   if (!id) return res.send("No id specified.", 500);


   User.find(id, function userFound(err, user) {
   if(err) return res.sender(err,500);
   if(!user) return res.send("User "+id+" not found", 404);

   res.view({
   user:user
   })
   });
   },

   edit: function (req,res) {
   var id = req.param('id');

   if (!id) return res.send("No id specified.",500);

   User.find(id, function userFound (err,user){
   if (err) return res.send(err,500);
   if (!user) return res.send("User "+id+" not found.",404);

   res.view({
   user: user
   })
   });
   },


   update: function (req,res) {

   var params = _.extend(req.query || {}, req.params || {}, req.body || {});
   var id = params.id;

   if (!id) return res.send("No id specified.",500);

   User.update(id, params, function userUpdated(err, updatedUser) {
   if (err) {
   res.redirect('/user/edit');
   }
   if(!updatedUser) {
   res.redirect('/user/edit');
   }
   res.redirect('/user/show/'+id);
   });
   },


   destroy: function (req,res) {
   var id = req.param('id');
   if (!id) return res.send("No id specified.",500);

   User.find(id, function foundUser(err, user) {
   if (err) return res.send(err,500);
   if (!user) return res.send("No user with that idid exists.",404);

   User.destroy(id, function userDestroyed(err) {
   if (err) return res.send(err,500);

   return res.redirect('/user');
   });

   })
   }*/

};

