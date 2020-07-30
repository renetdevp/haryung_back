const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findOne({ id });

            done(null, user);
        } catch (err) {
            done(err, false);
        }
    });

    passport.use(new LocalStrategy({
            usernameField: 'id',
            passwordField: 'pw',
        },
        async (username, password, done) => {
            try {
                const user = await User.findOne({ id: username });

                if (!user) return done(null, false, { msg: 'User not found :(' });

                const result = await bcrypt.compare(password, user.pw);

                if (!result) return done(null, false, { msg: 'Wrong pw :(' });

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    ));
};
