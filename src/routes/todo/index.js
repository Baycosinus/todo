const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');

const idLength = 8;

/**
 * @swagger
 * components:
 *     schemas:
 *        ToDo:
 *            type: object
 *            required:
 *            - Text
 *            - Status
 *            properties:
 *               Text:
 *                  type: string
 *               Status:
 *                  type: integer  
 */
const todoController = require('../../controllers/todoController.js');

/**
 * @swagger
 * /todo/list:
 *     get:
 *         description: List my todos
 *         tags: [ToDo]
 *         responses:
 *            401:
 *               description: Unauthorized
 *            200:
 *               description: List my todos
 *            400:
 *               description: Bad request
 */
router.get('/list', todoController.list);

/**
 * @swagger
 * /todo/{id}:
 *     get:
 *         description: Get my todo
 *         tags: [ToDo]
 *         parameters:
 *           - in: path
 *             name: id
 *             type: string
 *             required: true
 *             description: id of the todo
 *         responses:
 *            401:
 *               description: Unauthorized
 *            200:
 *               description: List my todos
 *            400:
 *               description: Bad request
 */
 router.get('/:id', todoController.get);


/**
 * @swagger
 * /todo:
 *     post:
 *         description: Create a todo
 *         tags: [ToDo]
 *         requestBody:
 *                 required: true
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/ToDo'
 *         responses:
 *            401:
 *               description: Unauthorized
 *            200:
 *               description: Created
 *            400:
 *               description: Bad request
 */
 router.post('/', todoController.create);

 /**
 * @swagger
 * /todo:
 *     put:
 *         description: Update a todo
 *         tags: [ToDo]
 *         requestBody:
 *                 required: true
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/ToDo'
 *         responses:
 *            401:
 *               description: Unauthorized
 *            200:
 *               description: Created
 *            400:
 *               description: Bad request
 */
  router.put('/', todoController.update);


module.exports = router;