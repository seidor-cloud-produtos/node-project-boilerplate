import { Request, Response, Router } from 'express';

import { swaggerSpec } from '../swagger';
import apiUser from './user.routes';
import apiBook from './book.routes';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Service 1.0.0');
});

router.get('/api-docs', (req: Request, res: Response) => {
    res.send(swaggerSpec);
});

router.use('/api/user', apiUser);
router.use('/api/book', apiBook);

export default router;
