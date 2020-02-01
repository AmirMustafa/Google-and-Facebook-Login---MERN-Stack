const express = require("express");
const app = express();
const mongoose = require("mongoose");
const keys = require("./config/keys");
let cookieSession = require("cookie-session");
const passport = require("passport");
const port = process.env.PORT || 5000;

require("./models/User"); // Note model must be imported before passport
require("./services/passport");

// connect with mongo db
mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connnected to mongo DB");
  }
);

/* ================ Creating Cookie Key and link with Passport JS: Start ================  */
app.use(
  cookieSession({
    maxAge: 30 * 86400 * 1000, // expire in 30 days(milli seconds)
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());
/* ================ Creating Cookie Key and link with Passport JS: End ================  */

require("./routes/authRoute")(app);

app.listen(port, () => {
  console.log(`Node server started in port ${port}`);
});
