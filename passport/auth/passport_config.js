import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import passport from 'passport';

const isValidPassword = (user, password) =>
bcrypt.compareSync(password, user.password);

const createHash = (password) =>
bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

passport.use(
'login',
new Strategy({ passReqToCallback: true }, function (
  req,
  username,
  password,
  done
) {
  User.findOne({ username: username }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      console.error('User Not Found with username ' + username);
      return done(null, false, console.error('message', 'User Not found.'));
    }
    if (!isValidPassword(user, password)) {
      console.error('Invalid Password');
      return done(null, false, console.error('message', 'Invalid Password.'));
    }
    return done(null, user);
  });
})
);

passport.use(
'signup',
new Strategy({ passReqToCallback: true }, function (
  req,
  username,
  password,
  done
) {
  User.findOne({ username: username }, function (err, user) {
    // In case of any error return
    if (err) {
      console.error('Error in SignUp: ' + err);
      return done('Error al crear usuario.');
    }
    if (user) {
      console.error('User already exists');
      return done(
        'El usuario ya existe.',
        false,
        console.error('message', 'User Already Exists')
      );
    } else {
      const newUser = {
        username: username,
        password: createHash(password),
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      };

      User.create(newUser, function (err) {
        if (err) {
          console.error('Error in Saving user: ' + err);
          throw err;
        }
        console.error('User Registration succesful');
        return done(null, newUser);
      });
    }
  });
})
);

passport.serializeUser(function(user, done) {
done(null, user);
});

passport.deserializeUser(function(user, done) {
done(null, user);
});

export default passport;