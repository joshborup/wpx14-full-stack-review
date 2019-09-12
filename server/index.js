require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const {
  registerBurrito,
  loginBurrito,
  noBurrito,
  getBurritoSession
} = require("./controller/authController.js");
const app = express();
const { SESSION_SECRET, CONNECTION_STRING } = process.env;
app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14
    }
  })
);

massive(CONNECTION_STRING).then(db => {
  console.log("db connected");
  app.set("db", db);
});

app.post("/api/register_burrito", registerBurrito);
app.post("/api/spicy_burrito_purchase", loginBurrito);
app.post("/api/burrito_eaten", noBurrito);
app.get("/api/burrito_data", getBurritoSession);

const port = 4000;
app.listen(port, () => console.log(`listening on port ${port}`));
