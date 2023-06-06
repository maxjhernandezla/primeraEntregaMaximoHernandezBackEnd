import passport from "passport";
import local from "passport-local";
import userModel from "../dao/models/users.model.js";
import { createHash, isValidPassword } from "../utils.js";
import GitHubStrategy from 'passport-github2'

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          const user = await userModel.findOne({ email: username });

          if (user) {
            done(null, false);
          }

          const userToSave = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
          };
          const result = await userModel.create(userToSave);
          done(null, result);
        } catch (error) {
          return done(`Error al obtener el usuario: ${error}`);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });

          if (!user) {
            done(null, false);
          }

          if (!isValidPassword(user, password)) {
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          return done(`Credenciales incorrectas: ${error}`);
        }
      }
    )
  );

  passport.use('github', new GitHubStrategy({
    clientID: "Iv1.9318e99f614e373a",
    clientSecret: "4c4241e9a73318b05d373121738276903d26a850",
    callbackURL: "http://localhost:8080/api/sessions/github-callback",
    scope: ['user:email']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails[0].value;
        const user = await userModel.findOne({ email })
        if (!user) {
            const newUser = {
                first_name: profile._json.name,
                last_name: '',
                age: 18,
                email,
                password: '' 
            }
            const result = await userModel.create(newUser);
            done(null, result);
        } else {
            done(null, user);
        }
    } catch (error) {
        return done(error);
    }
}));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    done(null, user);
  });
};

export default initializePassport;
