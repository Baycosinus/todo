const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

//app.db = db;

const swaggerOptions = {
    definition: {
        openapi: '3.0.0', 
        info: {
            title: 'TODO API',
            version: '1.0.0',
            description: 'API documentation for TODO app'
        },
        servers: [
            {
                url: 'http://localhost:3000'
            }
        ],
        components: {
            securitySchemes: {
              bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
              }
            }
          },
          security: [{
            bearerAuth: []
          }]
    },
    apis: ['src/routes/**/*.js']
};

const specs = swaggerJsDoc(swaggerOptions);

app.use(cors({origin: '*'}));
app.use(express.json());
//app.use(morgan("dev"));

app.use('/account', require('./routes/account'));
app.use('/todo', require('./routes/todo'));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

require('./middlewares/error').handleErrors(app);

app.listen(PORT, () => console.log('Server started on port ' + PORT));