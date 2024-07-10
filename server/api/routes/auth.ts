import { Router } from 'express';
import controllers from '../controllers/index.js';
import { Container } from 'typedi';

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  const controller = Container.get(controllers.auth);

  route.post('/sign-up', controller.signUp.bind(controller));

  route.post('/sign-in', controller.signIn.bind(controller));
  
};
