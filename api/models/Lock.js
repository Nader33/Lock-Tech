/**
* Lock.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    state:{
      type : "boolean",
      default: true
    },

    name:{
      type:"string",
      required: true,
      minLength: 3
    },

    users:{
      collection: 'User',
      via: 'locks'
    },
    logs: { collection: 'Log', via: 'lock'},

    toJSON: function() {
      var obj = this.toObject();

      return obj;
    }

  }
};

