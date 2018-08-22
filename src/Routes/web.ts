import Router from 'koa-router';
//import ManagmentController from '../Controllers/ManagmentController';
//@todo implement auth middlewares

export const router = new Router;

router.get('/', async ctx => {
    ctx.body = 'efwefewf';
    ctx.status = 200;
});

