import { Router } from 'express';
import { ensureAuthenticate } from './middlewares/ensureAuthenticate';
import { AuthenticateUserController } from './modules/account/authenticateUsers/authenticateUsersController';
import { CreateUserController } from './modules/users/useCases/createUser/CreateUserController';
import { GeAllUsersController } from './modules/users/useCases/getAllUsers/CreateUserController';



const routes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const geAllUsersController = new GeAllUsersController();

// auth
routes.post('/authenticate', authenticateUserController.handle);

//users
routes.post('/user', createUserController.handle);
routes.get('/user', ensureAuthenticate , geAllUsersController.handle);

export { routes };