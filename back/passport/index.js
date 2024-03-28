const passport = require("passport");
const local = require("./local.js");
const { User } = require("../models/index.js");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      user(null, user);
      
    } catch (error) {
      console.error(error);
      done(error);
    }
  });
  local();
};
