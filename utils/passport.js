const passport = require('passport');

const User = require('../models/user');

passport.use(new localStorage(
    async function (username, password, done) {
        try {
            const user = await User.findOne({ id: username });

            if (!user) return done(null, false);
            done(null, user);
        } catch (err) {
            return done(err);
        }
    }
))
