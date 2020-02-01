# Google-and-Facebook-Login---MERN-Stack
Passport JS is for using Login with Google and Facebook. For the backend Node JS (Express JS) is used and in front end for visual React JS and Redux is used. For the database Mongo DB Atlas is used. Axios is used for fetching data from React JS to Node JS.

## Production
https://google-fb-oauth-mern.herokuapp.com/

## Installation
1. Clone the Project 
2. Run npm install on root - Node Dependencies
3. Run npm install on /client - React JS Dependencies
4. Create your account in Mongo DB Atlas
5. In config/keys.js - paste your mongo db atlas url

## Snippets
1. Passport Js(services/passport.js)
```
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");
const User = mongoose.model("users"); // getting Schema

/* =================== Handeling Infinite run: Start ===================  */
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// For Google
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      // profile has all google login data
      /* ========= DATABASE CHECK PRE EXIST AND INSERT QUERY: START =========  */

      // check if user id already inserted
      User.findOne({ userId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          // new user case
          // insert new user id
          new User({
            userId: profile.id,
            username: profile.displayName,
            picture: profile._json.picture
          })
            .save()
            .then(user => {
              done(null, user);
            });
        }
      });
      /* ========= DATABASE CHECK PRE EXIST AND INSERT QUERY: END =========  */
    }
  )
);

// For facebook
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.FACEBOOK_APP_ID,
      clientSecret: keys.FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      /* ========= DATABASE CHECK PRE EXIST AND INSERT QUERY: START =========  */
      // check if user id already inserted
      User.findOne({ userId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          // new user case
          // insert new user id
          new User({
            userId: profile.id,
            username: profile.displayName,
            picture: profile._json.picture
          })
            .save()
            .then(user => {
              done(null, user);
            });
        }
      });
      /* ========= DATABASE CHECK PRE EXIST AND INSERT QUERY: END =========  */
    }
  )
);


```



## Screenshot
<img src='https://user-images.githubusercontent.com/15896579/73590314-17868180-4507-11ea-9fd6-88f5cdd6f619.png' alt="Project image"/>
<img src='https://user-images.githubusercontent.com/15896579/73590315-23724380-4507-11ea-9388-344f47d1738f.png' alt="Google Signin"/>
<img src='https://user-images.githubusercontent.com/15896579/73590321-308f3280-4507-11ea-9535-0d239204cde4.png' alt="FB Signin"/>
<img src='https://user-images.githubusercontent.com/15896579/73590324-3422b980-4507-11ea-95ec-5bdadf6e7452.png' alt="Redux Implementation"/>
<img src='https://user-images.githubusercontent.com/15896579/73590314-17868180-4507-11ea-9fd6-88f5cdd6f619.png' alt="Project image"/>
<img src='https://user-images.githubusercontent.com/15896579/73590418-215cb480-4508-11ea-9a5c-10cb7e8496d5.png' alt="Getting Data"/>
<img src='https://user-images.githubusercontent.com/15896579/73590337-456bc600-4507-11ea-873b-0d6867739cf6.png' alt="Mongo DB Atlas"/>


##  Project Video (Explaination)
Overall(Browser + Code explaination) - https://www.loom.com/share/1661fda5295e4325b12621b3185bbac6
Get client id and secret key from Facebook for Developers - https://www.loom.com/share/80a8ca2b0d6b4290a51b308412c7022f 
Get client id and secret key from Google for Developers - https://www.loom.com/share/f6741234dcb64b079c9346bc3485de16
Get SRV key from Mongo DB Atlas - https://www.loom.com/share/57d80d7684894d84b590fc75c1a75e29 
