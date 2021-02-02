import { Request, Response, Router } from 'express';

import { swaggerSpec } from '../swagger';
import apiBook from './book.routes';
import apiUser from './user.routes';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Service 1.0.0');
});

router.get('/api-docs', (req: Request, res: Response) => {
    res.send(swaggerSpec);
});

router.use('/api/book', apiBook);
router.use('/api/user', apiUser);

export default router;
