import Router from 'koa-router';
import UsersManagmentController from '../Controllers/UsersManagementController';
import CarsManagmentController from '../Controllers/CarsManagementController';
import InquiriesManagmentController from '../Controllers/InquiriesManagementController';
//@todo implement auth middlewares

export const router = new Router;

router.get('/users/:id', UsersManagmentController.show);
router.post('/users/create', UsersManagmentController.create);
router.put('/users/edit', UsersManagmentController.edit);

router.get('/cars/:id', CarsManagmentController.show);

router.post('/cars/create', CarsManagmentController.create);

router.get('/inquires/:id', InquiriesManagmentController.show);

router.post('/inquires/create', InquiriesManagmentController.create);

