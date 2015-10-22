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
          required : true  
      },
      
      name:{
          type:"string",
          required: true,
          minLength: 3 
      },
      
      userlist:{
        collection: 'user',
        via: 'users'
      }
      
  }
};

