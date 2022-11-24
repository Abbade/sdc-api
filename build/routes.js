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
var CreateSectionController_1 = require("./modules/params/section/UseCases/createSection/CreateSectionController");
var GetAllSectionsController_1 = require("./modules/params/section/UseCases/getAllSections/GetAllSectionsController");
var meController_1 = require("./modules/account/me/meController");
var GetCompanyController_1 = require("./modules/company/useCase/get/GetCompanyController");
var UpdateCompanyController_1 = require("./modules/company/useCase/update/UpdateCompanyController");
var CreateLoteController_1 = require("./modules/lotes/UseCases/createLote/CreateLoteController");
var GetAllLotesController_1 = require("./modules/lotes/UseCases/getAllLotes/GetAllLotesController");
var getAllTrashedLotesController_1 = require("./modules/lotes/UseCases/getAllTrashedLotes/getAllTrashedLotesController");
var TrashLoteController_1 = require("./modules/lotes/UseCases/trashLote/TrashLoteController");
var CreateOrganizationController_1 = require("./modules/organization/useCases/createOrganization/CreateOrganizationController");
var GetAllOrganizationsController_1 = require("./modules/organization/useCases/getAllOrganizations/GetAllOrganizationsController");
var CreateFaseCultivoController_1 = require("./modules/params/faseCultivo/UseCases/createFaseCultivo/CreateFaseCultivoController");
var GetFaseCultivoController_1 = require("./modules/params/faseCultivo/UseCases/get/GetFaseCultivoController");
var getAllFasesCultivoController_1 = require("./modules/params/faseCultivo/UseCases/getAllFasesCultivo/getAllFasesCultivoController");
var UpdateFaseCultivoController_1 = require("./modules/params/faseCultivo/UseCases/update/UpdateFaseCultivoController");
var GetGeneticController_1 = require("./modules/params/genetic/useCases/get/GetGeneticController");
var UpdateGeneticController_1 = require("./modules/params/genetic/useCases/update/UpdateGeneticController");
var GetLocationController_1 = require("./modules/params/location/UseCases/get/GetLocationController");
var UpdateLocationController_1 = require("./modules/params/location/UseCases/update/UpdateLocationController");
var GetProfileController_1 = require("./modules/params/profile/useCases/get/GetProfileController");
var UpdateProfileController_1 = require("./modules/params/profile/useCases/update/UpdateProfileController");
var CreatePropagationTypeController_1 = require("./modules/params/propagationType/UseCases/createPropagationType/CreatePropagationTypeController");
var GetAllPropagationTypeController_1 = require("./modules/params/propagationType/UseCases/getAllPropagationTypes/GetAllPropagationTypeController");
var GetPropagationTypeController_1 = require("./modules/params/propagationType/UseCases/getPropagationTypes/GetPropagationTypeController");
var UpdatePropagationTypeController_1 = require("./modules/params/propagationType/UseCases/updatePropagationType/UpdatePropagationTypeController");
var CreateRecipienteController_1 = require("./modules/params/recipiente/UseCases/createRecipiente/CreateRecipienteController");
var GetRecipienteController_1 = require("./modules/params/recipiente/UseCases/get/GetRecipienteController");
var getAllRecipientesController_1 = require("./modules/params/recipiente/UseCases/getAllRecipientes/getAllRecipientesController");
var UpdateRecipienteController_1 = require("./modules/params/recipiente/UseCases/update/UpdateRecipienteController");
var GetSectionController_1 = require("./modules/params/section/UseCases/get/GetSectionController");
var UpdateSectionController_1 = require("./modules/params/section/UseCases/update/UpdateSectionController");
var CreateTrashReasonController_1 = require("./modules/params/trashReason/UseCases/createTrashReason/CreateTrashReasonController");
var GetTrashReasonController_1 = require("./modules/params/trashReason/UseCases/get/GetTrashReasonController");
var getAllTrashReasonsController_1 = require("./modules/params/trashReason/UseCases/getAllTrashReasons/getAllTrashReasonsController");
var UpdateTrashReasonController_1 = require("./modules/params/trashReason/UseCases/update/UpdateTrashReasonController");
var GetAllPermissionsController_1 = require("./modules/permissions/useCase/getAll/GetAllPermissionsController");
var ChangePlantStageController_1 = require("./modules/plants/useCase/changePlantStage/ChangePlantStageController");
var CreatePlantsLoteController_1 = require("./modules/plants/useCase/createPlantsLote/CreatePlantsLoteController");
var GetAllPlantsController_1 = require("./modules/plants/useCase/getAllPlants/GetAllPlantsController");
var MovePlantsController_1 = require("./modules/plants/useCase/movePlants/MovePlantsController");
var TransformPlantsIntoMotherController_1 = require("./modules/plants/useCase/transformPlantsIntoMother/TransformPlantsIntoMotherController");
var TransplantPlantsController_1 = require("./modules/plants/useCase/transplantPlants/TransplantPlantsController");
var TrashPlantsController_1 = require("./modules/plants/useCase/trashPlants/TrashPlantsController");
var CreateRoleController_1 = require("./modules/roles/useCase/create/CreateRoleController");
var GetRoleController_1 = require("./modules/roles/useCase/get/GetRoleController");
var GetAllRolesController_1 = require("./modules/roles/useCase/getAll/GetAllRolesController");
var UpdateRolesController_1 = require("./modules/roles/useCase/update/UpdateRolesController");
var GetUserController_1 = require("./modules/users/useCases/get/GetUserController");
var UpdateUserController_1 = require("./modules/users/useCases/update/UpdateUserController");
var GetAllActionPlantsController_1 = require("./modules/plants/useCase/getActionPlants/GetAllActionPlantsController");
var routes = (0, express_1.Router)();
exports.routes = routes;
var createUserController = new CreateUserController_1.CreateUserController();
var authenticateUserController = new authenticateUsersController_1.AuthenticateUserController();
var geAllUsersController = new CreateUserController_2.GeAllUsersController();
var getUserController = new GetUserController_1.GetUserController();
var updateUserController = new UpdateUserController_1.UpdateUserController();
var createOrganizationController = new CreateOrganizationController_1.CreateOrganizationController();
var getAllOrganizationsController = new GetAllOrganizationsController_1.GetAllOrganizationsController();
var meController = new meController_1.MeController();
var createProfileController = new CreateProfileController_1.CreateProfileController();
var getAllProfilesUseCase = new GetAllProfilesController_1.GetAllProfileController();
var getProfileController = new GetProfileController_1.GetProfileController();
var updateProfileController = new UpdateProfileController_1.UpdateProfileController();
var createGeneticController = new CreateGeneticController_1.CreateGeneticController();
var getAllGeneticsController = new GetAllGeneticsController_1.GetAllGeneticsController();
var getGeneticController = new GetGeneticController_1.GetGeneticController();
var updateGeneticController = new UpdateGeneticController_1.UpdateGeneticController();
var createFaseCultivoController = new CreateFaseCultivoController_1.CreateFaseCultivoController();
var getAllFasesCultivoController = new getAllFasesCultivoController_1.GetAllFasesCultivoController();
var getFaseCultivoController = new GetFaseCultivoController_1.GetFaseCultivoController();
var updateFaseCultivoController = new UpdateFaseCultivoController_1.UpdateFaseCultivoController();
var createRecipienteController = new CreateRecipienteController_1.CreateRecipienteController();
var getAllRecipientesController = new getAllRecipientesController_1.GetAllRecipientesController();
var getRecipienteController = new GetRecipienteController_1.GetRecipienteController();
var updateRecipienteController = new UpdateRecipienteController_1.UpdateRecipienteController();
var createLocationController = new CreateLocationController_1.CreateLocationController();
var getAllLocationsController = new GetAllLocationsController_1.GetAllLocationsController();
var getLocationController = new GetLocationController_1.GetLocationController();
var updateLocationController = new UpdateLocationController_1.UpdateLocationController();
var createSectionController = new CreateSectionController_1.CreateSectionController();
var getAllSectionsController = new GetAllSectionsController_1.GetAllSectionsController();
var getSectionController = new GetSectionController_1.GetSectionController();
var updateSectionController = new UpdateSectionController_1.UpdateSectionController();
var createTrashReasonController = new CreateTrashReasonController_1.CreateTrashReasonController();
var getAllTrashReasonsController = new getAllTrashReasonsController_1.GetAllTrashReasonsController();
var getTrashReasonController = new GetTrashReasonController_1.GetTrashReasonController();
var updateTrashReasonController = new UpdateTrashReasonController_1.UpdateTrashReasonController();
var createPropagationTypeUseCase = new CreatePropagationTypeController_1.CreatePropagationTypeController();
var getAllPropagationTypeUseCase = new GetAllPropagationTypeController_1.GetAllPropagationTypeController();
var getPropagationTypeUseCase = new GetPropagationTypeController_1.GetPropagationTypeController();
var updatePropagationTypeUseCase = new UpdatePropagationTypeController_1.UpdatePropagationTypeController();
var createLoteController = new CreateLoteController_1.CreateLoteController();
var getAllLotesController = new GetAllLotesController_1.GetAllLotesController();
var createPlantsLoteController = new CreatePlantsLoteController_1.CreatePlantsLoteController();
var getAllPlantsController = new GetAllPlantsController_1.GetAllPlantsController();
var transplantPlantsController = new TransplantPlantsController_1.TransplantPlantsController();
var trashPlantsController = new TrashPlantsController_1.TrashPlantsController();
var transformPlantsIntoMotherController = new TransformPlantsIntoMotherController_1.TransformPlantsIntoMotherController();
var movePlantsController = new MovePlantsController_1.MovePlantsController();
var changePlantStageController = new ChangePlantStageController_1.ChangePlantStageController();
var getAllActionPlantsController = new GetAllActionPlantsController_1.GetAllActionPlantsController();
var getAllTrashedLotesController = new getAllTrashedLotesController_1.GetAllTrashedLotesController();
var trashLoteController = new TrashLoteController_1.TrashLoteController();
var createRolesController = new CreateRoleController_1.CreateRolesController();
var getAllRolesController = new GetAllRolesController_1.GetAllRolesController();
var getRoleController = new GetRoleController_1.GetRoleController();
var updateRoleController = new UpdateRolesController_1.UpdateRolesController();
var getAllPermissionsController = new GetAllPermissionsController_1.GetAllPermissionsController();
var getCompanyController = new GetCompanyController_1.GetCompanyController();
var updateCompanyController = new UpdateCompanyController_1.UpdateCompanyController();
// auth
routes.post('/authenticate', authenticateUserController.handle);
routes.get('/me', ensureAuthenticate_1.ensureAuthenticate, meController.handle);
//users
routes.post('/user', createUserController.handle);
routes.get('/user', ensureAuthenticate_1.ensureAuthenticate, geAllUsersController.handle);
routes.get('/user/:id', ensureAuthenticate_1.ensureAuthenticate, getUserController.handle);
routes.put('/user', ensureAuthenticate_1.ensureAuthenticate, updateUserController.handle);
//organization
routes.post('/organization', ensureAuthenticate_1.ensureAuthenticate, createOrganizationController.handle);
routes.get('/organization', ensureAuthenticate_1.ensureAuthenticate, getAllOrganizationsController.handle);
//params
// fase cultivo
routes.post('/fase-cultivo', ensureAuthenticate_1.ensureAuthenticate, createFaseCultivoController.handle);
routes.get('/fase-cultivo', ensureAuthenticate_1.ensureAuthenticate, getAllFasesCultivoController.handle);
routes.get('/fase-cultivo/:id', ensureAuthenticate_1.ensureAuthenticate, getFaseCultivoController.handle);
routes.put('/fase-cultivo', ensureAuthenticate_1.ensureAuthenticate, updateFaseCultivoController.handle);
// recipiente
routes.post('/recipiente', ensureAuthenticate_1.ensureAuthenticate, createRecipienteController.handle);
routes.get('/recipiente', ensureAuthenticate_1.ensureAuthenticate, getAllRecipientesController.handle);
routes.get('/recipiente/:id', ensureAuthenticate_1.ensureAuthenticate, getRecipienteController.handle);
routes.put('/recipiente', ensureAuthenticate_1.ensureAuthenticate, updateRecipienteController.handle);
// genetic profile 
routes.post('/profile', ensureAuthenticate_1.ensureAuthenticate, createProfileController.handle);
routes.get('/profile', ensureAuthenticate_1.ensureAuthenticate, getAllProfilesUseCase.handle);
routes.get('/profile/:id', ensureAuthenticate_1.ensureAuthenticate, getProfileController.handle);
routes.put('/profile', ensureAuthenticate_1.ensureAuthenticate, updateProfileController.handle);
// genetic
routes.post('/genetic', ensureAuthenticate_1.ensureAuthenticate, createGeneticController.handle);
routes.get('/genetic', ensureAuthenticate_1.ensureAuthenticate, getAllGeneticsController.handle);
routes.get('/genetic/:id', ensureAuthenticate_1.ensureAuthenticate, getGeneticController.handle);
routes.put('/genetic', ensureAuthenticate_1.ensureAuthenticate, updateGeneticController.handle);
// section
routes.post('/section', ensureAuthenticate_1.ensureAuthenticate, createSectionController.handle);
routes.get('/section', ensureAuthenticate_1.ensureAuthenticate, getAllSectionsController.handle);
routes.get('/section/:id', ensureAuthenticate_1.ensureAuthenticate, getSectionController.handle);
routes.put('/section', ensureAuthenticate_1.ensureAuthenticate, updateSectionController.handle);
// location
routes.post('/location', ensureAuthenticate_1.ensureAuthenticate, createLocationController.handle);
routes.get('/location', ensureAuthenticate_1.ensureAuthenticate, getAllLocationsController.handle);
routes.get('/location/:id', ensureAuthenticate_1.ensureAuthenticate, getLocationController.handle);
routes.put('/location', ensureAuthenticate_1.ensureAuthenticate, updateLocationController.handle);
// propagationType
routes.post('/propagation-type', ensureAuthenticate_1.ensureAuthenticate, createPropagationTypeUseCase.handle);
routes.get('/propagation-type', ensureAuthenticate_1.ensureAuthenticate, getAllPropagationTypeUseCase.handle);
routes.get('/propagation-type/:id', ensureAuthenticate_1.ensureAuthenticate, getPropagationTypeUseCase.handle);
routes.put('/propagation-type/', ensureAuthenticate_1.ensureAuthenticate, updatePropagationTypeUseCase.handle);
// trashReason
routes.post('/trash-reason', ensureAuthenticate_1.ensureAuthenticate, createTrashReasonController.handle);
routes.get('/trash-reason', ensureAuthenticate_1.ensureAuthenticate, getAllTrashReasonsController.handle);
routes.get('/trash-reason/:id', ensureAuthenticate_1.ensureAuthenticate, getTrashReasonController.handle);
routes.put('/trash-reason', ensureAuthenticate_1.ensureAuthenticate, updateTrashReasonController.handle);
// NEGOCIO
// lote
routes.post('/lote', ensureAuthenticate_1.ensureAuthenticate, createLoteController.handle);
routes.get('/lote', ensureAuthenticate_1.ensureAuthenticate, getAllLotesController.handle);
//lote - descarte
routes.get('/trashed-lote', ensureAuthenticate_1.ensureAuthenticate, getAllTrashedLotesController.handle);
routes.put('/trash-lote', ensureAuthenticate_1.ensureAuthenticate, trashLoteController.handle);
// lote - create plants
routes.post('/plant', ensureAuthenticate_1.ensureAuthenticate, createPlantsLoteController.handle);
routes.get('/plant', ensureAuthenticate_1.ensureAuthenticate, getAllPlantsController.handle);
routes.get('/action-plants', ensureAuthenticate_1.ensureAuthenticate, getAllPlantsController.handle);
//plant - transplant
routes.post('/transplant-plant', ensureAuthenticate_1.ensureAuthenticate, transplantPlantsController.handle);
routes.post('/trash-plant', ensureAuthenticate_1.ensureAuthenticate, trashPlantsController.handle);
routes.post('/move-plant', ensureAuthenticate_1.ensureAuthenticate, movePlantsController.handle);
routes.post('/plant-mother', ensureAuthenticate_1.ensureAuthenticate, transformPlantsIntoMotherController.handle);
routes.post('/plant-stage', ensureAuthenticate_1.ensureAuthenticate, changePlantStageController.handle);
// roles
routes.post('/roles', ensureAuthenticate_1.ensureAuthenticate, createRolesController.handle);
routes.get('/roles', ensureAuthenticate_1.ensureAuthenticate, getAllRolesController.handle);
routes.get('/roles/:id', ensureAuthenticate_1.ensureAuthenticate, getRoleController.handle);
routes.put('/roles/', ensureAuthenticate_1.ensureAuthenticate, updateRoleController.handle);
// company
routes.get('/company/:id', ensureAuthenticate_1.ensureAuthenticate, getCompanyController.handle);
routes.put('/company/', ensureAuthenticate_1.ensureAuthenticate, updateCompanyController.handle);
routes.get('/permissions', ensureAuthenticate_1.ensureAuthenticate, getAllPermissionsController.handle);
//# sourceMappingURL=routes.js.map