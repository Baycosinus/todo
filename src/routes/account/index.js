const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');

const idLength = 8;


/**
 * @swagger
 * components:
 *     schemas:
 *        User:
 *            type: object
 *            required:
 *            - username
 *            - password
 *            properties:
 *               username:
 *                  type: string
 *               password:
 *                  type: string  
 */
const accountController = require('../../controllers/accountController.js');

/**
 * @swagger
 * /account/login:
 *     post:
 *         description: Login to the application
 *         tags: [User]
 *         requestBody:
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                         $ref: '#/components/schemas/User'
 *         responses:
 *            200:
 *               description: Successful login
 *            400:
 *               description: Bad request
 */
router.post('/login', accountController.login);


/**
 * @swagger
 * /account/register:
 *     post:
 *         description: Reg,ster to the application
 *         tags: [User]
 *         requestBody:
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                         $ref: '#/components/schemas/User'
 *         responses:
 *            200:
 *               description: Successful register
 *            400:
 *               description: Bad request
 */
 router.post('/register', accountController.register);

module.exports = router;