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
import { MeController } from './modules/account/me/meController';
import { CreateFaseCultivoController } from './modules/params/faseCultivo/UseCases/createFaseCultivo/CreateFaseCultivoController';
import { GetAllFasesCultivoController } from './modules/params/faseCultivo/UseCases/getAllFasesCultivo/getAllFasesCultivoController';
import { GetAllRecipientesController } from './modules/params/recipiente/UseCases/getAllRecipientes/getAllRecipientesController';
import { CreateRecipienteController } from './modules/params/recipiente/UseCases/createRecipiente/CreateRecipienteController';
import { CreateOrganizationController } from './modules/organization/useCases/createOrganization/CreateOrganizationController';
import { GetAllOrganizationsController } from './modules/organization/useCases/getAllOrganizations/GetAllOrganizationsController';
import { GetAllTrashedLotesController } from './modules/lotes/UseCases/getAllTrashedLotes/getAllTrashedLotesController';
import { CreatePlantsLoteController } from './modules/plants/useCase/createPlantsLote/CreatePlantsLoteController';
import { GetAllPlantsController } from './modules/plants/useCase/getAllPlants/GetAllPlantsController';
import { TransplantPlantsController } from './modules/plants/useCase/transplantPlant/TransplantPlantsController';
import { GetPropagationTypeController } from './modules/params/propagationType/UseCases/getPropagationTypes/GetPropagationTypeController';
import { UpdatePropagationTypeUseCase } from './modules/params/propagationType/UseCases/updatePropagationType/UpdatePropagationTypeUseCase';
import { UpdatePropagationTypeController } from './modules/params/propagationType/UseCases/updatePropagationType/UpdatePropagationTypeController';
import { CreateRolesController } from './modules/roles/useCase/create/CreateRoleController';
import { GetAllRolesController } from './modules/roles/useCase/getAll/GetAllRolesController';
import { GetRoleController } from './modules/roles/useCase/get/GetRoleController';
import { UpdateRolesController } from './modules/roles/useCase/update/UpdateRolesController';
import { GetAllPermissionsController } from './modules/permissions/useCase/getAll/GetAllPermissionsController';
import { TrashPlantsController } from './modules/plants/useCase/trashPlant/TrashPlantsController';

const routes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const geAllUsersController = new GeAllUsersController();

const createOrganizationController = new CreateOrganizationController();
const getAllOrganizationsController = new GetAllOrganizationsController();


const meController = new MeController();

const createProfileController = new CreateProfileController();
const getAllProfilesUseCase = new GetAllProfileController();

const createGeneticController = new CreateGeneticController();
const getAllGeneticsController = new GetAllGeneticsController();

const createFaseCultivoController = new CreateFaseCultivoController();
const getAllFasesCultivoController = new GetAllFasesCultivoController();

const createRecipienteController = new CreateRecipienteController();
const getAllRecipientesController = new GetAllRecipientesController();

const createLocationController = new CreateLocationController();
const getAllLocationsController = new GetAllLocationsController();

const createSectionController = new CreateSectionController();
const getAllSectionsController = new GetAllSectionsController();

const createTrashReasonController = new CreateTrashReasonController();
const getAllTrashReasonsController = new GetAllTrashReasonsController();


const createPropagationTypeUseCase = new CreatePropagationTypeController();
const getAllPropagationTypeUseCase = new GetAllPropagationTypeController();
const getPropagationTypeUseCase = new GetPropagationTypeController();
const updatePropagationTypeUseCase = new UpdatePropagationTypeController();

const createLoteController = new CreateLoteController();
const getAllLotesController = new GetAllLotesController();

const createPlantsLoteController = new CreatePlantsLoteController()
const getAllPlantsController = new GetAllPlantsController()
const transplantPlantsController = new TransplantPlantsController()
const trashPlantsController = new TrashPlantsController()

const getAllTrashedLotesController = new GetAllTrashedLotesController();

const trashLoteController = new TrashLoteController();

const createRolesController = new CreateRolesController();
const getAllRolesController = new GetAllRolesController();
const getRoleController = new GetRoleController();
const updateRoleController = new UpdateRolesController();

const getAllPermissionsController = new GetAllPermissionsController();


// auth
routes.post('/authenticate', authenticateUserController.handle);

routes.get('/me', ensureAuthenticate, meController.handle);

//users
routes.post('/user', createUserController.handle);
routes.get('/user', ensureAuthenticate , geAllUsersController.handle);

//organization
routes.post('/organization', ensureAuthenticate,createOrganizationController.handle);
routes.get('/organization', ensureAuthenticate , getAllOrganizationsController.handle);


//params

// fase cultivo
routes.post('/fase-cultivo', ensureAuthenticate, createFaseCultivoController.handle);
routes.get('/fase-cultivo',ensureAuthenticate, getAllFasesCultivoController.handle);

// recipiente
routes.post('/recipiente', ensureAuthenticate, createRecipienteController.handle);
routes.get('/recipiente',ensureAuthenticate, getAllRecipientesController.handle);


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
routes.get('/propagation-type/:id',ensureAuthenticate, getPropagationTypeUseCase.handle);
routes.put('/propagation-type/',ensureAuthenticate, updatePropagationTypeUseCase.handle);




// trashReason
routes.post('/trash-reason', ensureAuthenticate, createTrashReasonController.handle);
routes.get('/trash-reason',ensureAuthenticate, getAllTrashReasonsController.handle);


// NEGOCIO
// lote
routes.post('/lote', ensureAuthenticate, createLoteController.handle);
routes.get('/lote',ensureAuthenticate, getAllLotesController.handle);



//lote - descarte
routes.get('/trashed-lote', ensureAuthenticate, getAllTrashedLotesController.handle);
routes.put('/trash-lote', ensureAuthenticate, trashLoteController.handle);

// lote - create plants
routes.post('/plant', ensureAuthenticate, createPlantsLoteController.handle);
routes.get('/plant', ensureAuthenticate, getAllPlantsController.handle);

//plant - transplant
routes.post('/transplant-plant', ensureAuthenticate, transplantPlantsController.handle);
routes.post('/trash-plant', ensureAuthenticate, trashPlantsController.handle);

// roles
routes.post('/roles', ensureAuthenticate, createRolesController.handle);
routes.get('/roles',ensureAuthenticate, getAllRolesController.handle);
routes.get('/roles/:id',ensureAuthenticate, getRoleController.handle);
routes.put('/roles/',ensureAuthenticate, updateRoleController.handle);


routes.get('/permissions',ensureAuthenticate, getAllPermissionsController.handle);





export { routes };