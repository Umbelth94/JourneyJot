const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");
const bodyParser = require("body-parser");

//Import Sequelize Connection
const sequelize = require("./config/connection");
//Initialize sequelize with session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Create session middleware parameters for the express-session package
const sess = {
    //We should look into making this a private key (via the Heroku config)
    secret: "abc1094949",
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: "strict",
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

// Tell Express.js to use the handlebars template engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () =>
        console.log("Now listening at http://localhost:3001"),
    );
});
