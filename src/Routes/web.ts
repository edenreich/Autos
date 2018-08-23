import Router from 'koa-router';
import ManagmentController from '../Controllers/UserManagmentController';
//@todo implement auth middlewares

export const router = new Router;

router.get('/', ManagmentController.create);

router.get('/user/:id', async (ctx) => {
    ctx.body = ctx.params.id;
    ctx.status = 200;
});

