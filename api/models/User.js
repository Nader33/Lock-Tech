/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcryptjs');
module.exports = {

  attributes: {
    username  : { type: 'string', required: true,unique: true },
    email     : { type: 'email', required: true, unique: true },
    password     : { type: 'string' },
    token     : { type: 'text' },
    refreshToken     : { type: 'text' },
    locks: { collection: 'Lock', via: 'users'},

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj.refreshToken;
      delete obj.createdAt;
      delete obj.updatedAt;
      delete obj.token;
    }

  },

  beforeCreate: function(value, next) {
    bcrypt.genSalt(10, function(err, salt){
      if(err) return next(err);
      bcrypt.hash(value.password, salt, function(err, hash){
        if(err) return next(err);
        value.password = hash;
        value.refreshToken = JwtHandler.generate({email: value.email});
        next();
      })
    })
  },
  comparePassword: function(password, user, cb){
    bcrypt.compare(password, user.password, function(err, match){
      if(err) cb(err);
      if(match){
        cb(null, true);
      }else{
        cb(err);
      }
    })
  }
};

