module.exports = function authenticated(req, res, next) {
  var token;

  if(req.isSocket && req.body.token){
    token = req.body.token || false;

  }
  else
  {
    token = req.headers.authorization || false;
  }

  if(!token) {
    return res.json(401, {user: 'invalid token'});
  }
  User.findOne({token: token}, function (err, user) {
    if(err || !user) return res.json(401, {err: 'user should be authenticated'});
    req.user = user;
    req.token = token;
    next();
  });
};
