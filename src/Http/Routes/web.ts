import Router from 'koa-router';
import UsersManagmentController from '../Controllers/UsersManagementController';
import CarsManagmentController from '../Controllers/CarsManagementController';
import InquiriesManagmentController from '../Controllers/InquiriesManagementController';
//@todo implement auth middlewares

export const router = new Router;

router.get('/users', UsersManagmentController.showAll);
router.get('/users/:id', UsersManagmentController.show);
router.post('/users/create', UsersManagmentController.create);
router.put('/users/update', UsersManagmentController.update);
router.delete('/users/delete', UsersManagmentController.delete);

router.get('/cars', CarsManagmentController.showAll);
router.get('/cars/:id', CarsManagmentController.show);
router.post('/cars/create', CarsManagmentController.create);
router.put('/cars/update', CarsManagmentController.update);
router.delete('/cars/delete', CarsManagmentController.delete);

router.get('/inquiries', InquiriesManagmentController.showAll);
router.get('/inquiries/:id', InquiriesManagmentController.show);
router.post('/inquiries/create', InquiriesManagmentController.create);
router.put('/inquiries/update', InquiriesManagmentController.update);
router.delete('/inquiries/delete', InquiriesManagmentController.delete);

