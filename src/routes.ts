import { Router } from 'express';
import { ensureAuthenticate } from './middlewares/ensureAuthenticate';
import { AuthenticateUserController } from './modules/account/authenticateUsers/authenticateUsersController';

import { CreateUserController } from './modules/users/useCases/createUser/CreateUserController';
import { GeAllUsersController } from './modules/users/useCases/getAllUsers/CreateUserController';

import { CreateProfileController } from './modules/params/profile/useCases/createProfile/CreateProfileController';
import { GetAllProfileController } from './modules/params/profile/useCases/getAllProfiles/GetAllProfilesController';

import { CreateGeneticController } from './modules/params/genetic/useCases/createGenetic/CreateGeneticController';
import { GetAllGeneticsController } from './modules/params/genetic/useCases/getAllGenetics/GetAllGeneticsController';

import { CreateLocationController } from './modules/params/location/UseCases/createLocation/CreateLocationController';
import { GetAllLocationsController } from './modules/params/location/UseCases/getAllLocations/GetAllLocationsController';

import { GetAllSectionsController } from './modules/params/section/UseCases/getAllSections/GetAlSectionsController';
import { CreateSectionController } from './modules/params/section/UseCases/createSection/CreateSectionController';

import { CreateLoteController } from './modules/lotes/UseCases/createLote/CreateLoteController';
import { GetAllLotesController } from './modules/lotes/UseCases/getAllLotes/GetAllLotesController';
import { TrashLoteController } from './modules/lotes/UseCases/trashLote/TrashLoteController';
import { CreateTrashReasonController } from './modules/params/trashReason/UseCases/createTrashReason/CreateTrashReasonController';
import { GetAllTrashReasonsController } from './modules/params/trashReason/UseCases/getAllTrashReasons/getAllTrashReasonsController';
import { CreatePropagationTypeUseCase } from './modules/params/propagationType/UseCases/createPropagationType/CreatePropagationTypeUseCase';
import { GetAllPropagationTypeUseCase } from './modules/params/propagationType/UseCases/getAllPropagationTypes/GetAllPropagationTypeUseCase';
import { CreatePropagationTypeController } from './modules/params/propagationType/UseCases/createPropagationType/CreatePropagationTypeController';
import { GetAllPropagationTypeController } from './modules/params/propagationType/UseCases/getAllPropagationTypes/GetAllPropagationTypeController';

const routes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const geAllUsersController = new GeAllUsersController();

const createProfileController = new CreateProfileController();
const getAllProfilesUseCase = new GetAllProfileController();

const createGeneticController = new CreateGeneticController();
const getAllGeneticsController = new GetAllGeneticsController();


const createLocationController = new CreateLocationController();
const getAllLocationsController = new GetAllLocationsController();

const createSectionController = new CreateSectionController();
const getAllSectionsController = new GetAllSectionsController();

const createTrashReasonController = new CreateTrashReasonController();
const getAllTrashReasonsController = new GetAllTrashReasonsController();


const createPropagationTypeUseCase = new CreatePropagationTypeController();
const getAllPropagationTypeUseCase = new GetAllPropagationTypeController();

const createLoteController = new CreateLoteController();
const getAllLotesController = new GetAllLotesController();

const trashLoteController = new TrashLoteController()


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
routes.get('/genetic',ensureAuthenticate, getAllGeneticsController.handle);

// section
routes.post('/section', ensureAuthenticate, createSectionController.handle);
routes.get('/section',ensureAuthenticate, getAllSectionsController.handle);


// location
routes.post('/location', ensureAuthenticate, createLocationController.handle);
routes.get('/location',ensureAuthenticate, getAllLocationsController.handle);

// propagationType
routes.post('/propagation-type', ensureAuthenticate, createPropagationTypeUseCase.handle);
routes.get('/propagation-type',ensureAuthenticate, getAllPropagationTypeUseCase.handle);

// trashReason
routes.post('/trash-reason', ensureAuthenticate, createTrashReasonController.handle);
routes.get('/trash-reason',ensureAuthenticate, getAllTrashReasonsController.handle);


// NEGOCIO
// lote
routes.post('/lote', ensureAuthenticate, createLoteController.handle);
routes.get('/lote',ensureAuthenticate, getAllLotesController.handle);

//lote - descarte
routes.put('/trash-lote', ensureAuthenticate, trashLoteController.handle);




export { routes };