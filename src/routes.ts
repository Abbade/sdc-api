import { Router } from 'express';
import { ensureAuthenticate } from './middlewares/ensureAuthenticate';
import { AuthenticateUserController } from './modules/account/authenticateUsers/authenticateUsersController';

import { CreateUserController } from './modules/users/useCases/createUser/CreateUserController';
import { GeAllUsersController } from './modules/users/useCases/getAllUsers/CreateUserController';

import { CreateProfileController } from './modules/params/profile/useCases/createProfile/CreateProfileController';
import { GetAllProfileController } from './modules/params/profile/useCases/getAllProfiles/GetAllProfilesController';

import { CreateGeneticController } from './modules/params/genetic/useCases/createGenetic/CreateGeneticController';
import { GetAllGeneticsController } from './modules/params/genetic/useCases/getAllGenetics/GetAllGeneticsController';

const routes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const geAllUsersController = new GeAllUsersController();

const createProfileController = new CreateProfileController();
const getAllProfilesUseCase = new GetAllProfileController();

const createGeneticController = new CreateGeneticController();
const cetAllGeneticsController = new GetAllGeneticsController();




// auth
routes.post('/authenticate', authenticateUserController.handle);

//users
routes.post('/user', createUserController.handle);
routes.get('/user', ensureAuthenticate , geAllUsersController.handle);

//params

// genetic profile 
routes.post('/profile', ensureAuthenticate, createProfileController.handle);
routes.get('/profile',ensureAuthenticate, getAllProfilesUseCase.handle);

// genetic
routes.post('/genetic', ensureAuthenticate, createGeneticController.handle);
routes.get('/genetic',ensureAuthenticate, cetAllGeneticsController.handle);

export { routes };