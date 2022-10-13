"use strict";
exports.__esModule = true;
exports.routes = void 0;
var express_1 = require("express");
var ensureAuthenticate_1 = require("./middlewares/ensureAuthenticate");
var authenticateUsersController_1 = require("./modules/account/authenticateUsers/authenticateUsersController");
var CreateUserController_1 = require("./modules/users/useCases/createUser/CreateUserController");
var CreateUserController_2 = require("./modules/users/useCases/getAllUsers/CreateUserController");
var CreateProfileController_1 = require("./modules/params/profile/useCases/createProfile/CreateProfileController");
var GetAllProfilesController_1 = require("./modules/params/profile/useCases/getAllProfiles/GetAllProfilesController");
var CreateGeneticController_1 = require("./modules/params/genetic/useCases/createGenetic/CreateGeneticController");
var GetAllGeneticsController_1 = require("./modules/params/genetic/useCases/getAllGenetics/GetAllGeneticsController");
var CreateLocationController_1 = require("./modules/params/location/UseCases/createLocation/CreateLocationController");
var GetAllLocationsController_1 = require("./modules/params/location/UseCases/getAllLocations/GetAllLocationsController");
var GetAlSectionsController_1 = require("./modules/params/section/UseCases/getAllSections/GetAlSectionsController");
var CreateSectionController_1 = require("./modules/params/section/UseCases/createSection/CreateSectionController");
var CreateLoteController_1 = require("./modules/lotes/UseCases/createLote/CreateLoteController");
var GetAllLotesController_1 = require("./modules/lotes/UseCases/getAllLotes/GetAllLotesController");
var TrashLoteController_1 = require("./modules/lotes/UseCases/trashLote/TrashLoteController");
var CreateTrashReasonController_1 = require("./modules/params/trashReason/UseCases/createTrashReason/CreateTrashReasonController");
var getAllTrashReasonsController_1 = require("./modules/params/trashReason/UseCases/getAllTrashReasons/getAllTrashReasonsController");
var CreatePropagationTypeController_1 = require("./modules/params/propagationType/UseCases/createPropagationType/CreatePropagationTypeController");
var GetAllPropagationTypeController_1 = require("./modules/params/propagationType/UseCases/getAllPropagationTypes/GetAllPropagationTypeController");
var meController_1 = require("./modules/account/me/meController");
var CreateFaseCultivoController_1 = require("./modules/params/faseCultivo/UseCases/createFaseCultivo/CreateFaseCultivoController");
var getAllFasesCultivoController_1 = require("./modules/params/faseCultivo/UseCases/getAllFasesCultivo/getAllFasesCultivoController");
var getAllRecipientesController_1 = require("./modules/params/recipiente/UseCases/getAllRecipientes/getAllRecipientesController");
var CreateRecipienteController_1 = require("./modules/params/recipiente/UseCases/createRecipiente/CreateRecipienteController");
var CreateOrganizationController_1 = require("./modules/organization/useCases/createOrganization/CreateOrganizationController");
var GetAllOrganizationsController_1 = require("./modules/organization/useCases/getAllOrganizations/GetAllOrganizationsController");
var getAllTrashedLotesController_1 = require("./modules/lotes/UseCases/getAllTrashedLotes/getAllTrashedLotesController");
var CreatePlantsLoteController_1 = require("./modules/plants/useCase/createPlantsLote/CreatePlantsLoteController");
var GetAllPlantsController_1 = require("./modules/plants/useCase/getAllPlants/GetAllPlantsController");
var routes = (0, express_1.Router)();
exports.routes = routes;
var createUserController = new CreateUserController_1.CreateUserController();
var authenticateUserController = new authenticateUsersController_1.AuthenticateUserController();
var geAllUsersController = new CreateUserController_2.GeAllUsersController();
var createOrganizationController = new CreateOrganizationController_1.CreateOrganizationController();
var getAllOrganizationsController = new GetAllOrganizationsController_1.GetAllOrganizationsController();
var meController = new meController_1.MeController();
var createProfileController = new CreateProfileController_1.CreateProfileController();
var getAllProfilesUseCase = new GetAllProfilesController_1.GetAllProfileController();
var createGeneticController = new CreateGeneticController_1.CreateGeneticController();
var getAllGeneticsController = new GetAllGeneticsController_1.GetAllGeneticsController();
var createFaseCultivoController = new CreateFaseCultivoController_1.CreateFaseCultivoController();
var getAllFasesCultivoController = new getAllFasesCultivoController_1.GetAllFasesCultivoController();
var createRecipienteController = new CreateRecipienteController_1.CreateRecipienteController();
var getAllRecipientesController = new getAllRecipientesController_1.GetAllRecipientesController();
var createLocationController = new CreateLocationController_1.CreateLocationController();
var getAllLocationsController = new GetAllLocationsController_1.GetAllLocationsController();
var createSectionController = new CreateSectionController_1.CreateSectionController();
var getAllSectionsController = new GetAlSectionsController_1.GetAllSectionsController();
var createTrashReasonController = new CreateTrashReasonController_1.CreateTrashReasonController();
var getAllTrashReasonsController = new getAllTrashReasonsController_1.GetAllTrashReasonsController();
var createPropagationTypeUseCase = new CreatePropagationTypeController_1.CreatePropagationTypeController();
var getAllPropagationTypeUseCase = new GetAllPropagationTypeController_1.GetAllPropagationTypeController();
var createLoteController = new CreateLoteController_1.CreateLoteController();
var getAllLotesController = new GetAllLotesController_1.GetAllLotesController();
var createPlantsLoteController = new CreatePlantsLoteController_1.CreatePlantsLoteController();
var getAllPlantsController = new GetAllPlantsController_1.GetAllPlantsController();
var getAllTrashedLotesController = new getAllTrashedLotesController_1.GetAllTrashedLotesController();
var trashLoteController = new TrashLoteController_1.TrashLoteController();
// auth
routes.post('/authenticate', authenticateUserController.handle);
routes.get('/me', ensureAuthenticate_1.ensureAuthenticate, meController.handle);
//users
routes.post('/user', createUserController.handle);
routes.get('/user', ensureAuthenticate_1.ensureAuthenticate, geAllUsersController.handle);
//organization
routes.post('/organization', ensureAuthenticate_1.ensureAuthenticate, createOrganizationController.handle);
routes.get('/organization', ensureAuthenticate_1.ensureAuthenticate, getAllOrganizationsController.handle);
//params
// fase cultivo
routes.post('/fase-cultivo', ensureAuthenticate_1.ensureAuthenticate, createFaseCultivoController.handle);
routes.get('/fase-cultivo', ensureAuthenticate_1.ensureAuthenticate, getAllFasesCultivoController.handle);
// recipiente
routes.post('/recipiente', ensureAuthenticate_1.ensureAuthenticate, createRecipienteController.handle);
routes.get('/recipiente', ensureAuthenticate_1.ensureAuthenticate, getAllRecipientesController.handle);
// genetic profile 
routes.post('/profile', ensureAuthenticate_1.ensureAuthenticate, createProfileController.handle);
routes.get('/profile', ensureAuthenticate_1.ensureAuthenticate, getAllProfilesUseCase.handle);
// genetic
routes.post('/genetic', ensureAuthenticate_1.ensureAuthenticate, createGeneticController.handle);
routes.get('/genetic', ensureAuthenticate_1.ensureAuthenticate, getAllGeneticsController.handle);
// section
routes.post('/section', ensureAuthenticate_1.ensureAuthenticate, createSectionController.handle);
routes.get('/section', ensureAuthenticate_1.ensureAuthenticate, getAllSectionsController.handle);
// location
routes.post('/location', ensureAuthenticate_1.ensureAuthenticate, createLocationController.handle);
routes.get('/location', ensureAuthenticate_1.ensureAuthenticate, getAllLocationsController.handle);
// propagationType
routes.post('/propagation-type', ensureAuthenticate_1.ensureAuthenticate, createPropagationTypeUseCase.handle);
routes.get('/propagation-type', ensureAuthenticate_1.ensureAuthenticate, getAllPropagationTypeUseCase.handle);
// trashReason
routes.post('/trash-reason', ensureAuthenticate_1.ensureAuthenticate, createTrashReasonController.handle);
routes.get('/trash-reason', ensureAuthenticate_1.ensureAuthenticate, getAllTrashReasonsController.handle);
// NEGOCIO
// lote
routes.post('/lote', ensureAuthenticate_1.ensureAuthenticate, createLoteController.handle);
routes.get('/lote', ensureAuthenticate_1.ensureAuthenticate, getAllLotesController.handle);
// lote - create plants
routes.post('/plant', ensureAuthenticate_1.ensureAuthenticate, createPlantsLoteController.handle);
routes.get('/plant', ensureAuthenticate_1.ensureAuthenticate, getAllPlantsController.handle);
//lote - descarte
routes.get('/trashed-lote', ensureAuthenticate_1.ensureAuthenticate, getAllTrashedLotesController.handle);
routes.put('/trash-lote', ensureAuthenticate_1.ensureAuthenticate, trashLoteController.handle);
//# sourceMappingURL=routes.js.map