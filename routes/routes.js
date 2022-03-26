var express = require('express');
var router = express.Router();
var dotenv = require('dotenv').config();
var swaggerJsDoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');
const authentication = require("../middleware/AuthClient");

//swagger api documentation
const swaggerDocument = swaggerJsDoc({
    swaggerDefinition: {
        info: {
            title: "Node JS Express CRUD MongoDB",
            description: "Node Js Using Express & Mongodb (CRUD & JWT Authentication)",
            servers: [process.env.APP_PORT],
            contact: {
                name: "Alfi Nur Hakim"
            }
        }
    },
    apis: ["docs/swagger.js"]
})

// import routes detail
const routesUsers = require("./users.js");
const routesBooks = require("./books.js");
const routesAuthentication = require("./authentication.js");

// routes - Unauthorized
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use("/users", routesUsers);
router.use("/auth", routesAuthentication);

//routes - Authorized
router.use("/books", authentication, routesBooks);

module.exports = router;