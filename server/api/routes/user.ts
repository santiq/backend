import { Router } from 'express';
import controllers from '../controllers/index.js';
import { Container } from 'typedi';
import middlewares from '../middlewares/index.js';
const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  const controller = Container.get(controllers.users);

  route.get('/', middlewares.isAuth, middlewares.isAdmin, controller.getAll.bind(controller));

  route.get('/exists', controller.existsByEmail.bind(controller));

  route.get('/:id', middlewares.isAuth, controller.getById.bind(controller));

  route.put('/me', middlewares.isAuth, middlewares.attachCurrentUser, controller.updateMyProfile.bind(controller));


  route.delete('/me', middlewares.isAuth, middlewares.attachCurrentUser, controller.deleteMyAccount.bind(controller));

};
