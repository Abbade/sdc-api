"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.TransplantPlantsUseCase = void 0;
var prismaClient_1 = require("../../../../database/prismaClient");
var postmanJson = {
    "transplantDate": "2012-04-30T18:25:43.511Z",
    "plants": [1, 2, 3, 4],
    "id_recipiente": 1,
    "id_location": 1,
    "id_faseCultivo": 2,
    "obs": "Ae"
};
var TransplantPlantsUseCase = /** @class */ (function () {
    function TransplantPlantsUseCase() {
    }
    TransplantPlantsUseCase.prototype.execute = function (_a) {
        var transplantDate = _a.transplantDate, plants = _a.plants, id_recipiente = _a.id_recipiente, id_location = _a.id_location, id_faseCultivo = _a.id_faseCultivo, id_user_create = _a.id_user_create, obs = _a.obs;
        return __awaiter(this, void 0, void 0, function () {
            var selectedFaseCultivo, selectedLocation, selectedRecipiente, plantsToUpdate, param, updatedPlants, plantsWithEmptyDate, updateDateParams, updatedDatePlants, param_1, updatedPlants, plantsWithEmptyDateV1, updateDateParamsV1, updatedDatePlantsV1, plantsWithEmptyDateV2, updateDateParamsV2, updatedDatePlantsV2, plantsWithEmptyDateV3, updateDateParamsV3, updatedDatePlantsV3, param_2, updatedPlants, plantsWithEmptyDate, updateDateParams, updatedDatePlants;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prisma.fasesCultivo.findFirst({
                            where: {
                                id: id_faseCultivo
                            }
                        })];
                    case 1:
                        selectedFaseCultivo = _b.sent();
                        if (!selectedFaseCultivo) {
                            throw new Error('Fase de cultivo não existente: ' + id_faseCultivo);
                        }
                        return [4 /*yield*/, prismaClient_1.prisma.locations.findFirst({
                                where: {
                                    id: id_location
                                }
                            })];
                    case 2:
                        selectedLocation = _b.sent();
                        if (!selectedLocation) {
                            throw new Error('Local não existente: ' + id_location);
                        }
                        return [4 /*yield*/, prismaClient_1.prisma.recipientes.findFirst({
                                where: {
                                    id: id_recipiente
                                }
                            })];
                    case 3:
                        selectedRecipiente = _b.sent();
                        if (!selectedRecipiente) {
                            throw new Error('Recipiente não existente: ' + id_recipiente);
                        }
                        return [4 /*yield*/, prismaClient_1.prisma.plantas.findMany({
                                where: {
                                    id: { "in": plants }
                                }
                            })
                            //VALIDA VIABILIDADE DE TRANSPLANTE
                            //DESCARTADA?
                        ];
                    case 4:
                        plantsToUpdate = _b.sent();
                        //VALIDA VIABILIDADE DE TRANSPLANTE
                        //DESCARTADA?
                        plantsToUpdate.map(function (plant) {
                            if (plant.trashDate) {
                                throw new Error('Não é possivel transplantar plantas descartadas.');
                            }
                            if (plant.cropDate) {
                                throw new Error('Não é possivel transplantar plantas colhidas.');
                            }
                            if (plant.id_recipiente == selectedRecipiente.id) {
                                throw new Error('Não é possivel transplantar planta para um mesmo recipiente.');
                            }
                            if (plant.lastTransplant && plant.lastTransplant > transplantDate) {
                                throw new Error('Não é possivel transplantar plantas em uma data anterior a ultimo transplante.');
                            }
                            if (plant.id_faseCultivo > selectedFaseCultivo.id) {
                                throw new Error('Não é possivel voltar com plantas para fase anterior.');
                            }
                        });
                        if (!(selectedFaseCultivo.ordem == 2)) return [3 /*break*/, 7];
                        param = {
                            where: {
                                id: { "in": plants }
                            },
                            data: {
                                id_faseCultivo: id_faseCultivo,
                                id_recipiente: id_recipiente,
                                id_location: id_location,
                                lastTransplant: transplantDate
                            }
                        };
                        return [4 /*yield*/, prismaClient_1.prisma.plantas.updateMany(param)];
                    case 5:
                        updatedPlants = _b.sent();
                        plantsWithEmptyDate = plantsToUpdate.filter(function (plant) {
                            return !plant.aclimatationDate;
                        }).map(function (plant) {
                            return plant.id;
                        });
                        updateDateParams = {
                            where: {
                                id: { "in": plantsWithEmptyDate }
                            },
                            data: {
                                aclimatationDate: transplantDate,
                                aclimatationLocation: selectedLocation.name,
                                aclimatationRecipient: selectedRecipiente.name
                            }
                        };
                        return [4 /*yield*/, prismaClient_1.prisma.plantas.updateMany(updateDateParams)];
                    case 6:
                        updatedDatePlants = _b.sent();
                        _b.label = 7;
                    case 7:
                        if (!(selectedFaseCultivo.ordem == 3)) return [3 /*break*/, 12];
                        param_1 = {
                            where: {
                                id: { "in": plants }
                            },
                            data: {
                                id_faseCultivo: id_faseCultivo,
                                id_recipiente: id_recipiente,
                                id_location: id_location,
                                lastTransplant: transplantDate
                            }
                        };
                        return [4 /*yield*/, prismaClient_1.prisma.plantas.updateMany(param_1)];
                    case 8:
                        updatedPlants = _b.sent();
                        plantsWithEmptyDateV1 = plantsToUpdate.filter(function (plant) {
                            return !plant.vegetationDate;
                        }).map(function (plant) {
                            return plant.id;
                        });
                        updateDateParamsV1 = {
                            where: {
                                id: { "in": plantsWithEmptyDateV1 }
                            },
                            data: {
                                vegetationDate: transplantDate,
                                vegetationRecipient: selectedRecipiente.name,
                                vegetationLocation: selectedLocation.name
                            }
                        };
                        return [4 /*yield*/, prismaClient_1.prisma.plantas.updateMany(updateDateParamsV1)];
                    case 9:
                        updatedDatePlantsV1 = _b.sent();
                        plantsWithEmptyDateV2 = plantsToUpdate.filter(function (plant) {
                            return plant.vegetationDate && !plant.vegetation2Date;
                        }).map(function (plant) {
                            return plant.id;
                        });
                        updateDateParamsV2 = {
                            where: {
                                id: { "in": plantsWithEmptyDateV2 }
                            },
                            data: {
                                vegetation2Date: transplantDate,
                                vegetation2Recipient: selectedRecipiente.name,
                                vegetation2Location: selectedLocation.name
                            }
                        };
                        return [4 /*yield*/, prismaClient_1.prisma.plantas.updateMany(updateDateParamsV2)];
                    case 10:
                        updatedDatePlantsV2 = _b.sent();
                        plantsWithEmptyDateV3 = plantsToUpdate.filter(function (plant) {
                            return plant.vegetationDate && plant.vegetation2Date && !plant.vegetation3Date;
                        }).map(function (plant) {
                            return plant.id;
                        });
                        updateDateParamsV3 = {
                            where: {
                                id: { "in": plantsWithEmptyDateV3 }
                            },
                            data: {
                                vegetation3Date: transplantDate,
                                vegetation3Recipient: selectedRecipiente.name,
                                vegetation3Location: selectedLocation.name
                            }
                        };
                        return [4 /*yield*/, prismaClient_1.prisma.plantas.updateMany(updateDateParamsV3)];
                    case 11:
                        updatedDatePlantsV3 = _b.sent();
                        _b.label = 12;
                    case 12:
                        if (!(selectedFaseCultivo.ordem == 4)) return [3 /*break*/, 15];
                        param_2 = {
                            where: {
                                id: { "in": plants }
                            },
                            data: {
                                id_faseCultivo: id_faseCultivo,
                                id_recipiente: id_recipiente,
                                id_location: id_location,
                                lastTransplant: transplantDate
                            }
                        };
                        return [4 /*yield*/, prismaClient_1.prisma.plantas.updateMany(param_2)];
                    case 13:
                        updatedPlants = _b.sent();
                        plantsWithEmptyDate = plantsToUpdate.filter(function (plant) {
                            return !plant.floweringDate;
                        }).map(function (plant) {
                            return plant.id;
                        });
                        updateDateParams = {
                            where: {
                                id: { "in": plantsWithEmptyDate }
                            },
                            data: {
                                floweringDate: transplantDate,
                                floweringLocation: selectedLocation.name,
                                floweringRecipient: selectedRecipiente.name
                            }
                        };
                        return [4 /*yield*/, prismaClient_1.prisma.plantas.updateMany(updateDateParams)];
                    case 14:
                        updatedDatePlants = _b.sent();
                        _b.label = 15;
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    return TransplantPlantsUseCase;
}());
exports.TransplantPlantsUseCase = TransplantPlantsUseCase;
//# sourceMappingURL=TransplantPlantsUseCase.js.map