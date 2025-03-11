import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

passport.use(
  new LocalStrategy(
    // function ({usernameField: "email"}, email, password, done) {
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) return done(null, false, { message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) return done(null, user);
        else return done(null, false, { message: "Incorrect password" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Login ---> "serializeUser" in the Session
passport.serializeUser(async (user, done) => {
  console.log("We are inside serializeUser");
  done(null, user._id);
});

// Logout ---> "deserializeUser" from the Session
passport.deserializeUser(async (_id, done) => {
  try {
    console.log("We are inside deserializeUser");
    const user = await User.findById(_id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
