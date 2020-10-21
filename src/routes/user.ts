import { Request, Response, Router } from 'express';

import * as controller from '../controllers/user';

const router = Router();

/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       id:
 *          type: string
 *       name:
 *          type: string
 *       surname:
 *          type: string
 *       age:
 *          type: number
 *       email:
 *          type: string
 */

/**
 * @swagger
 * definitions:
 *   UserCreate:
 *     properties:
 *       name:
 *          type: string
 *       surname:
 *          type: string
 *       age:
 *          type: number
 *       email:
 *          type: string
 *     required:
 *       - name
 *       - surname
 *       - age
 */

/**
 * @swagger
 * definitions:
 *   UserUpdate:
 *     properties:
 *       name:
 *          type: string
 *       surname:
 *          type: string
 *       age:
 *          type: number
 *       email:
 *          type: string
 */

/**
 * @swagger
 * /api/user:
 *   post:
 *     tags:
 *       - User
 *     description: Create User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: JSON with user attributes.
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UserCreate'
 *     responses:
 *       201:
 *         description: Successfull
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/User'
 */

router.post('/', async (req: Request, res: Response) => {
    const data = req.body;
    const user = await controller.create(data);

    return res.status(201).send(user);
});

/**
 * @swagger
 * /api/user/:id:
 *   put:
 *     tags:
 *       - User
 *     description: Update User
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         type: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: User id to update
 *       - name: user
 *         description: JSON with user attributes.
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UserUpdate'
 *     responses:
 *       200:
 *         description: Successfull
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/User'
 */

router.put('/:id', async (req: Request, res: Response) => {
    const result = await controller.update(req.body, req.params.id);

    return res.status(200).send(result);
});

/**
 * @swagger
 * /api/user/:id:
 *   get:
 *     tags:
 *       - User
 *     description: Get User by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         type: uuid
 *         required: true
 *     responses:
 *       200:
 *         description: Successfull
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/User'
 */

router.get('/:id', async (req: Request, res: Response) => {
    const user = await controller.getById(req.params.id);

    return res.status(200).send(user);
});

/**
 * @swagger
 * /api/user:
 *   get:
 *     tags:
 *      - User
 *     description: Get All Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: page
 *         type: number
 *       - in: query
 *         name: size
 *         type: number
 *     responses:
 *       200:
 *         description: Successfull
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/User'
 */

router.get('/', async (req: Request, res: Response) => {
    const users = await controller.getAll(req.query);

    return res.status(200).json(users);
});
/**
 * @swagger
 * /api/user/:id:
 *   delete:
 *     tags:
 *       - User
 *     description: Remove one User
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         type: uuid
 *         required: true
 *         schema:
 *           required:
 *              id
 *           properties:
 *              id:
 *               type: string
 *               description: USer id to delete
 *     responses:
 *       204:
 *         description: Successful
 */

router.delete('/:id', async (req: Request, res: Response) => {
    await controller.remove(req.params.id);

    return res.status(204).send();
});

export default router;
