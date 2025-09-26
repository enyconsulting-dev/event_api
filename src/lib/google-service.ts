import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { config } from "../config/index";

const callBackUrl = `${config.env !== "dev" ? "https" : "http"}://${
  config.protocol.server_origin
}${config.google.client_uri}`;

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.client_id,
      clientSecret: config.google.client_secret,
      callbackURL: callBackUrl,
      passReqToCallback: true,
    },
    (
      request: any,
      accessToken: any,
      refreshToken: any,
      profile: any,
      done: (arg0: null, arg1: any) => any
    ) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user as Express.User);
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});

export default passport;
