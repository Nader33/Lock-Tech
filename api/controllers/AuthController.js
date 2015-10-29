/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	login: function (req, res) {
    var email = req.param('email');
    var password = req.param('password');

    if(!email || !password) return res.json(401, {err: 'email and password are required'});
    User.findOne({email: email}, function(err, user){
      if(err) return res.json(403, {err: 'forbidden'});
      if(!user) return res.json(401, {err: 'Invalid email or password'});
      User.comparePassword(password, user, function(err, valid){
        if(err)console.log(err);
        if(err) return res.json(403, {err: 'forbidden'});
        if(!valid) return res.json(401, {err: 'Invalid email or password'});
        token = JwtHandler.generate({email: user.email, id: user.id});
        user.token = token;
        user.save(function(err){
          if(err) return res.json(403, {err: 'forbidden'});
          return res.json({
            user: user,
            token: token
          });
        });
      })
    })
  },
  register: function (req, res) {
    var username = req.param('username');
    var email = req.param('email');
    var password = req.param('password');

    if(!username || !email || !password) return res.json(401, {err: 'Missing fields'});

    User.findOne({email: email}, function(err, user){
      if(err) return res.json(403, {err: 'forbidden'});
      if(user) return res.json(401, {err: 'user already used'});
      User.create({username: username, email: email, password: password}).exec(function (err, user){
        return res.json({
          user: user,
        });
      });
    });
  },
  refresh: function (req, res) {
    var user = req.user || false;

    if(user) {
      var decoded = JwtHandler.decode(user.refreshToken);
      if(decoded.email === user.email) {
        token = JwtHandler.generate({email: user.email, id: user.id});
      }
    }
  }
};

