const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const config = require('./configs');
const passport = require('passport');

passport.use(
  new JWTstrategy(
    {
      secretOrKey: config.securityToken,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async (payload, done) => {
      try {
        return done(null, payload); 
      } catch (error) {
        console.log(error)
        done(error);
      }
    }
  )
);