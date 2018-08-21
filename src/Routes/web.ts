import Router from 'koa-router';
//import ManagmentController from '../Controllers/ManagmentController';
//@todo implement auth middlewares

export const router = new Router;

router.get('/', function() {
    console.log('test');
});

