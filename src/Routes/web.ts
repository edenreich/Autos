import Router from 'koa-router';
import ManagmentController from '../Controllers/UserManagmentController';
//@todo implement auth middlewares

export const router = new Router;

router.get('/user/:id', ManagmentController.show);

